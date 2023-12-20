import 'react-native-gesture-handler';
import 'react-native-gesture-handler';  //it will optimize the render
import { StyleSheet, Text, View  } from 'react-native'
import React, { useMemo, useReducer, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';

import RootStackScreen from './Src/Screens/RootSctackScreens/RootStackScreen';
import DrawerStackScreen from './Src/Screens/DrawerStackScreens/DrawerStackScreen';
import MainDrawerStackScreen from './Src/Screens/DrawerStackScreens/MainDrawerStackScreen';

import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from './Src/Context/AuthContextFile';

//refresh control

const MainContainer = ({ naviagtion }) => {

 
  //const[isLoading , setIsLoading] = useState(true);
  //const[userToken , setUserToken] = useState(null);
 

  initialLoginState = {
    isLoading: true,
    mobile: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          mobile: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          mobile: null,
          userToken: null,
          isLoading: false,
        };

    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)


  const authContext = useMemo(() => ({
    signIn: async (userInfo) => {

      let userToken = null;
      let mobile = null;
     
      console.log(userInfo, '---userInfo');

      if (userInfo.token) { userToken = userInfo.token; }
      if (userInfo.mobile) { mobile = userInfo.mobile; }
      AsyncStorage.setItem('userToken', userToken);
      console.log(userToken, mobile, '---mobile - userToken');
      dispatch({ type: 'LOGIN', id: mobile, token: userToken });

      setTimeout(function () { console.log(loginState); }, 2000);
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },


  }), []);


  /*if(loginState.isLoading) {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor:"grey", color: "#fff" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }*/
  const [initialLoading, setInitialLoading] = useState(true)
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {
          !loginState.userToken ? (
            <RootStackScreen />
          )
            :
            (
              <MainDrawerStackScreen />
            )
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}



export default MainContainer;

const styles = StyleSheet.create({})