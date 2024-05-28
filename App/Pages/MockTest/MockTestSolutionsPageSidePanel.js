import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../Shared/Colors"; // Import icons library

const MockTestSolutionsPageSidePanel = ({ mockTestName, questionsData, currentQuestionIndex, setCurrentQuestionIndex,
                                   isSidePanelOpen, setSidePanelOpen, toggleSidePanel, answeredQuestions,
                                   bookmarkedQuestions, visitedQuestions }) => {

    // Function to handle navigation to a specific question
    const navigateToQuestion = (questionIndex) => {
        setCurrentQuestionIndex(questionIndex);
        setSidePanelOpen(false); // Close the side panel after navigation
    };

    // Function to generate the layout for question numbers
    const renderQuestionNumbers = () => {
        return (
            <View style={styles.questionNumbersContainer}>
                {questionsData.map((question, index) => {
                    const isFlagged = bookmarkedQuestions[index];
                    let questionButtonStyle = [styles.questionButton];
                    let isCorrectAnswer;
                    let isIncorrectAnswer;
                    if (index === currentQuestionIndex) {
                        questionButtonStyle.push(styles.currentQuestion);
                    }

                    const answered = answeredQuestions[index];
                    if (answered === question.correct_answer) {
                        questionButtonStyle.push(styles.correctAnswer);
                        isCorrectAnswer = true;
                    } else if (answered !== null) {
                        questionButtonStyle.push(styles.incorrectAnswer);
                        isIncorrectAnswer = true;
                    }

                    return (
                        <TouchableOpacity key={index} onPress={() => navigateToQuestion(index)} style={questionButtonStyle}>
                            <Text style={styles.questionButtonText}>{index + 1}</Text>
                            {/* Visual indicator for answered questions */}
                            {isCorrectAnswer && <MaterialIcons name="done" size={16} color="#fff" />}
                            {isIncorrectAnswer && <MaterialIcons name="close" size={16} color="#fff"/>}
                            {isFlagged && <MaterialIcons name="bookmark" size={12} color="red" />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.sidePanel}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.mockTestName}>{mockTestName}</Text>
                <TouchableOpacity onPress={toggleSidePanel} style={styles.closeButton}>
                    <MaterialIcons name="close" size={24} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.divider} />

            <ScrollView removeClippedSubviews={true}>
                {renderQuestionNumbers()}
            </ScrollView>

            <View style={styles.divider} />
            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.legendRow}>
                    <View style={styles.colorCircles}>
                        <View style={[styles.colorCircle, { backgroundColor: '#2ecc71' }]} />
                        <Text>Correct</Text>
                    </View>
                    <View style={styles.colorCircles}>
                        <View style={[styles.colorCircle, { backgroundColor: '#ff5733' }]} />
                        <Text>Incorrect</Text>
                    </View>
                </View>
                <View style={styles.legendRow}>
                    <View style={styles.colorCircles}>
                        <View style={[styles.colorCircle]}>
                            <MaterialIcons name="bookmark" size={21} color="red" />
                        </View>
                        <Text>Flagged</Text>
                    </View>
                    <View style={styles.colorCircles}>
                        <View style={[styles.colorCircle, { backgroundColor: Colors.primary }]} />
                        <Text>Not Attempted</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sidePanel: {
        position: 'absolute',
        top: 55,
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
        marginTop: -30,
    },
    mockTestName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 5,
    },
    questionNumbersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center', // Align numbers to the center
    },
    questionButton: {
        margin: 5,
        padding: 10,
        backgroundColor: Colors.primary,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 45, // Set fixed width to ensure consistent bubble size
        height: 45, // Set fixed height to ensure consistent bubble size
    },
    currentQuestionText: {
        fontWeight: 'bold', // Bold text for current question
    },
    questionButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    footer: {
        marginTop: 10,
    },
    legendRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    colorCircles: {
        alignItems: 'center',
        flex: 1,
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
    currentQuestion: {
        borderRadius: 0, // Make the current question bubble square
        width: 45, // Ensure width is consistent
        height: 45, // Ensure height is consistent
    },
    correctAnswer: {
        backgroundColor: '#2ecc71', // Color for attempted questions
    },
    incorrectAnswer: {
        backgroundColor: '#ff5733', // Color for flagged questions
    },
    visitedQuestion: {
        backgroundColor: Colors.secondary, // Highlight current question
    },
    notVisitedQuestion: {
        // backgroundColor: '#999999', // Color for not visited questions
        backgroundColor: Colors.primary, // Color for not visited questions
    },
});

export default MockTestSolutionsPageSidePanel;