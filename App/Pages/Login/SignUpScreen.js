/*
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { themeColors } from '../../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

// subscribe for more videos like this :)
export default function SignUpScreen() {
    const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
            <TouchableOpacity 
                onPress={()=> navigation.goBack()}
                className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
                <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
            <Image source={require('../../Assets/images/signup.png')}
                style={{width: 165, height: 110}} />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
      >
        <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Full Name</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value="john snow"
                placeholder='Enter Name'
            />
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value="john@gmail.com"
                placeholder='Enter Email'
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry
                value="test12345"
                placeholder='Enter Password'
            />
            <TouchableOpacity
                className="py-3 bg-yellow-400 rounded-xl"
            >
                <Text className="font-xl font-bold text-center text-gray-700">
                    Sign Up
                </Text>
            </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
        </Text>
        <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../../Assets/icons/google.png')}
                    className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../../Assets/icons/apple.png')}
                    className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../../Assets/icons/facebook.png')}
                    className="w-10 h-10" />
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">Already have an account?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                <Text className="font-semibold text-yellow-500"> Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
*/



import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { themeColors } from '../../theme'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
    const navigation = useNavigation();
    return (
        <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
            <View style={styles.safeArea}>
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('../../Assets/images/signup.png')}
                           style={styles.image} />
                </View>
            </View>
            <View style={[styles.formContainer, { borderTopLeftRadius: 50, borderTopRightRadius: 50 }]}>
                <View style={styles.form}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        value="john snow"
                        placeholder='Enter Name'
                    />
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        value="john@gmail.com"
                        placeholder='Enter Email'
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        value="test12345"
                        placeholder='Enter Password'
                    />
                    <TouchableOpacity style={styles.signUpButton}>
                        <Text style={styles.signUpButtonText}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.orText}>
                    Or
                </Text>
                <View style={styles.socialButtonsContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../../Assets/icons/google.png')}
                               style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../../Assets/icons/apple.png')}
                               style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../../Assets/icons/facebook.png')}
                               style={styles.socialIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
        width: 165,
        height: 110,
    },
    formContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 32,
        paddingTop: 32,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    form: {
        marginVertical: 16,
    },
    label: {
        color: '#4B5563', // Tailwind gray-700
        marginLeft: 16,
        marginBottom: 4,
    },
    input: {
        padding: 16,
        backgroundColor: '#f3f4f6', // Tailwind gray-100
        color: '#4B5563', // Tailwind gray-700
        borderRadius: 16,
        marginBottom: 16,
    },
    signUpButton: {
        paddingVertical: 12,
        backgroundColor: '#facc15', // Tailwind yellow-400
        borderRadius: 16,
    },
    signUpButtonText: {
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
        marginVertical: 16,
    },
    socialButton: {
        padding: 8,
        backgroundColor: '#f3f4f6', // Tailwind gray-100
        borderRadius: 16,
        marginHorizontal: 8,
    },
    socialIcon: {
        width: 40,
        height: 40,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 28,
    },
    loginText: {
        color: '#6B7280', // Tailwind gray-500
        fontWeight: '600',
    },
    loginLink: {
        fontWeight: '600',
        color: '#facc15', // Tailwind yellow-400
    },
});
