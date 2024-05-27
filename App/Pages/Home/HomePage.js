import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import WelcomeHeader from './WelcomeHeader'
import Slider from './Slider'
import { ScrollView } from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import HomePageCourseList from "./HomePageCourseList";
export default function HomePage() {
    const {userData,setUserData}=useContext(AuthContext)

    return (
        <SafeAreaView>
            <View style={{padding:20}}>
                <WelcomeHeader/>
                {/*<SearchBar/>*/}
                <Slider/>
                {/*<VideoCourseList/>*/}
                {/*<CourseList type={'basic'} />*/}
                <HomePageCourseList type={'basic'} />
                {/*<CourseList type={'advance'} />*/}
                <View style={{height:100}}>

                </View>
            </View>
        </SafeAreaView>
    )
}

