import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContentComponent = ({ contentData }) => {
    return (
        <View>
            <Text style={styles.sectionHeading}>Content View:</Text>
            {contentData.map((contentItem, contentIndex) => (
                <View key={contentIndex}>
                    {contentItem.type === 'heading' && (
                        <Text style={styles.heading}>{`Heading ${contentIndex + 1}: ${contentItem.text}`}</Text>
                    )}
                    {contentItem.type === 'paragraph' && (
                        <Text style={styles.paragraph}>{`Paragraph ${contentIndex + 1}: ${contentItem.text}`}</Text>
                    )}
                    {/* Add more conditions for other content types as needed */}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    sectionHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    paragraph: {
        fontSize: 14,
        marginBottom: 10,
    },
});

export default ContentComponent;
