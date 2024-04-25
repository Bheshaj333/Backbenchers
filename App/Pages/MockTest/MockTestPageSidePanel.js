/*
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons library

const MockTestPageSidePanel = ({ questionsData, currentQuestionIndex, setCurrentQuestionIndex, isSidePanelOpen, setSidePanelOpen, toggleSidePanel }) => {
    // Function to handle navigation to a specific question
    const navigateToQuestion = (questionIndex) => {
        setCurrentQuestionIndex(questionIndex);
        setSidePanelOpen(false); // Close the side panel after navigation
    };

    // Function to generate the layout for question numbers
    const renderQuestionNumbers = () => {
        return (
            <View style={styles.questionNumbersContainer}>
                {questionsData.map((question, index) => (
                    <TouchableOpacity key={index} onPress={() => navigateToQuestion(index)} style={[styles.questionButton, index === currentQuestionIndex && styles.currentQuestion]}>
                        <Text style={[styles.questionButtonText, index === currentQuestionIndex && styles.currentQuestionText]}>{index + 1}</Text>
                        {/!* Visual indicator for answered questions *!/}
                        {question.answered && <MaterialIcons name="done" size={16} color="#fff" />}
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <View style={[styles.sidePanel, { right: 0 }]}>
            <ScrollView>
                {renderQuestionNumbers()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    sidePanel: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 300, // Increase width to make it bigger
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        zIndex: 1,
    },
    questionNumbersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center', // Align numbers to the center
        // justifyContent: 'center', // Center horizontally
    },
    questionButton: {
        margin: 5,
        padding: 10,
        backgroundColor: '#3498db',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 45, // Set fixed width to ensure consistent bubble size
        height: 45, // Set fixed height to ensure consistent bubble size
    },
    currentQuestion: {
        backgroundColor: '#ffcc00', // Highlight current question
    },
    currentQuestionText: {
        fontWeight: 'bold', // Bold text for current question
    },
    questionButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MockTestPageSidePanel;
*/


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons library

const MockTestPageSidePanel = ({ mockTestName, questionsData, currentQuestionIndex, setCurrentQuestionIndex, isSidePanelOpen, setSidePanelOpen, toggleSidePanel }) => {
    // Function to handle navigation to a specific question
    const navigateToQuestion = (questionIndex) => {
        setCurrentQuestionIndex(questionIndex);
        setSidePanelOpen(false); // Close the side panel after navigation
    };

    // Function to generate the layout for question numbers
    const renderQuestionNumbers = () => {
        return (
            <View style={styles.questionNumbersContainer}>
                {questionsData.map((question, index) => (
                    <TouchableOpacity key={index} onPress={() => navigateToQuestion(index)} style={[styles.questionButton, index === currentQuestionIndex && styles.currentQuestion]}>
                        <Text style={[styles.questionButtonText, index === currentQuestionIndex && styles.currentQuestionText]}>{index + 1}</Text>
                        {/* Visual indicator for answered questions */}
                        {question.answered && <MaterialIcons name="done" size={16} color="#fff" />}
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.sidePanel}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.mockTestName}>{mockTestName}</Text>
                <TouchableOpacity onPress={toggleSidePanel} style={styles.closeButton}>
                    <MaterialIcons name="close" size={24} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.divider} />

            <ScrollView>
                {renderQuestionNumbers()}
            </ScrollView>

            <View style={styles.divider} />
            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.colorCircles}>
                    <View style={[styles.colorCircle, { backgroundColor: '#3498db' }]} />
                    <Text>Unattempted</Text>
                </View>
                <View style={styles.colorCircles}>
                    <View style={[styles.colorCircle, { backgroundColor: '#2ecc71' }]} />
                    <Text>Attempted</Text>
                </View>
                <View style={styles.colorCircles}>
                    <View style={[styles.colorCircle, { backgroundColor: '#ff5733' }]} />
                    <Text>Flagged</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sidePanel: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: 300, // Increase width to make it bigger
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        zIndex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    mockTestName: {
        fontSize: 20,
        fontWeight: 'bold',
        // color: '#ffcc00',
    },
    closeButton: {
        padding: 5,
    },
    questionNumbersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center', // Align numbers to the center
        // justifyContent: 'center', // Center horizontally
    },
    questionButton: {
        margin: 5,
        padding: 10,
        backgroundColor: '#3498db',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 45, // Set fixed width to ensure consistent bubble size
        height: 45, // Set fixed height to ensure consistent bubble size
    },
    currentQuestion: {
        backgroundColor: '#ffcc00', // Highlight current question
    },
    currentQuestionText: {
        fontWeight: 'bold', // Bold text for current question
    },
    questionButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    colorCircles: {
        alignItems: 'center',
    },
    colorCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginVertical: 5,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10, // Adjust as needed
    },
});

export default MockTestPageSidePanel;