import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    SafeAreaView,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { supabase } from "../../lib/supabase";
import { AuthContext } from "../../Context/AuthContext";
import base64 from 'base-64';
import RazorpayCheckout from "react-native-razorpay";

const SectionComponent = ({ sectionData, examData }) => {
    const navigation = useNavigation();
    const [unlockedIndex, setUnlockedIndex] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isPurchased, setIsPurchased] = useState(false);
    const [userPurchasedExamDataLoaded, setUserPurchasedExamDataLoaded] = useState(false);
    const [validity, setValidity] = useState("");
    const { userData } = useContext(AuthContext);

    useEffect(() => {
        fetchUserPurchasedExamData();
    }, []);

    const fetchUserPurchasedExamData = async () => {
        try {
            const { data: userPurchasedExamData, error } = await supabase
                .from("user_purchased_exam")
                .select('*')
                .eq('user_id', userData.id)
                .eq('exam_id', examData.id);

            if (error) {
                console.error('Error fetching data:', error.message);
            } else {
                setValidity(examData.validity)
                // Assuming userPurchasedExamData is an array with purchased exams
                if (userPurchasedExamData.length > 0) {
                    const expiryDate = new Date(userPurchasedExamData[0].expiry_date);
                    if (expiryDate > new Date()) {
                        setIsPurchased(true);
                    }
                }
                setUserPurchasedExamDataLoaded(true)
            }
        } catch (error) {
            console.error('Error in catch block:', error.message);
        }
    }

    const handleSectionItemClick = (sectionItem, sectionIndex) => {
        if (isPurchased || sectionIndex === unlockedIndex) {
            navigation.navigate('mock-test-info', {
                mockTestId: sectionItem.id,
                mockTestName: sectionItem.name,
            });
        } else {
            setIsModalVisible(true);
        }
    };

    const storeUserPurchasedExamData = async () => {
        try {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + parseInt(validity)); // Add the validity days to the current date

            const { data, error } = await supabase
                .from("user_purchased_exam")
                .insert({
                    user_id: userData.id,
                    exam_id: examData.id,
                    expiry_date: expiryDate,
                });

            if (error) {
                console.error('Error inserting data in user_purchased_exam :', error.message);
            } else {
                console.log('User purchased exam data stored successfully:', data);
            }
        } catch (error) {
            console.error('Error in catch block:', error.message);
        }
    }

    const handlePurchase = async () => {
        const key_id = 'rzp_test_c5lhelxbMXQlit';
        const key_secret = 'gs9afwW7kobg25VB66ucxaJq';
        const credentials = base64.encode(`${key_id}:${key_secret}`);
        const amountInRupees = examData.price // e.g., 200 INR
        const amountInPaise = amountInRupees * 100; // Convert to paise

        try {
            const response = await fetch('https://api.razorpay.com/v1/orders', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amountInPaise,
                    currency: 'INR',
                    receipt: `Receipt no. ${Math.random().toString(36).substr(2, 9)}`, // generate a unique receipt number
                }),
            });

            const data = await response.json();
            console.log("Razorpay response:", data);

            const options = {
                description: 'Credits towards consultation',
                image: 'https://i.imgur.com/3g7nmJC.jpg',
                // currency: 'INR',
                currency: data.currency,
                key: key_id,
                // amount: '20000',
                amount: data.amount,
                // order_id: 'order_OKlVDhN4ha3plY',
                order_id: data.id,
                name: 'Backbenchers',
                prefill: {
                    // email: userData.email,
                    contact: userData.phone_number,
                    name: userData.name,
                },
                theme: { color: '#53a20e' },
            };

            RazorpayCheckout.open(options).then((paymentData) => {
                console.log("Inside here")
                alert(`Success: ${paymentData.razorpay_payment_id}`);
                setIsPurchased(true);
                storeUserPurchasedExamData();
                setIsModalVisible(false);
            }).catch((error) => {
                console.log("Error is here : " + JSON.stringify(error));
                console.error("Payment Error: ", error);
                alert(`Error: ${error.code} | ${error.description}`);
                setIsModalVisible(false);
            });
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Purchase Failed', 'There was an error processing your purchase. Please try again.');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (!userPurchasedExamDataLoaded) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#ffcc00" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {sectionData.map((sectionItem, sectionIndex) => (
                    <TouchableOpacity
                        key={sectionIndex}
                        onPress={() => handleSectionItemClick(sectionItem, sectionIndex)}
                        style={[
                            styles.sectionItemContainer,
                            (!isPurchased && sectionIndex !== unlockedIndex) && styles.lockedItemContainer
                        ]}
                    >
                        <View style={styles.sectionTextContainer}>
                            <Text style={styles.sectionItemContent}>{sectionItem.name}</Text>
                            <Text style={styles.sectionItemSubContent}>{sectionItem.questions} Questions</Text>
                        </View>
                        {isPurchased || sectionIndex === unlockedIndex ? (
                            <FontAwesome name="play-circle" size={24} color="green" />
                        ) : (
                            <FontAwesome name="lock" size={24} color="red" />
                        )}
                    </TouchableOpacity>
                ))}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={handleCancel}>
                        <View style={styles.modalOverlay}>
                            <TouchableWithoutFeedback>
                                <View style={styles.modalContainer}>
                                    <Text style={styles.modalTitle}>Locked</Text>
                                    <Text style={styles.modalMessage}>This test is locked. Please complete the previous tests or purchase to unlock.</Text>
                                    <View style={styles.modalButtonContainer}>
                                        <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
                                            <Text style={styles.modalButtonText}>Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.modalButton, styles.purchaseButton]} onPress={handlePurchase}>
                                            <Text style={styles.modalButtonText}>Purchase</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff', // Make sure SafeAreaView has a background color to cover the entire screen
    },
    container: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    sectionItemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffcc00',
        marginBottom: 8,
        borderRadius: 10,
    },
    lockedItemContainer: {
        backgroundColor: '#f0f0f0',
    },
    sectionTextContainer: {
        flex: 1,
    },
    sectionItemContent: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    sectionItemSubContent: {
        fontSize: 14,
        color: '#666',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    purchaseButton: {
        backgroundColor: '#3498db',
    },
    modalButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default SectionComponent;
