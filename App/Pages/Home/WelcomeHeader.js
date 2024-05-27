import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'

export default function WelcomeHeader() {
    const {userData,setUserData}=useContext(AuthContext)
  return (
    <View style={styles.container}>
        <View>
            <Text>Hello,</Text>
            <Text style={{fontSize:20,fontWeight:'bold'}}>{userData?.name}</Text>
        </View>
        <TouchableOpacity onPress={() => setUserData(null)}>
            <Image source={{uri:'https://cdn3d.iconscout.com/3d/premium/thumb/male-customer-call-service-portrait-6760890-5600697.png?f=webp'}} style={{width:40,height:40,borderRadius:100}}/>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
        container:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
        }
})