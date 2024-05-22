import {View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert, ActivityIndicator} from 'react-native'
import React, {useContext, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { themeColors } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import Colors from "../../Shared/Colors";
import {supabase} from "../../lib/supabase";
import {AuthContext} from "../../Context/AuthContext";

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const {userData,setUserData}=useContext(AuthContext)

    async function signInWithEmail() {
        setLoading(true);
        const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) Alert.alert(error.message);
        if (session){
            console.log("User : " + JSON.stringify(user) + " Data : " + JSON.stringify(session));
            setLoading(false);
            setUserData({
                name:'name',
                picture:'https://cdn3d.iconscout.com/3d/premium/thumb/male-customer-call-service-portrait-6760890-5600697.png?f=webp',
                email:email,
                // id:1
            })
        }
        setLoading(false);
    }


    return (
        <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
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
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        placeholder="password"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                    <TouchableOpacity style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={() => signInWithEmail()}>
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
