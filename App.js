/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Pages/Login';
import { AuthContext } from './App/Context/AuthContext';
import { useEffect, useState } from 'react';
import Home from './App/Pages/Home';
import Services from './App/Shared/Services';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './App/Navigations/HomeNavigation';
import LoginScreen from "./App/Pages/Login/LoginScreen";
import WelcomeScreen from "./App/Pages/Login/WelcomeScreen";

export default function App() {

  const [userData,setUserData]=useState();
  useEffect(()=>{
    Services.getUserAuth().then(resp=>{
      console.log(resp); 
      if(resp)
      {
        setUserData(resp)
      }
      else{
        setUserData(null)
      }
    })
  },[]) 
  return (
    <View style={styles.container}>
      <AuthContext.Provider value={{userData,setUserData}}>
        <NavigationContainer>
      {userData? <HomeNavigation/> : <WelcomeScreen/> }
        </NavigationContainer>
      </AuthContext.Provider>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // backgroundColor: '#F6F8FC',
    // paddingTop:20
  },
});
*/


import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './App/Context/AuthContext';
import Services from './App/Shared/Services';
import AuthStack from './App/Navigations/AuthStack';
import HomeNavigation from './App/Navigations/HomeNavigation';

export default function App() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await Services.getUserAuth();
      setUserData(user);
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
    );
  }

  return (
      <AuthContext.Provider value={{ userData, setUserData }}>
        <NavigationContainer>
          {userData ? <HomeNavigation /> : <AuthStack />}
        </NavigationContainer>
      </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
