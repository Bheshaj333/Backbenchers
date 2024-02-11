import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import Colors from "../../Shared/Colors";
import {useNavigation, useRoute} from "@react-navigation/native";
import {createClient} from "@supabase/supabase-js";

const NCERTDetail = () => {
    const supabase = createClient('https://cwmjnqlyudqeophvuwoz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bWpucWx5dWRxZW9waHZ1d296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5ODQ3ODMsImV4cCI6MjAxNTU2MDc4M30.sh0WAxm0qQ21qwytZHj1rYonwrne6BU_wQgV_LYpic0')
    const [classes, setClasses] = useState([])
    const navigation = useNavigation();
    const route = useRoute();
    const { courseData } = route.params;

    useEffect(() => {
        getCourseList();
    }, [])

    const getCourseList = async () => {
        try {
            let { data:classes, error } = await supabase
                .from('ncert_classes')
                .select('*')
            console.log("Child ExamList : " + JSON.stringify(classes));
            setClasses(classes);
        } catch (error) {
            console.error('Error fetching data from Supabase:', error);
        }
    }

    const onPressCourse = (classData) => {

        navigation.navigate('ncert-class-detail', {
            classData: classData
        })
    }

    const renderCourseItem = ({ item, index }) => (
        <TouchableOpacity
            style={{
                flex: 1,
                // flexGrow: 0,
                backgroundColor: Colors.white,
                marginRight: index % 2 === 0 ? 10 : 0,
                marginBottom: 10,
                borderRadius: 10,
            }}
            onPress={() => onPressCourse(item)}
        >
            <Image
                source={{ uri: item.logo }}
                style={{
                    width: '100%',
                    height: 100,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    marginTop: 20,
                    resizeMode: 'contain',
                }}
            />
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.class} Class</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ marginTop: 10 }}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 13,
                marginTop: 20
            }}>
                NCERT
            </Text>

            <FlatList
                data={classes}
                renderItem={renderCourseItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
        </View>
    );
}

export default NCERTDetail;