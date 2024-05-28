import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../Shared/Colors';
import MockTestPageSidePanel from "./MockTestPageSidePanel";
import {useSelector} from "react-redux";

const MockTestSolutionsPage = ({ route }) => {
    const { score, mockTestScore, answeredQuestions, numberOfAnsweredQuestion, correctAnswers,
        bookmarkedQuestions } = route.params;
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

            <ScrollView style={styles.middleContainer} removeClippedSubviews={true}>
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
        paddingVertical: 1,
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

export default MockTestSolutionsPage;