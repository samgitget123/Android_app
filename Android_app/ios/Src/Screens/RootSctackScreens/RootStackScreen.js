import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

//screen imports
import SignInScreen from './SigninScreen';
import OTPScreen from './OTPScreen';
import OnboardingScreens from '../WelcomeScreens/OnboardingScreens';
//drawer main screeen
import MainDrawerStackScreen from '../DrawerStackScreens/MainDrawerStackScreen';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

const RootStackScreen = (props , navigation , route) => {
  const deviceidnum = props.deviceidnumber;
//console.log(deviceidnum , 'deviceid in rootstack screen==========');
  const [isfirstlaunch, setIsfirstlaunch] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsfirstlaunch(true);
      } else {
        setIsfirstlaunch(false);
      }
    })
  }, []);
  if (isfirstlaunch === null) {
    return null;
  } else if (isfirstlaunch === true) {
    return (
      <Stack.Navigator initialRouteName='WelcomeScreens' >
        <Stack.Screen name="WelcomeScreens" component={OnboardingScreens} options={{ header: () => null }} />
        <Stack.Screen name="SigninScreen" component={SignInScreen} options={{ header: () => null }}  initialParams={{ deviceidnumber: deviceidnum }}/>
        <Stack.Screen name="OTP" component={OTPScreen} options={{ header: () => null }} />
      </Stack.Navigator>
    )

  } else {
    return (
      <Stack.Navigator initialRouteName='SigninScreen' >
        <Stack.Screen name="WelcomeScreens" component={OnboardingScreens} options={{ header: () => null }} />
        <Stack.Screen name="SigninScreen" component={SignInScreen} options={{ header: () => null }} />
        <Stack.Screen name="OTP" component={OTPScreen} options={{ title: 'OTP' }} />
      </Stack.Navigator>
    )
  }

}

export default RootStackScreen

const styles = StyleSheet.create({})