import Pdf from "react-native-pdf";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useRoute} from "@react-navigation/native";

const NCERTChapterDetailPage = () => {
    const route = useRoute();
    const { selectedChapter } = route.params;

    return(
        <View style={styles.pdfContainer}>
            <Pdf
                trustAllCerts={false}
                source={{ uri: selectedChapter.chapter_url, cache: true }}
                // source={{ uri: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf', cache: true }}
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
            {/*<TouchableOpacity onPress={() => setSelectedChapter(null)}>*/}
            {/*<TouchableOpacity>*/}
            {/*    <Text>Go back</Text>*/}
            {/*</TouchableOpacity>*/}
        </View>
    )
}

const styles = StyleSheet.create({
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

export default NCERTChapterDetailPage;
