import {View, Text} from 'react-native'
import React, {useEffect, useState} from 'react'
import {FlatList} from 'react-native';
import {Image} from 'react-native';
import Colors from '../../Shared/Colors';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createClient, supabase} from '@supabase/supabase-js'
import {useDispatch} from "react-redux";
import {setExamData} from "../../Redux/Actions/Actions";

export default function HomePageCourseList({type}) {
    const supabase = createClient('https://cwmjnqlyudqeophvuwoz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bWpucWx5dWRxZW9waHZ1d296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5ODQ3ODMsImV4cCI6MjAxNTU2MDc4M30.sh0WAxm0qQ21qwytZHj1rYonwrne6BU_wQgV_LYpic0')
    const [examList, setExamList] = useState([])
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        getCourseList();
    }, [])

    const getCourseList = async () => {
        try {
            let { data:parentExams, error } = await supabase
                .from('exam')
                .select('*')
            console.log("ExamList : " + JSON.stringify(parentExams));
            setExamList(parentExams);
        } catch (error) {
            console.error('Error fetching data from Supabase:', error);
        }
    }

    const onPressCourse = (course) => {

        if(course.exam_name === "NCERT"){
            navigation.navigate('ncert-detail', {
                courseData: course,
                courseType: 'text'
            })
        }else if(course.child_exams === false){
            dispatch(setExamData(course))
            navigation.navigate('exam-details-page', {
                // exam: course
            })
        }
    }

    const renderCourseItem = ({ item, index }) => (
        <TouchableOpacity
            style={{
                flex: 1,
                backgroundColor: Colors.white,
                marginRight: index % 2 === 0 ? 10 : 0,
                marginBottom: 10,
                borderRadius: 10,
                maxWidth: '49%',
            }}
            onPress={() => onPressCourse(item)}
        >
            <Image
                source={{ uri: item.exam_logo }}
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
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.exam_name}</Text>
                {/*<Text style={{ color: Colors.gray, fontWeight: '300' }}>{item.Topic?.length} Lessons</Text>*/}
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={examList}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
        />
    );
}