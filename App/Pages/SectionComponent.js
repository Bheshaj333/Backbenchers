import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const SectionComponent = ({ sectionData, examName }) => {
    const navigation = useNavigation();
    const handleSectionItemClick = (mockTestName) => {
        navigation.navigate('mock-test-info', {
            mockTestName: mockTestName,
            examName : examName
        })
    };

    return (
        <View style={styles.container}>
            {sectionData.map((sectionItem, sectionIndex) => (
                <TouchableOpacity
                    key={sectionIndex}
                    onPress={() => handleSectionItemClick(sectionItem)}
                    style={styles.sectionItemContainer}
                >
                    <Text style={styles.sectionItemContent}>{sectionItem}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    sectionItemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0', // Light border color
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffcc00', // Yellow background color for section items
        marginBottom: 8, // Add margin to create space between blocks
        borderRadius: 10, // Add border radius for a rounded look
    },
    sectionItemContent: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'capitalize', // Capitalize the text
    },
});

export default SectionComponent;

