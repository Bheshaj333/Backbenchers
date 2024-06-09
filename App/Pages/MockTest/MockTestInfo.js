// MockTestInfo.js
import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator  } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import {createClient} from "@supabase/supabase-js";
import Colors from "../../Shared/Colors";
import {useDispatch, useSelector} from "react-redux";
import {setMockTestData} from "../../Redux/Actions/Actions";

const MockTestInfo = ({ route }) => {
    const navigation = useNavigation();
    const { mockTestName, mockTestId } = route.params;
    // const [mockTestData, setMockTestData] = useState([]);
    const mockTestData = useSelector((state) => state.mockTest.mockTestData);
    const [mockTestDataLoaded, setMockTestDataLoaded] = useState(false);
    const dispatch = useDispatch();

    const supabase = createClient('https://cwmjnqlyudqeophvuwoz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bWpucWx5dWRxZW9waHZ1d296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5ODQ3ODMsImV4cCI6MjAxNTU2MDc4M30.sh0WAxm0qQ21qwytZHj1rYonwrne6BU_wQgV_LYpic0')


    useEffect(() => {
        fetchMockTestData();
    }, []);

    const fetchMockTestData = async () => {
        try {
            // console.log("Table Name : " + examName + "_mock_tests")
            const { data: mockTestDataFromSupabase, error } = await supabase
                .from("mock_tests")
                .select('*')
                .eq('id', mockTestId)
                .eq('mock_test_name', mockTestName)

            if (error) {
                console.error('Error fetching data:', error.message);
            } else {
                dispatch(setMockTestData(mockTestDataFromSupabase));
                setMockTestDataLoaded(true);
            }
        } catch (error) {
            console.error('Error in catch block:', error.message);
        }
    }

    const startTest = () => {
        navigation.navigate('mock-test-page', {
            mockTestData: mockTestData[0]
        });
    };

    return (
        <View style={styles.page}>
            { mockTestDataLoaded ? (
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
            ) : (
                <ActivityIndicator size="large" color="#ffcc00" />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    testInfoContainer: {
        backgroundColor: Colors.primary,
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
