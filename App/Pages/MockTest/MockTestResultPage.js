import React, { useEffect, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {StackActions, useFocusEffect} from '@react-navigation/native';
import Colors from "../../Shared/Colors";

const AnalyticPage = ({ route, navigation }) => {
    const { score, mockTestScore, answeredQuestions, numberOfAnsweredQuestion, correctAnswers,
        bookmarkedQuestions, visitedQuestions } = route.params;

    const handleSolutionsButtonAction = () => {
        navigation.navigate('mock-test-solutions-page', {
            score: score,
            mockTestScore: mockTestScore,
            answeredQuestions: answeredQuestions,
            numberOfAnsweredQuestion: numberOfAnsweredQuestion,
            correctAnswers: correctAnswers,
            bookmarkedQuestions: bookmarkedQuestions,
            visitedQuestions: visitedQuestions
        });
    }

    // Calculate accuracy
    const accuracy = (correctAnswers / numberOfAnsweredQuestion) * 100;

    const isMockTestResultPageNavigatedRef = useRef(false);

    /*useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (!isMockTestResultPageNavigatedRef.current) {
                // Prevent default behavior of going back
                e.preventDefault();

                const routeName = route.name;
                console.log("routeName : " + routeName);

                if (routeName === 'mock-test-result-page') {

                    // Mark as navigated
                    isMockTestResultPageNavigatedRef.current = true;

                    // Reset stack to top and navigate
                    // navigation.dispatch(StackActions.popToTop());
                    navigation.navigate('exam-details-page');
                    // navigation.dispatch(StackActions.replace('exam-details-page'));
                }
            }
        });

        return () => {
            unsubscribe();
        };
    }, [navigation, route.name]);*/

    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = navigation.addListener('beforeRemove', (e) => {
                if (!isMockTestResultPageNavigatedRef.current) {
                    // Prevent default behavior of going back
                    e.preventDefault();

                    const routeName = route.name;
                    console.log("routeName : " + routeName);

                    // Mark as navigated
                    isMockTestResultPageNavigatedRef.current = true;

                    // Reset stack to top and navigate
                    navigation.navigate('exam-details-page');
                }
            });

            return () => {
                // Cleanup the listener when the component loses focus or unmounts
                unsubscribe();
            };
        }, [navigation, route.name])
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Your Analytics</Text>
                </View>
                <View style={styles.scoreContainer}>
                    <Feather name="award" size={40} color="#FFD700" />
                    <View style={styles.scoreContent}>
                        <Text style={styles.scoreLabel}>Your Score:</Text>
                        <Text style={styles.scoreValue}>{score}</Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <View style={styles.infoBlock}>
                                <Feather name="bar-chart-2" size={40} color="#007bff" />
                                <View style={styles.infoContent}>
                                    <Text style={styles.infoHeading}>Total Score</Text>
                                    <Text style={styles.infoText}>{mockTestScore}</Text>
                                </View>
                            </View>
                            <View style={styles.infoBlock}>
                                <Feather name="alert-circle" size={40} color="#dc3545" />
                                <View style={styles.infoContent}>
                                    <Text style={styles.infoHeading}>Wrong</Text>
                                    <Text style={styles.infoText}>{numberOfAnsweredQuestion - correctAnswers}</Text>
                                </View>
                            </View>
                            <View style={styles.infoBlock}>
                                <Feather name="percent" size={40} color="#FFD700" />
                                <View style={styles.infoContent}>
                                    <Text style={styles.infoHeading}>Accuracy</Text>
                                    <Text style={styles.infoText}>{accuracy.toFixed(2)}%</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.column}>
                            <View style={styles.infoBlock}>
                                <Feather name="check-circle" size={40} color="#28a745" />
                                <View style={styles.infoContent}>
                                    <Text style={styles.infoHeading}>Correct</Text>
                                    <Text style={styles.infoText}>{correctAnswers}</Text>
                                </View>
                            </View>
                            <View style={styles.infoBlock}>
                                <Feather name="activity" size={40} color="#007bff" />
                                <View style={styles.infoContent}>
                                    <Text style={styles.infoHeading}>Attempted</Text>
                                    <Text style={styles.infoText}>{numberOfAnsweredQuestion}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MockTestPage')}>
                    <Text style={styles.buttonText}>Retake the Test</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSolutionsButtonAction}>
                    <Text style={styles.buttonText}>Solutions</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 100, // Adjust paddingBottom to accommodate the footer
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    infoContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    infoBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    infoContent: {
        marginLeft: 20,
    },
    infoHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    infoText: {
        fontSize: 18,
        color: '#555',
    },
    scoreContainer: {
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    scoreContent: {
        marginLeft: 10,
    },
    scoreLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    scoreValue: {
        fontSize: 36,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AnalyticPage;
