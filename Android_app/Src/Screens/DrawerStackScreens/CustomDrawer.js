import {
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    Text,
    Alert,
  
  } from "react-native";
  import React, { useContext, useEffect, useState } from "react";
  import {
    DrawerContentScrollView,
    DrawerItemList,
  } from "@react-navigation/drawer";

  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  //icons
import Fonticons from 'react-native-vector-icons/FontAwesome';
import Anticons from 'react-native-vector-icons/AntDesign'

//authcontext
import { LoginAuthContext } from "../../Context/LoginAuthContext";
import { MyContext } from "../../Context/Severcontext";
  const CustomDrawer = (props) => {
    const {signOut} = useContext(LoginAuthContext);
    const [userName , setUserName] = useState("");
    const [mobile , setMobile] = useState("");
    const [usertoken , setUserToken] = useState("");
    const {baseurl} = useContext(MyContext);
    useEffect(() => {
      (async () => {
        let username = await AsyncStorage.getItem('userName');
        setUserName(username)

        let mobilenumber = await AsyncStorage.getItem('userMobileNumber');
        setMobile(mobilenumber)

        let UserToken = await AsyncStorage.getItem('usertoken');
        setUserToken(UserToken);
  
       // console.log(userName , 'userrrrr$$$$$$$$name name####ndnn###$$$###$$$$$');
      })();
      
  }, []);
  

    //navigate to sign in
    const getbacktosignin = () => {
      props.navigation.navigate('SigninScreen');
    };

    // const { signOut} = useContext(AuthContext);

    const Handlesignout = async() => {
        signOut();
    }
  
    return (
      <>
        <View style={{ flex: 1 }}>
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ backgroundColor: "#fff" }}
          >
            <View style={{ flexDirection: 'row' }}>
              <ImageBackground style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              <Image
                source={require("../../Assets/avatar.png")}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
              </ImageBackground>
              <View style={{ paddingBottom: 20 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 3 , color: '#000' }}>{userName}</Text>
                <Text style={{ fontSize: 12, color: "#000", fontWeight: "300", marginBottom: 5 }}> <Fonticons name="users" size={16} color="black" />Guest</Text>
                <Text style={{color:"#000"}}> <Anticons name="phone" size={16} color="black" />{mobile}</Text>
              </View>
            </View>

            <DrawerItemList  {...props} />
          </DrawerContentScrollView>
          <View
            style={{
              padding: 10,
              borderTopWidth: 1,
              borderTopColor: "#ccc",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
            <TouchableOpacity style={{ paddingVertical: 10 }}
              onPress={
                () => {
                  Handlesignout();
                }
              }
            >
              <Text style={{ fontSize: 14 , color: "grey" }}>
                Signout <Anticons name="logout" size={20} color="black" />
              </Text>
            </TouchableOpacity>
            
          </View>
        </View>
        
      </>
    );
  };
  
  export default CustomDrawer;
  