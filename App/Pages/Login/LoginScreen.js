/*
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import { themeColors } from '../../theme'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView  className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={()=> navigation.goBack()} 
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View  className="flex-row justify-center">
          <Image source={require('../../Assets/images/login.png')}
          style={{width: 200, height: 200}} />
        </View>
        
        
      </SafeAreaView>
      <View 
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
        className="flex-1 bg-white px-8 pt-8">
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="email"
              value="john@gmail.com" 
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              placeholder="password"
              value="test12345" 
            />
            <TouchableOpacity className="flex items-end">
              <Text className="text-gray-700 mb-5">Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="py-3 bg-yellow-400 rounded-xl">
                <Text 
                    className="text-xl font-bold text-center text-gray-700"
                >
                        Login
                </Text>
             </TouchableOpacity>
            
          </View>
          <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
          <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../../Assets/icons/google.png')} className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../../Assets/icons/apple.png')} className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../../Assets/icons/facebook.png')} className="w-10 h-10" />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-7">
              <Text className="text-gray-500 font-semibold">
                  Don't have an account?
              </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                  <Text className="font-semibold text-yellow-500"> Sign Up</Text>
              </TouchableOpacity>
          </View>
          
      </View>
    </View>
    
  )
}*/



import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { themeColors } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import Colors from "../../Shared/Colors";

export default function LoginScreen() {
    const navigation = useNavigation();
    return (
        <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('../../Assets/images/login.png')}
                           style={styles.image} />
                </View>
            </SafeAreaView>
            <View style={[styles.formContainer, { borderTopLeftRadius: 50, borderTopRightRadius: 50 }]}>
                <View style={styles.form}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="email"
                        value="john@gmail.com"
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="password"
                        value="test12345"
                    />
                    <TouchableOpacity style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.orText}>Or</Text>
                <View style={styles.socialButtonsContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../../Assets/icons/google.png')} style={styles.socialIcon} />
                        <Text style={{color:Colors.white}}>Sign In with Google</Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity style={styles.socialButton}>*/}
                    {/*    <Image source={require('../../Assets/icons/apple.png')} style={styles.socialIcon} />*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity style={styles.socialButton}>*/}
                    {/*    <Image source={require('../../Assets/icons/facebook.png')} style={styles.socialIcon} />*/}
                    {/*</TouchableOpacity>*/}
                </View>
                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signUpLink}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.bg,
    },
    safeArea: {
        // flex: 1,
    },
    backButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    backButton: {
        backgroundColor: '#facc15', // Tailwind yellow-400
        padding: 8,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        marginLeft: 16,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
    formContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 32,
        paddingTop: 32,
        borderWidth: 2,
        borderColor: '#000',
    },
    form: {
        spaceBetween: 16,
    },
    label: {
        color: '#4B5563', // Tailwind gray-700
        marginLeft: 16,
    },
    input: {
        padding: 16,
        backgroundColor: '#f3f4f6', // Tailwind gray-100
        color: '#4B5563', // Tailwind gray-700
        borderRadius: 16,
        marginBottom: 12,
    },
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    forgotPasswordText: {
        color: '#4B5563', // Tailwind gray-700
        marginBottom: 20,
    },
    loginButton: {
        paddingVertical: 12,
        backgroundColor: '#facc15', // Tailwind yellow-400
        borderRadius: 16,
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4B5563', // Tailwind gray-700
    },
    orText: {
        fontSize: 20,
        color: '#4B5563', // Tailwind gray-700
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        spaceBetween: 48,
    },
    socialButton: {
        // padding: 8,
        // backgroundColor: '#f3f4f6', // Tailwind gray-100
        borderRadius: 16,

        backgroundColor:Colors.primary,
        padding:10,
        // margin:30,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        // borderRadius:10
    },
    socialIcon: {
        width: 40,
        height: 40,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 28,
    },
    signUpText: {
        color: '#6B7280', // Tailwind gray-500
        fontWeight: '600',
    },
    signUpLink: {
        fontWeight: '600',
        color: '#facc15', // Tailwind yellow-400
    },
});
