/*import React, { useEffect, useState } from "react";
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Colors from "../Shared/Colors";
import { createClient } from '@supabase/supabase-js';
import { useRoute } from "@react-navigation/native";
import 'react-native-url-polyfill/auto'

const NCERTClassDetailPage = () => {
    const supabase = createClient('https://cwmjnqlyudqeophvuwoz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bWpucWx5dWRxZW9waHZ1d296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5ODQ3ODMsImV4cCI6MjAxNTU2MDc4M30.sh0WAxm0qQ21qwytZHj1rYonwrne6BU_wQgV_LYpic0')
    const [subjectList, setSubjectList] = useState([]);
    const [groupedSubjects, setGroupedSubjects] = useState({});
    const route = useRoute();
    const { classData } = route.params;
    const [selectedSubject, setSelectedSubject] = useState(null);

    useEffect(() => {
        getClassSubjectsList();
    }, [])

    const getClassSubjectsList = async () => {
        try {
            let { data: ncert, error } = await supabase
                .from('ncert')
                .select('*')
                .eq('class', classData.child_exam_name)

            const groupedSubjects = ncert.reduce((acc, subject) => {
                const { subject_name, ...rest } = subject;

                if (!acc[subject_name]) {
                    acc[subject_name] = [];
                }

                acc[subject_name].push({ ...rest });

                return acc;
            }, {});

            console.log("Grouped Subjects: ", groupedSubjects);
            setGroupedSubjects(groupedSubjects);
            setSubjectList(Object.keys(groupedSubjects));
            setSelectedSubject(Object.keys(groupedSubjects)[0]);
        } catch (error) {
            console.error('Error fetching data from Supabase:', error);
        }
    }

    const renderSubjectItem = (subject) => (
        <TouchableOpacity
            key={subject}
            style={{
                padding: 10,
                borderBottomWidth: 2,
                borderBottomColor: selectedSubject === subject ? Colors.primary : Colors.white,
            }}
            onPress={() => handleSubjectClick(subject)}
        >
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{subject}</Text>
        </TouchableOpacity>
    );

    const handleSubjectClick = (subject) => {
        setSelectedSubject(selectedSubject === subject ? null : subject);
    };

    const renderBookItem = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            style={{
                flex: 1,
                backgroundColor: Colors.white,
                marginRight: index % 2 === 0 ? 10 : 0,
                marginBottom: 10,
                borderRadius: 10,
                maxWidth: '49%',
            }}
            // onPress={() => onPressCourse(item)}
        >
            <Image
                source={{ uri: item.book_logo }}
                style={{
                    width: '100%',
                    height: 250,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    resizeMode: 'contain',
                }}
            />
            <View style={{ padding: 7,}}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.book_name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subjects}>
                {subjectList.map(renderSubjectItem)}
            </ScrollView>
            {selectedSubject && (
                <FlatList
                    data={groupedSubjects[selectedSubject]}
                    renderItem={renderBookItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    style={styles.books}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    subjects:{
        // borderWidth: 2,
        // borderColor: Colors.red,
        color:Colors.white,
        // backgroundColor: Colors.black,
        paddingTop:20,
        // marginTop:-25,
        backgroundColor:'#fff',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        maxHeight:70,
        minHeight:70,
        // marginBottom: 20,
        // marginTop: 20
    },
    books:{
        // borderWidth: 2,
        // borderColor: Colors.primary,
        paddingHorizontal: 5,
    },
})

export default NCERTClassDetailPage;*/


import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../Shared/Colors";
import { createClient } from '@supabase/supabase-js';
import {useNavigation, useRoute} from "@react-navigation/native";
import 'react-native-url-polyfill/auto'

