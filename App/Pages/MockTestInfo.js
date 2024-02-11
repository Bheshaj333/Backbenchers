// MockTestInfo.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const MockTestInfo = ({ route }) => {
    const navigation = useNavigation();
    const { mockTestName, examName } = route.params;

    const startTest = () => {
        navigation.navigate('mock-test-page', {
            mockTestName: mockTestName
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.testInfoContainer}>
                <Text style={styles.testTitle}>{mockTestName}</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Duration:</Text>
                    <Text style={styles.value}>1 Hour</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Number of Questions:</Text>
                    <Text style={styles.value}>{3}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Marks for Each Correct Answer:</Text>
                    <Text style={styles.value}>4</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Negative Marking:</Text>
                    <Text style={styles.value}>-1</Text>
                </View>
            </View>
            <TouchableOpacity onPress={startTest} style={styles.startButton}>
                <Text style={styles.startButtonText}>Start Test</Text>
            </TouchableOpacity>
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
        alignItems: 'flex-start', // Align content to the start
    },
    testTitle: {
        color: '#ffcc00',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Align items with space between
        marginBottom: 8,
        width: '100%', // Adjust the width as needed
    },
    label: {
        color: '#fff',
        fontSize: 16,
    },
    value: {
        color: '#ffcc00', // Accent color for values
        fontSize: 16,
        fontWeight: 'bold',
    },
    startButton: {
        backgroundColor: '#ffcc00',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginTop: 16,
    },
    startButtonText: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MockTestInfo;
