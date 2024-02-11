import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js';
import ContentComponent from "./ContentComponent";
import SectionComponent from "./SectionComponent";

const ExamDetailsPage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { exam } = route.params;
    const [examData, setExamData] = useState([]);
    const [selectedSection, setSelectedSection] = useState('Overview');
    const [sectionContentView, setSectionContentView] = useState(null);

    const supabase = createClient('https://cwmjnqlyudqeophvuwoz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bWpucWx5dWRxZW9waHZ1d296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5ODQ3ODMsImV4cCI6MjAxNTU2MDc4M30.sh0WAxm0qQ21qwytZHj1rYonwrne6BU_wQgV_LYpic0')

    const examName = exam.exam_name.toLowerCase();
    const formatString = (inputString) => {
        const formattedString = inputString.toLowerCase().replace(/\s+/g, '_');
        return formattedString;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const tableName = exam.exam_name.toLowerCase();
                const { data: fetchedExamData, error } = await supabase
                    .from(examName)
                    .select('*');

                if (error) {
                    console.error('Error fetching data:', error.message);
                } else {
                    setExamData(fetchedExamData);
                    console.log('Fetched data:', JSON.stringify(fetchedExamData));
                }
            } catch (error) {
                console.error('Error in catch block:', error.message);
            }
        };

        fetchData();
        getSectionData('Overview');
    }, []);

    const getSectionData = (section) => {
        // const sectionName = section.toLowerCase();
        const sectionName = formatString(section);
        console.log("Section Name : " + sectionName);
        const sectionData = examData[0] ? examData[0][sectionName] : null;
        console.log("Section Data : " + sectionData);

        if (sectionData) {
            const contentView = sectionData.content && Array.isArray(sectionData.content) && (
                <ContentComponent contentData={sectionData.content} />
            );

            const sectionView = sectionData.section && Array.isArray(sectionData.section) && (
                <SectionComponent sectionData={sectionData.section} examName = {examName}/>
            );

            const sectionContent = (
                <View>
                    {contentView}
                    {sectionView}
                </View>
            );

            setSectionContentView(sectionContent);
            setSelectedSection(section);
        } else {
            console.log('Section data is missing.');
            setSectionContentView(null);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.examName}>{exam.exam_name}</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sectionsContainer}>
                {exam.sections && exam.sections.sections.map((section, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.sectionBlock}
                        onPress={() => getSectionData(section)}
                    >
                        <Text style={[styles.sectionText, { color: section === selectedSection ? '#ffcc00' : '#fff' }]}>{section}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.contentContainer}>
                {sectionContentView}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    examName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    sectionsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    sectionBlock: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#3498db',
        borderRadius: 25,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    sectionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1, // Take up the remaining space
        marginTop: -750, // Adjust the margin as needed
    },
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
    sectionItem: {
        fontSize: 14,
        marginBottom: 5,
    },
});

export default ExamDetailsPage;