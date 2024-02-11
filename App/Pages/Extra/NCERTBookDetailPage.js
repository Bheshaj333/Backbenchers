import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { useNavigation, useRoute } from '@react-navigation/native';
import Pdf from 'react-native-pdf';

const NCERTBookDetailPage = () => {
    const supabase = createClient('https://cwmjnqlyudqeophvuwoz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bWpucWx5dWRxZW9waHZ1d296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5ODQ3ODMsImV4cCI6MjAxNTU2MDc4M30.sh0WAxm0qQ21qwytZHj1rYonwrne6BU_wQgV_LYpic0')
    const navigation = useNavigation();
    const route = useRoute();
    const { bookData } = route.params;
    const [chapters, setChapters] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState(null);

    useEffect(() => {
        getChaptersList();
    }, []);

    const getChaptersList = async () => {
        try {
            const { data: chapters, error } = await supabase
                .from('ncert_chapters')
                .select('*')
                .eq('book_id', bookData.id);

            if (error) {
                console.error('Error fetching chapters:', error.message);
            } else {
                setChapters(chapters);
            }
        } catch (error) {
            console.error('Error in catch block :', error.message);
        }
    };

    const handleChapterPress = (item) => {
        // Navigate to the NCERTChapters page, passing the selected chapter data
        navigation.navigate('ncert-chapter-detail', {
            selectedChapter: item
        });
    };

    const renderChapterItem = ({ item }) => (
        <TouchableOpacity
            style={styles.chapterItem}
            onPress={() => handleChapterPress(item)}
            // onPress={() => setSelectedChapter(item)}
        >
            <Text style={styles.chapterTitle}>{item.chapter_name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.bookTitle}>{bookData.book_name}</Text>
            <FlatList
                data={chapters}
                renderItem={renderChapterItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.chapterList}
            />

            {/* Display PDF viewer when a chapter is selected */}
            {selectedChapter && (
                <View style={styles.pdfContainer}>
                    <Pdf
                        trustAllCerts={false}
                        // source={{ uri: selectedChapter.chapter_url, cache: true }}
                        source={{ uri: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf', cache: true }}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        style={styles.pdf}
                    />
                    <TouchableOpacity onPress={() => setSelectedChapter(null)}>
                        <Text>Go back</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    bookTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    chapterList: {
        flex: 1,
    },
    chapterItem: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        elevation: 2,
    },
    chapterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    pdfContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pdf: {
        flex: 1,
        width: '100%',
    },
});

export default NCERTBookDetailPage;

