// MockTestInfo.js
import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import {createClient} from "@supabase/supabase-js";

const MockTestInfo = ({ route }) => {
    const navigation = useNavigation();
    const { mockTestName, examName, sectionData } = route.params;
    // const [mockTestData, setMockTestData] = useState([]);

    const supabase = createClient('https://cwmjnqlyudqeophvuwoz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bWpucWx5dWRxZW9waHZ1d296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5ODQ3ODMsImV4cCI6MjAxNTU2MDc4M30.sh0WAxm0qQ21qwytZHj1rYonwrne6BU_wQgV_LYpic0')


    useEffect(() => {
        // fetchMockTestData();
        // console.log("Section data in info page : " + JSON.stringify(sectionData));
    }, []);

    /*const fetchMockTestData = async () => {
        try {
            console.log("Table Name : " + examName + "_mock_tests")
            const { data: mockTestDataFromSupabase, error } = await supabase
                // .from(examName + "_mock_tests")
                .from("neet_mock_tests")
                .select('*')
                .eq('mock_test_name', mockTestName)

            if (error) {
                console.error('Error fetching data:', error.message);
            } else {
                setMockTestData(mockTestDataFromSupabase);
                // console.log('mockTestData :', JSON.stringify(mockTestDataFromSupabase));
            }
        } catch (error) {
            console.error('Error in catch block:', error.message);
        }
    }*/

    /*const startTest = () => {
        navigation.navigate('mock-test-page', {
            mockTestData: mockTestData
        });
    };*/

    const startTest = () => {
        navigation.navigate('mock-test-page', {
            mockTestData: sectionData
        });
    };

    /*return (
        <View style={styles.container}>
            {mockTestData && mockTestData[0] && (
                <View style={styles.testInfoContainer}>
                    <Text style={styles.testTitle}>{mockTestData[0]['mock_test_info'].testInfoContainer.testTitle}</Text>
                    {mockTestData[0]['mock_test_info'].testInfoContainer.infoRows.map((infoRow, index) => (
                        <View key={index} style={styles.infoRow}>
                            <Text style={styles.label}>{infoRow.label}:</Text>
                            <Text style={styles.value}>{infoRow.value}</Text>
                        </View>
                    ))}
                </View>
            )}
            <TouchableOpacity onPress={startTest} style={styles.startButton}>
                <Text style={styles.startButtonText}>Start Test</Text>
            </TouchableOpacity>
        </View>
    );*/

    return (
        <View style={styles.container}>
            {sectionData && (
                <View style={styles.testInfoContainer}>
                    <Text style={styles.testTitle}>{sectionData['mock_test_info'].testInfoContainer.testTitle}</Text>
                    {sectionData['mock_test_info'].testInfoContainer.infoRows.map((infoRow, index) => (
                        <View key={index} style={styles.infoRow}>
                            <Text style={styles.label}>{infoRow.label}:</Text>
                            <Text style={styles.value}>{infoRow.value}</Text>
                        </View>
                    ))}
                </View>
            )}
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
