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

const SectionComponent = ({ sectionData, examData }) => {
    const navigation = useNavigation();
    const [unlockedIndex, setUnlockedIndex] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isPurchased, setIsPurchased] = useState(false);
    const [userPurchasedExamDataLoaded, setUserPurchasedExamDataLoaded] = useState(false);
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
                mockTestName: sectionItem.name,
            });
        } else {
            setIsModalVisible(true);
        }
    };

    const handlePurchase = () => {
        setIsModalVisible(false);
        Alert.alert('Purchase', 'Handle purchase logic here');
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
