import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MathJax from 'react-native-mathjax';

const MockTestPage = ({ route }) => {
    const { mockTestName } = route.params;
    const [isTestStarted, setTestStarted] = useState(true);
    const [remainingTime, setRemainingTime] = useState(60 * 60 * 1000); // 1 hour in milliseconds
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const mmlOptions = {
        messageStyle: "none",
        extensions: ["tex2jax.js"],
        jax: ["input/TeX", "output/HTML-CSS"],
        tex2jax: {
            inlineMath: [
                ["$", "$"],
                ["\\(", "\\)"],
            ],
            displayMath: [
                ["$$", "$$"],
                ["\\[", "\\]"],
            ],
            processEscapes: true,
        },
        TeX: {
            extensions: [
                "AMSmath.js",
                "AMSsymbols.js",
                "noErrors.js",
                "noUndefined.js",
            ],
        },
    };

    useEffect(() => {
        let timer;

        if (isTestStarted) {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1000);

                // Check if the time is up
                if (remainingTime <= 0) {
                    clearInterval(timer);
                    // Handle time-up logic here (e.g., submit the test)
                    submitTest();
                }
            }, 1000);
        }

        // Cleanup the interval on component unmount or when the test ends
        return () => clearInterval(timer);
    }, [isTestStarted, remainingTime, currentQuestionIndex]);

    // Helper function to format time as HH:MM:SS
    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours}:${minutes}:${seconds}`;
    };

    // Placeholder data for multiple questions
    const questionsData = [
        {
            question: 'What is the capital of France?',
            options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
            correctAnswer: 'Paris',
        },
        {
            question: 'Which planet is known as the Red Planet?',
            options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
            correctAnswer: 'Mars',
        },
        {
            question: 'Who wrote the play "Romeo and Juliet"?',
            options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Leo Tolstoy'],
            correctAnswer: 'William Shakespeare',
        },
        {
            question: 'A current I flows in an infinitely long wire with cross-section in the form of a semi-circular ring of radius R. The magnitude of the magnetic induction along its axis is',
            options: [
                '(a) \\(\\frac{\\mu_{0} \\cdot I}{\\pi^2 \\cdot R}\\)',
                '(b) \\(\\frac{\\mu_{0} \\cdot I}{2\\pi^2 \\cdot R}\\)',
                '(c) \\(\\frac{\\mu_{0} \\cdot I}{2\\pi \\cdot R}\\)',
                '(d) \\(\\mu \\cdot I \\cdot \\frac{1}{4\\pi \\cdot R}\\)',
            ],
            correctAnswer: '(b) \\(\\frac{\\mu_{0} \\cdot I}{2\\pi \\cdot R}\\)',
        },
    ];

    const submitTest = () => {
        // Add logic to handle test submission
        console.log('Test submitted!');
    };

    const handleAnswerSelection = (answer) => {
        // Handle logic for answer selection
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        // Move to the next question
        console.log('handleNextQuestion called');
        if (currentQuestionIndex < questionsData.length - 1) {
            console.log('Inside handleNextQuestion');
            console.log('currentQuestionIndex is ' + currentQuestionIndex + ' updating it to ' + (currentQuestionIndex + 1));
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null); // Reset selected answer for the new question
        }
    };

    const handlePreviousQuestion = () => {
        console.log('handlePreviousQuestion called');
        // Move to the previous question
        if (currentQuestionIndex > 0) {
            console.log('Inside handlePreviousQuestion');
            console.log('currentQuestionIndex is ' + currentQuestionIndex + ' updating it to ' + (currentQuestionIndex - 1));
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswer(null); // Reset selected answer for the new question
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.testInfoContainer}>
                <Text style={styles.testTitle}>{mockTestName}</Text>
                <View style={styles.testSubHeader}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Time Remaining</Text>
                        <Text style={styles.infoValue}>{formatTime(remainingTime)}</Text>
                    </View>
                    <TouchableOpacity onPress={submitTest} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.questionContainer}>
                <Text style={styles.questionText}>{questionsData[currentQuestionIndex].question}</Text>
                <MathJax
                    mathJaxOptions={mmlOptions}
                    html={
                        "\\(\\frac{\\mu_{0} \\cdot I}{\\pi^2 \\cdot R}\\)\n  $sum_{i=0}^n i^2 = \\frac{(n^2+n)(2n+1)}{6}$"
                    }
                />
                {questionsData[currentQuestionIndex].options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleAnswerSelection(option)}
                        style={[
                            styles.optionButton,
                            selectedAnswer === option && styles.selectedOption,
                        ]}
                    >
                        {/*<Text style={styles.optionText}>*/}
                            <MathJax
                                mathJaxOptions={mmlOptions}
                                html={option}
                            />
                            {/*{option}*/}
                        {/*</Text>*/}
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.navigationContainer}>
                <TouchableOpacity onPress={handlePreviousQuestion} style={styles.navigationButton}>
                    <Text style={styles.navigationButtonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextQuestion} style={styles.navigationButton}>
                    <Text style={styles.navigationButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    testInfoContainer: {
        backgroundColor: '#3498db',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        width: '100%', // Adjust the width as needed
        alignItems: 'center', // Center content
    },
    testTitle: {
        color: '#ffcc00',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    testSubHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Align items horizontally
        alignItems: 'center', // Center items vertically
        width: '100%',
    },
    infoRow: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    infoLabel: {
        color: '#fff',
        fontSize: 16,
        marginRight: 8,
    },
    infoValue: {
        color: '#ffcc00', // Accent color for values
        fontSize: 16,
        fontWeight: 'bold',
    },
    questionContainer: {
        marginTop: 20,
        width: '100%',
    },
    questionText: {
        fontSize: 18,
        marginBottom: 16,
    },
    mathView: {
        height: 40,
        marginBottom: 16,
    },
    optionButton: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    selectedOption: {
        backgroundColor: '#ffcc00', // Yellow background for selected option
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        width: '100%',
    },
    navigationButton: {
        backgroundColor: '#3498db',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        width: '48%', // Adjust the width as needed
        alignItems: 'center',
    },
    navigationButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#ffcc00',
        borderRadius: 18,
        paddingVertical: 8,
        paddingHorizontal: 18,
    },
    submitButtonText: {
        color: '#333',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default MockTestPage;
