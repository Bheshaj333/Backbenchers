/*
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const AnalyticPage = ({ route }) => {
    const { score, mockTestScore, numberOfAnsweredQuestion, correctAnswers } = route.params;

    // Calculate accuracy
    const accuracy = (correctAnswers / numberOfAnsweredQuestion) * 100;

    return (
        <View style={styles.container}>
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
                    <View style={styles.infoBlock}>
                        <Feather name="bar-chart-2" size={40} color="#007bff" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoHeading}>Total Score</Text>
                            <Text style={styles.infoText}>{mockTestScore}</Text>
                        </View>
                    </View>
                    <View style={styles.infoBlock}>
                        <Feather name="check-circle" size={40} color="#28a745" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoHeading}>Correct</Text>
                            <Text style={styles.infoText}>{correctAnswers}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.infoBlock}>
                        <Feather name="alert-circle" size={40} color="#dc3545" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoHeading}>Wrong</Text>
                            <Text style={styles.infoText}>{numberOfAnsweredQuestion - correctAnswers}</Text>
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
                <View style={styles.row}>
                    <View style={styles.infoBlock}>
                        <Feather name="percent" size={40} color="#FFD700" />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoHeading}>Accuracy</Text>
                            <Text style={styles.infoText}>{accuracy.toFixed(2)}%</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        paddingTop: 40,
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
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    infoBlock: {
        // borderWidth: 1,
        // borderColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    infoContent: {
        marginLeft: 20,
    },
    infoHeading: {
        fontSize: 20,
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
        color: '#007bff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default AnalyticPage;
*/





import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const AnalyticPage = ({ route }) => {
    const { score, mockTestScore, numberOfAnsweredQuestion, correctAnswers } = route.params;

    // Calculate accuracy
    const accuracy = (correctAnswers / numberOfAnsweredQuestion) * 100;

    return (
        <View style={styles.container}>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        paddingTop: 40,
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
        // borderColor: '#000',
        // borderWidth: 1,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
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
        color: '#007bff',
    },
    row: {
        // borderColor: '#000',
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        // borderColor: '#000',
        // borderWidth: 1,
        flex: 1,
    },
});

export default AnalyticPage;
