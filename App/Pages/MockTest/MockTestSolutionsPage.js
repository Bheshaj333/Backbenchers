/*import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Shared/Colors';
import MockTestPageSidePanel from "./MockTestPageSidePanel";
import {useSelector} from "react-redux";

const MockTestSolutionsPage = ({ route }) => {
    // const { mockTestData } = route.params;
    const mockTestData = useSelector((state) => state.mockTest.mockTestData)[0];
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const questionsData = mockTestData['mock_test'];
    const [isSidePanelOpen, setSidePanelOpen] = useState(false);

    if (!mockTestData) {
        return <Text>Loading...</Text>;
    }

    const toggleSidePanel = () => {
        setSidePanelOpen(!isSidePanelOpen);
    };
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.testTitle}>{mockTestData['mock_test_name']}</Text>
            </View>

            <ScrollView style={styles.middleContainer}>
                <View style={styles.questionInfoContainer}>
                    <Text style={styles.questionNumber}>
                        Q. {questionsData[currentQuestionIndex].questionNumber}/{questionsData.length}{' '}
                    </Text>
                </View>
                <View style={styles.questionContainer}>
                    <AutoHeightWebView
                        style={styles.mathJaxQuestionContainer}
                        source={{
                            html: `
                                <script type="text/x-mathjax-config">
                                    MathJax.Hub.Config({
                                        messageStyle: 'none',
                                        extensions: ['tex2jax.js'],
                                        jax: ['input/TeX', 'output/HTML-CSS'],
                                        tex2jax: {
                                            inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                                            displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
                                            processEscapes: true,
                                        },
                                        TeX: {
                                            extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js'],
                                        },
                                    });
                                </script>
                                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/latest.js?config=TeX-AMS-MML_HTMLorMML"></script>
                                <span style="display: inline-block">${questionsData[currentQuestionIndex].question}</span>
                            `
                        }}
                    />
                </View>
                <View style={styles.optionsContainer}>
                    {questionsData[currentQuestionIndex].options.map((option, index) => (
                        <View key={index} style={styles.optionButton}>
                            <AutoHeightWebView
                                style={styles.mathJaxOptionContainer}
                                source={{
                                    html: `
                                        <script type="text/x-mathjax-config">
                                            MathJax.Hub.Config({
                                                messageStyle: 'none',
                                                extensions: ['tex2jax.js'],
                                                jax: ['input/TeX', 'output/HTML-CSS'],
                                                tex2jax: {
                                                    inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                                                    displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
                                                    processEscapes: true,
                                                },
                                                TeX: {
                                                    extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js'],
                                                },
                                            });
                                        </script>
                                        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/latest.js?config=TeX-AMS-MML_HTMLorMML"></script>
                                        <span style="display: inline-block">${option}</span>
                                    `
                                }}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.sidePanelToggle} onPress={toggleSidePanel}>
                <MaterialIcons name={isSidePanelOpen ? "chevron-left" : "chevron-right"} size={24} color="#000" />
            </TouchableOpacity>

            {isSidePanelOpen && (
                <MockTestPageSidePanel
                    mockTestName={mockTestData['mock_test_name']}
                    questionsData={questionsData}
                    currentQuestionIndex={currentQuestionIndex}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                    isSidePanelOpen={isSidePanelOpen}
                    setSidePanelOpen={setSidePanelOpen}
                    toggleSidePanel={toggleSidePanel}
                    answeredQuestions={answeredQuestions}
                    bookmarkedQuestions={bookmarkedQuestions}
                />
            )}

            <View style={styles.footerContainer}>
                <TouchableOpacity onPress={handlePreviousQuestion} style={styles.navigationButton}>
                    <Text style={styles.navigationButtonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextQuestion} style={styles.navigationButton}>
                    <Text style={styles.navigationButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 16,
    },
    headerContainer: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    testTitle: {
        color: '#ffcc00',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    middleContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 16,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    questionInfoContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'lightgray',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 8,
    },
    questionNumber: {
        paddingLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    questionContainer: {
        elevation: 5,
        backgroundColor: '#fff',
        marginBottom: 40,
        marginTop: 10,
        padding: 16,
        borderRadius: 10,
    },
    mathJaxQuestionContainer: {
        maxWidth: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
    },
    optionsContainer: {
        padding: 16,
    },
    optionButton: {
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 16,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    mathJaxOptionContainer: {
        maxWidth: '100%',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    navigationButton: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        width: '48%',
        alignItems: 'center',
    },
    navigationButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sidePanelToggle: {
        position: 'absolute',
        bottom: '10%',
        right: '9%',
        backgroundColor: '#ffcc00',
        padding: 12,
        borderRadius: 50,
        elevation: 5,
    },
});

export default MockTestSolutionsPage;*/



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview'
import { MaterialIcons } from '@expo/vector-icons';
import MockTestPageSidePanel from "./MockTestPageSidePanel";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useSelector} from "react-redux";

