import React, { useCallback,useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Button , Linking } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Ant from 'react-native-vector-icons/AntDesign';
import { MyContext } from "../../Context/Severcontext";
//authcontext
import { LoginAuthContext } from "../../Context/LoginAuthContext";
const Settings = ({ navigation }) => {
  const {signOut} = useContext(LoginAuthContext);
  const {baseurl} = useContext(MyContext);
    //opensettings
    const _openAppSetting = useCallback(async () => {
      // Open the custom settings if the app has one
      await Linking.openSettings();
    }, []);

    const Handlesignout = async() => {
      signOut();
  }
  return (
    <>
      <View style={styles.maincontainer}>
        <View style={styles.topcontainer}>
          <View style={{ padding: 30 }}>
            <TouchableOpacity onPress={() => {
              navigation.goBack();
            }}>
              <Image
                source={require('../../Assets/arrow.png')}
                style={styles.arraowimage}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomcontainer}>
          <View style={{flexDirection:"row" , justifyContent:"space-between" , borderBottomColor:"#000" , borderBottomWidth:0.5 , paddingBottom:10 }}>
            <View><Text>Allow settings</Text></View>
            <View><Ionic name="settings" style={{fontSize:40 , color:"#000"}} onPress={()=>{
              _openAppSetting();
            }}/></View>
          </View>
          
          <View style={{flexDirection:"row" , justifyContent:"space-between" , marginTop:20}}>
            <View><Text>Logout</Text></View>
            <View><Ant name="logout" style={{fontSize:40 , color:"#000"}}
             onPress={
              () => {
                Handlesignout();
              }
            }
            /></View>
          </View>
        </View>
      </View>
    </>
  )
}

export default Settings

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#192a53',
    width: "100%",
  },
  topcontainer: {
    flex: 1,
    backgroundColor: "#192a53",
  },
  bottomcontainer: {
    flex: 6,
    backgroundColor: "#fff",
    padding: 20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  arraowimage: {
    width: 30,
    height: 30
  },
  settingsbtn: {
    backgroundColor: 'steelblue',
    borderRadius: 22,
    padding: 10,
  },

})