/*
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import React, {useState} from "react";

const MockTestPageSidePanel = ({questionsData}) => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isSidePanelOpen, setSidePanelOpen] = useState(false);
    const toggleSidePanel = () => {
        setSidePanelOpen(!isSidePanelOpen);
    };
    const navigateToQuestion = (questionIndex) => {
        setCurrentQuestionIndex(questionIndex);
        setSidePanelOpen(false); // Close the side panel after navigation
    };

    const renderQuestionNumbers = () => {
        return (
            <View style={styles.questionNumbersContainer}>
                {questionsData.map((question, index) => (
                    <TouchableOpacity key={index} onPress={() => navigateToQuestion(index)} style={styles.questionButton}>
                        <Text style={styles.questionButtonText}>{index + 1}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
         // Icon to toggle side panel
        <View style={styles.container}>
            <TouchableOpacity style={styles.sidePanelToggle} onPress={toggleSidePanel}>
                <MaterialIcons name={isSidePanelOpen ? "chevron-left" : "chevron-right"} size={24} color="black" />
            </TouchableOpacity>

            {/!* Side Panel *!/}
            {isSidePanelOpen && (
                <View style={[styles.sidePanel, { right: 0 }]}>
                    <ScrollView>
                        {renderQuestionNumbers()}
                    </ScrollView>
                </View>
            )}
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 16,
    },
    sidePanel: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 250, // Increase width as needed
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        zIndex: 1,
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
    questionNumbersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    },
    questionButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});*/


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

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
                    <TouchableOpacity key={index} onPress={() => navigateToQuestion(index)} style={styles.questionButton}>
                        <Text style={styles.questionButtonText}>{index + 1}</Text>
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
        width: 250, // Increase width as needed
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
    },
    questionButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MockTestPageSidePanel;
