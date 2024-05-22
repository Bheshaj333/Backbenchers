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
