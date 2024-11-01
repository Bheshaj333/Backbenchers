import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import ContentComponent from "./ContentComponent";
import SectionComponent from "./SectionComponent";
import {SafeAreaView} from "react-native-safe-area-context";
import Colors from "../../Shared/Colors";
import {useSelector} from "react-redux";

const ExamDetailsPage = () => {
        const navigation = useNavigation();
        const exam = useSelector((state) => state.exam.examData);
        // const [examDataLoaded, setExamDataLoaded] = useState(false);
        const [selectedSection, setSelectedSection] = useState('Overview');
        const [sectionContentView, setSectionContentView] = useState(null);

        // const supabase = createClient('https://cwmjnqlyudqeophvuwoz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bWpucWx5dWRxZW9waHZ1d296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5ODQ3ODMsImV4cCI6MjAxNTU2MDc4M30.sh0WAxm0qQ21qwytZHj1rYonwrne6BU_wQgV_LYpic0')
    
        const formatString = (inputString) => {
            return inputString.toLowerCase().replace(/\s+/g, '_');
        };

        useEffect(() => {
            // Only call getSectionData when examData is available
            // Auto-select the first section when data is fetched
            const firstSection = formatString(exam.sections.sections[0]);
            getSectionData(firstSection);
        }, []);

        const getSectionData = (section) => {
            // const sectionName = section.toLowerCase();
            const sectionName = formatString(section);
            console.log("Section Name : " + sectionName);
            const sectionData = exam ? exam[sectionName] : null;

            if (sectionData) {
                const contentView = sectionData.content && Array.isArray(sectionData.content) && (
                    <ContentComponent contentData={sectionData.content} />
                );
    
                const sectionView = sectionData.section && Array.isArray(sectionData.section) && (
                    <SectionComponent sectionData={sectionData.section} examData = {exam}/>
                );
    
                const sectionContent = (
                    <View style={styles.contentContainer}>
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
            <SafeAreaView style={styles.container}>
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
    
                <View style={styles.page}>
                    {sectionContentView}
                    {/*{ examDataLoaded ? (*/}
                    {/*    sectionContentView*/}
                    {/*) : (*/}
                    {/*        <ActivityIndicator size="large" color="#ffcc00" />*/}
                    {/*    )}*/}
                </View>
            </SafeAreaView>
        );
    };
    
    const styles = StyleSheet.create({
        page: {
            // borderWidth: 2,
            // borderColor: '#000',
            flex: 1, // Take up the remaining space
            marginTop: -780, // Adjust the margin as needed
            alignItems: 'middle',
            justifyContent: 'center'
        },
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: '#fff',
            height: '100%',
            width: '100%',
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
            // borderWidth: 2,
            // borderColor: '#000',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        sectionBlock: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: Colors.primary,
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
            // borderWidth: 2,
            // borderColor: '#000',
            flex: 1, // Take up the remaining space
            // marginTop: -780, // Adjust the margin as needed
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
