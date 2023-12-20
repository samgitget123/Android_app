import 'react-native-gesture-handler';
//import 'react-native-gesture-handler';  //it will optimize the render
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import React, { useMemo, useReducer, useState, useEffect, createContext , useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from './Src/Screens/RootSctackScreens/RootStackScreen';
import DrawerStackScreen from './Src/Screens/DrawerStackScreens/DrawerStackScreen';
import MainDrawerStackScreen from './Src/Screens/DrawerStackScreens/MainDrawerStackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginAuthContext } from './Src/Context/LoginAuthContext';  //context for login
import DeviceInfo , {getUniqueId} from 'react-native-device-info';
import { CallsContext } from './Src/Context/CallsContext';  //imported from context
import { Callsprovider } from './Src/Context/CallsContext';

//servers
import { Servercontext } from './Src/Context/Severcontext';
//store  user mobile number//
//usecontext for login
const UserLoginVerify = createContext();  //here we can check the login authentication
export const GetUserName = createContext(); //here we can pass the user username
export const Getnumofusersingroup = createContext(); //here we can pass number of users sin one group

//Bottom tabs
import Iconic from 'react-native-vector-icons';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Groupmembers from './Src/Screens/DrawerStackScreens/BottomTabs/Groupmembers';
import Handrise from './Src/Screens/DrawerStackScreens/BottomTabs/Handrise';
import MuteScreen from './Src/Screens/DrawerStackScreens/BottomTabs/MuteScreen';


//Bottom navigattion
const MainBottomTabs = () => {
  const Tab = createBottomTabNavigator()
  return (
  <>
      <Tab.Navigator>
        <Tab.Screen  name="Groupmembers"  component={Groupmembers}/>
        <Tab.Screen name="handrise" component={Handrise} />
        <Tab.Screen name="mutescreen" component={MuteScreen} />
      </Tab.Navigator>
      </>
  )
}

/////////
const App = ({ naviagtion }) => {
  //DEVICE ID
  const[deviceid , setDeviceid]=useState(null);
  // console.log(deviceId._j , 'DEVICE ID---**********************');
  useEffect(()=>{
    // console.log(deviceId._j , 'DEVICE ID---**********************');
    async function getDeviceId(){
    //DEVICE ID
    const deviceId = await DeviceInfo.getUniqueId();
   // console.log(deviceId , 'DEVICEID===========');
    setDeviceid(deviceId);
   // console.log(deviceid , 'device id---------------------------------');
  }
  getDeviceId();
  },[]);
 
  const [userid , setUserid] = useState('');
  //Reducer
  const initialLoginState = {
    isLoading: true,
    mobile: null,
    usertoken: null,
  };

  loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          usertoken : action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          usertoken : action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          mobile: null,
          usertoken: null,
          isLoading: false,
        };
    }
  };

  const [loginState , dispatch] = useReducer(loginReducer , initialLoginState)
  //usememo
  const authContext = useMemo(() => ({
    signIn: (usertoken) => {
      if(usertoken){
       // console.log(usertoken , 'USERTOKEN========')
        dispatch({type:'LOGIN' , token: usertoken})
        // setUserid(userIdnumber)
        // console.log(userid , 'userid userid userid userid')
      }
    },
    signOut: () => {
      // setUserToken(null);
      // setIsLoading(false);
      dispatch({type:'LOGOUT'})
    },

  }), []);
  //useeffect
  useEffect(() => {
    (async () => {
      try {
        //DEVICE ID
        const deviceId = DeviceInfo.getUniqueId();
        // setDeviceid(deviceId._j);
        //console.log(deviceid , 'device id---------------------------------');
        const getuserToken = await  AsyncStorage.getItem(
           'USERTOKEN'
         );
        // console.log(loginState.usertoken , 'loginState.usertoken=============>')
         setTimeout(() => {
           dispatch({type:'RETRIEVE_TOKEN' , token: getuserToken})
         });

         //get user access token 
         const accesssurl = `https://convoxmeet.deepijatel.in/convoxmeet/api/checkingaccesstoken?uid=3`;
        // console.log(accesssurl , 'accesss url');
         const response = await fetch(accesssurl);
        /// console.log(response , 'RESPONSE');
         const res = await response.json();
        // console.log(res , 'RES');
         const data = res.messages;
//console.log(data.data[0].access_token , 'DATA');
         const useraccesstoken = data.data[0].access_token;
        //  const obj = JSON.parse(JSON.stringify(res));
        //  console.log(obj , 'object json of user access');
       
       } catch (error) {
         console.log(error)
       }
    })()
  }, []);
  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <>
     <LoginAuthContext.Provider value={authContext}>
      <Callsprovider>
        <Servercontext>
        <NavigationContainer>
          {loginState.usertoken == null ? (<RootStackScreen deviceidnumber={deviceid}/>) : (<MainDrawerStackScreen />)}
        </NavigationContainer>
        </Servercontext>
        </Callsprovider>
      </LoginAuthContext.Provider>
    </>
  );
}



export default App;

const styles = StyleSheet.create({})