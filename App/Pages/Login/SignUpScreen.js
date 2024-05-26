/*
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import React, {useContext, useState} from 'react';
import { themeColors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from "../../Shared/Colors";
import { supabase } from "../../lib/supabase";
import {AuthContext} from "../../Context/AuthContext";

export default function SignUpScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const {userData,setUserData}=useContext(AuthContext)

    async function signUpWithEmail() {
        setLoading(true);

        // Supabase auth dont delete it now //

        // const { data: { session }, error } = await supabase.auth.signUp({
        //     email: email,
        //     password: password,
        // });

        // Hash the password before sending it to Supabase
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        const { error } = await supabase
            .from('users')
            .insert({
                name: name,
                // picture:'https://cdn3d.iconscout.com/3d/premium/thumb/male-customer-call-service-portrait-6760890-5600697.png?f=webp',
                phone_number: number,
            })

        if (error){
            console.log("Erorr : " + JSON.stringify(error));
            Alert.alert(error.message);
            setLoading(false);
        }
        else {
            console.log(" Hererereresad ")

            // Alert.alert('Please check your inbox for email verification!');
            setLoading(false);
            setUserData({
                name:name,
                picture:'https://cdn3d.iconscout.com/3d/premium/thumb/male-customer-call-service-portrait-6760890-5600697.png?f=webp',
                number:number,
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
            </SafeAreaView>
            <View style={[styles.formContainer, { borderTopLeftRadius: 50, borderTopRightRadius: 50 }]}>
                <View style={styles.form}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Name'
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Email'
                        onChangeText={(text) => setNumber(text)}
                        value={number}
                        autoCapitalize={'none'}
                    />
                    <TouchableOpacity onPress={() => signUpWithEmail()} style={styles.signUpButton}>
                        <Text style={styles.signUpButtonText} disabled={loading}>
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
                        <Text style={{ color: Colors.white }}>Sign In with Google</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink} disabled={loading}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
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
        borderRadius: 16,
        marginHorizontal: 8,
        backgroundColor: Colors.primary,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
});
*/






import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { themeColors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from "../../Shared/Colors";
import { supabase } from "../../lib/supabase";
import { AuthContext } from "../../Context/AuthContext";
import {CountryPicker} from 'react-native-country-codes-picker';

export default function SignUpScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+1'); // default country code
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { userData, setUserData } = useContext(AuthContext);

    async function signUpWithEmail() {
        setLoading(true);

        const { error } = await supabase
            .from('users')
            .insert({
                name: name,
                phone_number: `${countryCode}${number}`, // combine country code and number
            });

        if (error) {
            Alert.alert(error.message);
            setLoading(false);
        } else {
            setUserData({
                name: name,
                phone_number: `${countryCode}${number}`,
            });
            setLoading(false);
        }
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
            </SafeAreaView>
            <View style={[styles.formContainer, { borderTopLeftRadius: 50, borderTopRightRadius: 50 }]}>
                <View style={styles.form}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Name'
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                    <Text style={styles.label}>Phone Number</Text>
                    <View style={styles.phoneNumberContainer}>
                        <TouchableOpacity onPress={() => setPickerVisible(true)} style={styles.countryCodePicker}>
                            <Text>{countryCode}</Text>
                            <Ionicons name="caret-down" size={16} color="black" />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.phoneNumberInput}
                            placeholder='Enter Phone Number'
                            onChangeText={(text) => setNumber(text)}
                            value={number}
                            keyboardType='phone-pad'
                        />
                    </View>
                    <CountryPicker
                        show={isPickerVisible}
                        pickerButtonOnPress={(item) => {
                            setCountryCode(item.dial_code);
                            setPickerVisible(false);
                        }}
                        lang={'en'}
                    />
                    <TouchableOpacity onPress={signUpWithEmail} style={styles.signUpButton}>
                        <Text style={styles.signUpButtonText} disabled={loading}>
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
                        <Text style={{ color: Colors.white }}>Sign In with Google</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink} disabled={loading}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.bg,
    },
    safeArea: {},
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
    phoneNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    countryCodePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f3f4f6', // Tailwind gray-100
        color: '#4B5563', // Tailwind gray-700
        borderRadius: 16,
        marginRight: 8,
    },
    phoneNumberInput: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f3f4f6', // Tailwind gray-100
        color: '#4B5563', // Tailwind gray-700
        borderRadius: 16,
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
        borderRadius: 16,
        marginHorizontal: 8,
        backgroundColor: Colors.primary,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
});

