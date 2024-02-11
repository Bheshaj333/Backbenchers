import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import CourseDetails from '../Pages/Extra/CourseDetails';
import CourseChapter from '../Pages/Extra/CourseChapter';
import PlayVideo from '../Pages/Extra/PlayVideo';
import NCERTDetail from "../Pages/Extra/NCERTDetail";
import NCERTClassDetailPage from "../Pages/Extra/NCERTClassDetailPage";
import NCERTBookDetailPage from "../Pages/Extra/NCERTBookDetailPage";
import NCERTChapterDetailPage from "../Pages/Extra/NCERTChapterDetailPage";
import ExamDetailsPage from "../Pages/ExamDetailsPage";
import MockTestPage from "../Pages/MockTestPage";
import MockTestInfo from "../Pages/MockTestInfo";

const Stack = createNativeStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="home" component={Home} ></Stack.Screen>
        <Stack.Screen name="ncert-detail" component={NCERTDetail} ></Stack.Screen>
        <Stack.Screen name="ncert-class-detail" component={NCERTClassDetailPage} ></Stack.Screen>
        <Stack.Screen name="ncert-book-detail" component={NCERTBookDetailPage} ></Stack.Screen>
        <Stack.Screen name="ncert-chapter-detail" component={NCERTChapterDetailPage} ></Stack.Screen>
        <Stack.Screen name="course-detail" component={CourseDetails} ></Stack.Screen>
        <Stack.Screen name="exam-details-page" component={ExamDetailsPage} ></Stack.Screen>
        <Stack.Screen name="mock-test-info" component={MockTestInfo} ></Stack.Screen>
        <Stack.Screen name="mock-test-page" component={MockTestPage} ></Stack.Screen>
        <Stack.Screen name="course-chapter"
        component={CourseChapter}/>
         <Stack.Screen name="play-video"
        component={PlayVideo}/>
    </Stack.Navigator>
  )
}