const NCERTClassDetailPage = () => {
    const supabase = createClient('https://cwmjnqlyudqeophvuwoz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bWpucWx5dWRxZW9waHZ1d296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5ODQ3ODMsImV4cCI6MjAxNTU2MDc4M30.sh0WAxm0qQ21qwytZHj1rYonwrne6BU_wQgV_LYpic0')
    const navigation = useNavigation();
    const [subjectList, setSubjectList] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [booksForSubject, setBooksForSubject] = useState([]);
    const route = useRoute();
    const { classData } = route.params;

    useEffect(() => {
        console.log("classData : ", classData);
        getClassSubjectsList();
        // backfillBoth();
    }, []);

    const getClassSubjectsList = async () => {
        try {
            console.log("classData : ", JSON.stringify(classData));
            // Fetch subjects from the ncert_subjects table
            let { data: subjectsData, error: subjectsError } = await supabase
                .from('ncert_subjects')
                .select('*')
                .eq('class_name', classData.class);

            setSubjectList(subjectsData || []);
            setSelectedSubject(subjectsData[0] || null);

            console.log("subjectsData : ", subjectsData);

            if (subjectsData.length > 0) {
                getBooksForSubject(subjectsData[0]); // Fetch books for the first subject
            }
        } catch (error) {
            console.error('Error fetching subjects from Supabase:', error);
        }
    };

    const getBooksForSubject = async (subject) => {
        try {
            console.log("Subject ID ================ " + JSON.stringify(subject));
            // Fetch books from the ncert_books table for the selected subject
            let { data: booksData, error: booksError } = await supabase
                .from('ncert_books')
                .select('*')
                .eq('subject_name', subject.subject_name)
                .eq('class_name', subject.class_name);

            setBooksForSubject(booksData || []);
        } catch (error) {
            console.error('Error fetching books from Supabase:', error);
        }
    };

    const renderSubjectItem = (subject) => (
        <TouchableOpacity
            key={subject.subject_name}
            style={{
                padding: 10,
                borderBottomWidth: 2,
                borderBottomColor: selectedSubject === subject ? Colors.primary : Colors.white,
            }}
            onPress={() => handleSubjectClick(subject)}
        >
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{subject.subject_name}</Text>
        </TouchableOpacity>
    );

    const handleSubjectClick = (subject) => {
        setSelectedSubject(selectedSubject === subject ? null : subject);
        getBooksForSubject(subject); // Fetch books for the selected subject
    };

    const renderBookItem = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            style={{
                flex: 1,
                backgroundColor: Colors.white,
                marginRight: index % 2 === 0 ? 10 : 0,
                marginBottom: 10,
                borderRadius: 10,
                maxWidth: '49%',
            }}
            onPress={() => onPressBook(item)}
        >
            <Image
                source={{ uri: item.book_logo }}
                style={{
                    width: '100%',
                    height: 250,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    resizeMode: 'contain',
                }}
            />
            <View style={{ padding: 7 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.book_name}</Text>
            </View>
        </TouchableOpacity>
    );

    const onPressBook = (bookData) => {

        navigation.navigate('ncert-book-detail', {
            bookData: bookData
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subjects}>
                {subjectList.map(renderSubjectItem)}
            </ScrollView>
            {selectedSubject && (
                <FlatList
                    data={booksForSubject}
                    renderItem={renderBookItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    style={styles.books}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    subjects: {
        color: Colors.white,
        paddingTop: 20,
        backgroundColor: '#fff',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        maxHeight: 70,
        minHeight: 70,
    },
    books: {
        paddingHorizontal: 5,
    },
});

export default NCERTClassDetailPage;


// Backfill script which picks data from ncert table and insert in ncert_books

/*const classFinder = (className) => {
        if(className === "9"){
            return 2;
        }
        return 1;
    }

    let temp = 0;
    const getId = () => {
        temp++;
        return temp;
    }
    const backfill = async () => {
        console.log("--------------- Backfill Started -------------------------")
        let {data: books, error: subjectsError} = await supabase
            .from('ncert_books')
            .select('*')

        // console.log("Book Length should be 0 and is : " + books.length)

        if (books.length <= 0) {
            let {data: ncertData, error: subjectsError} = await supabase
                .from('ncert')
                .select('*')

            // console.log("ncertData Length should be 59 and is : " + ncertData.length)

            ncertData.map(async books => {

                // console.log("subject_name is " + books.subject_name + " and books.class is " + books.class + " and class_id is " + classFinder(books.class));

                let {data: ncertData, error: subjectsError} = await supabase
                    .from('ncert_subjects')
                    .select('*')
                    .eq('subject_name', books.subject_name)
                    .eq('class_id', classFinder(books.class));

                // console.log("ncertData : " + JSON.stringify(ncertData));
                // console.log("ncertData Length should be 1 and is : " + ncertData.length+ " and its id : " + ncertData[0].id)

                console.log("New row -> id: " + getId())
                console.log("New row -> subject_id: " +  ncertData[0].id)
                console.log("New row -> book_name: " +  books.book_name)
                console.log("New row -> book_logo: " +  books.book_logo)
                console.log("New row -> medium: " +  'English')
                console.log("New row -> created_at: " +  '2023-11-27 22:25:44.300706')

                const {error} = await supabase
                    .from('ncert_books')
                    .insert({
                        id: getId(),
                        subject_id: ncertData[0].id,
                        book_name: books.book_name,
                        book_logo: books.book_logo,
                        medium:'English',
                        created_at: '2023-11-27 22:25:44.300706'
                    })
                console.log("Error : " + JSON.stringify(error))
            })
        }
        console.log("--------------- Backfill Completed -------------------------")
    }*/



// Backfill the class name and subject name in books from other tables

/*const backfillBoth = async () => {
    let {data: booksData, error: subjectsError} = await supabase
        .from('ncert_books')
        .select('*')

    booksData.map(async book => {
        let {data: subjectsData, error: subjectsError} = await supabase
            .from('ncert_subjects')
            .select('*')
            .eq('id', book.subject_id)

        const {error} = await supabase
            .from('ncert_books')
            .update({
                class_name: subjectsData[0].class_name,
                subject_name: subjectsData[0].subject_name,
            })
            .eq('id', book.id)
    })
}*/