const MockTestPage = ({ route }) => {
    // const { mockTestData } = route.params;
    const mockTestData = useSelector((state) => state.mockTest.mockTestData)[0];
    const [isTestStarted, setTestStarted] = useState(true);
    const [remainingTime, setRemainingTime] = useState(
        mockTestData['mock_test_info'].testInfoContainer.duration
    );
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const questionsData = mockTestData['mock_test'];
    const mockTestScore = mockTestData['mock_test_score'];
    const [isSidePanelOpen, setSidePanelOpen] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState(Array.from({ length: (questionsData.length) }, () => null));
    const [bookmarkedQuestions, setBookmarkedQuestions] = useState(Array.from({ length: (questionsData.length) }, () => false)); // Initialize all questions as not bookmarked
    const navigation = useNavigation();
    let numberOfAnsweredQuestion = 0;
    let correctAnswers = 0;
    const toggleSidePanel = () => {
        setSidePanelOpen(!isSidePanelOpen);
    };

    useEffect(() => {
        let timer;

        if (isTestStarted) {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1000);

                if (remainingTime <= 0) {
                    clearInterval(timer);
                    submitTest();
                }
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isTestStarted, remainingTime, currentQuestionIndex]);

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours}:${minutes}:${seconds}`;
    };

    const submitTest = () => {
        console.log('Test submitted!');
        // Calculate the score
        let score = 0;
        questionsData.forEach((question, index) => {
            const answered = answeredQuestions[index];
            console.log('answered : ' + answered);
            console.log('correct_answer : ' + question.correct_answer);
            if (answered === question.correct_answer) {
                // Add marks for correct answers
                score += question.marks;
                correctAnswers++;
                numberOfAnsweredQuestion++;
                console.log("Score on correct answer: " + JSON.stringify(score));
            } else if (answered !== null) {
                // Subtract negative marks for incorrect answers (if answered)
                score += question.negativeMarks;
                numberOfAnsweredQuestion++;
                console.log("Score on incorrect answer: " + JSON.stringify(score));
            }
        });

        console.log("Score : " + JSON.stringify(score));
        navigation.navigate('mock-test-result-page', {
            score: score,
            questionsData: questionsData,
            mockTestScore: mockTestScore,
            answeredQuestions: answeredQuestions,
            numberOfAnsweredQuestion: numberOfAnsweredQuestion,
            correctAnswers: correctAnswers
        });
    };

    const handleAnswerSelection = (answer, currentQuestionIndex) => {
        setAnsweredQuestions(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            // Toggle the answer: if it's selected, deselect it; if it's deselected, select it
            updatedAnswers[currentQuestionIndex] = updatedAnswers[currentQuestionIndex] === answer ? null : answer;
            return updatedAnswers;
        });
    };

    const toggleBookmark = () => {
        setBookmarkedQuestions(prevBookmarks => {
            const updatedBookmarks = [...prevBookmarks];
            updatedBookmarks[currentQuestionIndex] = !updatedBookmarks[currentQuestionIndex]; // Toggle the bookmark status
            return updatedBookmarks;
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            // setSelectedAnswer(null);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            // setSelectedAnswer(null);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.testTitle}>{mockTestData['mock_test_name']}</Text>
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

            {/* Middle Content (Swipeable) */}
            <ScrollView style={styles.middleContainer}>
                <View style={styles.questionInfoContainer}>
                    <Text style={styles.questionNumber}>Q. {questionsData[currentQuestionIndex].questionNumber}/{questionsData.length}  </Text>
                    <TouchableOpacity style={styles.flagIconContainer} onPress={toggleBookmark}>
                        <MaterialIcons
                            name={bookmarkedQuestions[currentQuestionIndex] ? "bookmark" : "bookmark-border"}
                            size={26}
                            color={bookmarkedQuestions[currentQuestionIndex] ? "red" : "black"}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.questionContainer}>
                    <AutoHeightWebView
                        style={styles.mathJaxQuestionContainer}
                        source={{
                            html:
                                `<script type="text/x-mathjax-config">
                                    MathJax.Hub.Config({
                                        messageStyle: 'none',
                                        extensions: ['tex2jax.js'],
                                        jax: ['input/TeX', 'output/HTML-CSS'],
                                        tex2jax: {
                                            inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                                            displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
                                            processEscapes: true,
                                        },
                                        TeX: {
                                            extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js'],
                                        },
                                    });
                                </script>
                                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/latest.js?config=TeX-AMS-MML_HTMLorMML"></script>
                                <span style="display: inline-block">${questionsData[currentQuestionIndex].question}</span>`
                        }}
                    />
                </View>
                <View style={styles.optionsContainer}>
                    {questionsData[currentQuestionIndex].options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleAnswerSelection(option, currentQuestionIndex)}
                            style={styles.optionButton}
                        >
                            <AutoHeightWebView
                                style={[
                                    styles.mathJaxOptionContainer,
                                    answeredQuestions[currentQuestionIndex] === option && styles.selectedOption,
                                ]}
                                source={{
                                    html:
                                        `<script type="text/x-mathjax-config">
                                    MathJax.Hub.Config({
                                        messageStyle: 'none',
                                        extensions: ['tex2jax.js'],
                                        jax: ['input/TeX', 'output/HTML-CSS'],
                                        tex2jax: {
                                            inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                                            displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
                                            processEscapes: true,
                                        },
                                        TeX: {
                                            extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js'],
                                        },
                                    });
                                </script>
                                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/latest.js?config=TeX-AMS-MML_HTMLorMML"></script>
                                <span style="display: inline-block">${option}</span>`
                                }}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Icon to toggle side panel */}
            <TouchableOpacity style={styles.sidePanelToggle} onPress={toggleSidePanel}>
                <MaterialIcons name={isSidePanelOpen ? "chevron-left" : "chevron-right"} size={24} color="black" />
            </TouchableOpacity>

            {/* Side Panel */}
            {isSidePanelOpen && (
                <MockTestPageSidePanel
                    mockTestName={mockTestData['mock_test_name']}
                    questionsData={questionsData}
                    currentQuestionIndex={currentQuestionIndex}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                    isSidePanelOpen={isSidePanelOpen}
                    setSidePanelOpen={setSidePanelOpen}
                    toggleSidePanel={toggleSidePanel}
                    answeredQuestions={answeredQuestions}
                    bookmarkedQuestions={bookmarkedQuestions}
                />
            )}

            {/* Footer */}
            <View style={styles.footerContainer}>
                <TouchableOpacity onPress={handlePreviousQuestion} style={styles.navigationButton}>
                    <Text style={styles.navigationButtonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextQuestion} style={styles.navigationButton}>
                    <Text style={styles.navigationButtonText}>Next</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 16,
    },
    headerContainer: {
        backgroundColor: '#3498db',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    testTitle: {
        color: '#ffcc00',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    testSubHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        color: '#ffcc00',
        fontSize: 16,
        fontWeight: 'bold',
    },
    middleContainer: {
        // borderWidth: 2,
        // borderColor: '#000',
        // flex: 1,
        // flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 16,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 4,
        // padding: 16,
    },
    questionInfoContainer:{
        // borderWidth: 1,
        // borderColor: '#000',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'lightgray',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        fontSize: 16,
        fontWeight: 'bold',
    },
    questionNumber: {
        paddingLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    flagIconContainer: {
        flex: 1,
        alignItems: 'flex-end',
        padding: 8,
        borderRadius: 50,
        backgroundColor: 'lightgray',
    },
    marksText: {
        fontSize: 16,
        color: 'green',
        marginRight: 8,
    },
    negativeMarksText: {
        fontSize: 16,
        color: 'red',
    },
    questionContainer: {
        elevation: 5,
        backgroundColor: '#fff',
        marginBottom: 40,
        marginTop: 10,
        padding: 16,
        borderRadius: 10, // Added for rounded corners
    },
    mathJaxQuestionContainer: {
        maxWidth: '100%',
        borderWidth: 2,
        borderColor: '#ffcc00',
    },
    optionsContainer: {
        padding: 16,
    },
    mathJaxOptionContainer: {
        maxWidth: '100%',
        paddingVertical: 16, // Increase padding for better content spacing
        paddingHorizontal: 20,
        backgroundColor: '#fff',
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
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 16,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    selectedOption: {
        backgroundColor: '#ffcc00', // Bright color when selected
        borderRadius: 12, // Maintain rounded corners when selected
    },
    unselectedOption: {
        backgroundColor: '#fff',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    navigationButton: {
        backgroundColor: '#3498db',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        width: '48%',
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
    sidePanelToggle: {
        position: 'absolute',
        bottom: '10%',
        right: '9%',
        backgroundColor: '#ffcc00',
        padding: 12,
        borderRadius: 50, // Make it a circle
        elevation: 5, // Add elevation for shadow effect
    },

});

export default MockTestPage;