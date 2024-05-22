/*
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../../theme'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: themeColors.bg}}>
        <View className="flex-1 flex justify-around my-4">
            <Text 
                className="text-white font-bold text-4xl text-center">
                Let's Get Started!
            </Text>
            <View className="flex-row justify-center">
                <Image source={require("../../Assets/images/welcome.png")}
                    style={{width: 350, height: 350}} />
            </View>
            <View className="space-y-4">
                <TouchableOpacity
                    onPress={()=> navigation.navigate('SignUp')}
                    className="py-3 bg-yellow-400 mx-7 rounded-xl">
                        <Text 
                            className="text-xl font-bold text-center text-gray-700"
                        >
                            Sign Up
                        </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center">
                    <Text className="text-white font-semibold">Already have an account?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <Text className="font-semibold text-yellow-400"> Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}*/



import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useContext} from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import {AuthContext} from "../../Context/AuthContext";

const WelcomeScreen = () =>  {
    const navigation = useNavigation();
    const {userData,setUserData}=useContext(AuthContext)

    return (
        <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
            <View style={styles.innerContainer}>
                <Text style={styles.headerText}>
                    Let's Get Started!
                </Text>
                <View style={styles.imageContainer}>
                    <Image source={require("../../Assets/images/welcome.png")}
                           style={styles.image} />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        style={styles.signUpButton}>
                        <Text style={styles.signUpButtonText}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginButtonText}> Log In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setUserData({
                            name:'Rahul Sanap',
                            picture:'https://cdn3d.iconscout.com/3d/premium/thumb/male-customer-call-service-portrait-6760890-5600697.png?f=webp',
                            email:'rahul@gmail.com',
                            id:1
                        })}>
                            <Text>     Skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // borderWidth: 20,
        // borderColor: '#000',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'space-around',
        marginVertical: 16,
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 32,
        textAlign: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    image: {
        width: 350,
        height: 350,
    },
    buttonContainer: {
        spaceBetween: 16,
    },
    signUpButton: {
        paddingVertical: 12,
        backgroundColor: '#facc15', // Tailwind yellow-400
        marginHorizontal: 28,
        marginBottom: 12,
        borderRadius: 16,
    },
    signUpButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#374151', // Tailwind gray-700
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginText: {
        color: 'white',
        fontWeight: '600',
    },
    loginButtonText: {
        fontWeight: '600',
        color: '#facc15', // Tailwind yellow-400
    },
});

export default WelcomeScreen;