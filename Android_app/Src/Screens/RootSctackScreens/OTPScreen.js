import { View, Text, TextInput, StyleSheet, Image, Button, Alert } from 'react-native';
import React, { useContext, useRef, useState , useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginAuthContext } from '../../Context/LoginAuthContext'
import {MyContext} from '../../Context/Severcontext';
import Devicecontext from '../../Context/Devicecontext';
//device
const OTPScreen = ({ navigation , route}) => {
     //deviceid
    // const {deviceidnumber} = useContext(Devicecontext);
   //  console.log(deviceidnumber, '==============deviceidnumber==========')
    const {received_otp} = route.params;
    const {mobile} = route.params;
     //servers 
    const { baseurl} = useContext(MyContext);
    const {signIn} = useContext(LoginAuthContext);
    const [userMobile, setUserMobile] = useState("");
    const [username, setUserName] = useState("");
    const [useridnum , setUseridnum] = useState('');
    const pin1Ref = useRef(null);
    const pin2Ref = useRef(null);
    const pin3Ref = useRef(null);
    const pin4Ref = useRef(null);
    const pin5Ref = useRef(null);
    const pin6Ref = useRef(null);

    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [pin3, setPin3] = useState("");
    const [pin4, setPin4] = useState("");
    const [pin5, setPin5] = useState("");
    const [pin6, setPin6] = useState("");
    //send otp to user mobile
    const Sendotptouser = async () => {
        try{
            const sendotp = `${baseurl}Sendotp?sent_to=${mobile}&otp=${received_otp}`;
            console.log(sendotp , 'SEND OTP');
            const response = await fetch(sendotp);
            const res = await response.json();
            const obj = JSON.parse(JSON.stringify(res));
            console.log(obj , 'otp json--------');
        }catch(error){
            console.log(error)
        }
    }
    React.useEffect(() => {
        (async () => {
            await Sendotptouser();
            const mob = await AsyncStorage.getItem('userMobileNumber');
            setUserMobile(mob);

            const username = await AsyncStorage.getItem('userName');
            setUserName(username);
        })();
    }, []);
   

    const Otpvalidation = async () => {
        const deviceidnumber = 123456789;
        // const userMobile = await AsyncStorage.getItem('userMobileNumber');
        const otp = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
        if (otp.length !== 6) {
            Alert.alert('Please enter a valid OTP');
            return;
        }

        if(otp != received_otp){
            Alert.alert('Entered Wrong OTP');
            return;
        }
       
        try {
            //${baseurl}verifyotp?mobile=9000202102&deviceid=123456789&otp=813671
            const response = await fetch(`${baseurl}verifyotp?mobile=${mobile}&deviceid=${deviceidnumber}&otp=${received_otp}`);
            console.log(response, "rrr");
            
            const res = await response.json();
            const obj = JSON.parse(JSON.stringify(res));
            const usertoken = obj.messages.token;
            console.log(usertoken , 'USERTOKEN');
            const useridnumber = obj.messages.userid;
            console.log(useridnumber , 'userid data---------------');
            try {
                await AsyncStorage.setItem(
                  'USERTOKEN' ,
                  usertoken
                );
                await AsyncStorage.setItem(
                    'USERIDNUMBER' ,
                    useridnumber
                  );
                  console.log(useridnumber , 'user id in try block======')
                await signIn(usertoken);
              } catch (error) {
                console.log(error);
              }
         
            console.log(userMobile);
           
          
        } catch (error) {
            Alert.alert('sorry,something went wrong!!!')
            console.error(error);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Image
                    style={styles.Optbg}
                    source={require('../../Assets/one.jpg')}
                />
                <Text style={styles.Textheading}>Hello {username},<Text style={{fontWeight:'400' , color: '#000'}}></Text> </Text>
                <Text style={styles.Textheading}>Enter OTP [{received_otp}] Sent to <Text style={{fontWeight:'400' , color: '#000'}}>{userMobile}</Text></Text>

            </View>
            <View style={styles.container2}>
                <View style={styles.TextInputView}>
                    <TextInput
                        ref={pin1Ref}
                        keyboardAppearance={'number-pad'}
                        maxLength={1}
                        keyboardType='numeric'
                        color="#000"
                        onChangeText={(tpin1) => {
                            console.log("........tpin", tpin1, ".....pin1")
                            setPin1(tpin1);
                            if (tpin1) {
                                //console.log("........tpin", pin1, ".....pin1");
                                pin2Ref.current.focus();
                            }
                        }}
                        value={pin1}
                        style={styles.TextInputText}
                    />
                </View>
                <View style={styles.TextInputView}>
                    <TextInput
                        ref={pin2Ref}
                        keyboardAppearance={'number-pad'}
                        maxLength={1}
                        color="#000"
                        keyboardType='numeric'
                        onChangeText={(tpin2) => {
                            setPin2(tpin2);
                            if (tpin2 != "") {
                                pin3Ref.current.focus();
                            }
                        }}
                        value={pin2}
                        style={styles.TextInputText}
                    />
                </View>
                <View style={styles.TextInputView}>
                    <TextInput
                        ref={pin3Ref}
                        keyboardAppearance={'number-pad'}
                        maxLength={1}
                        color="#000"
                        keyboardType='numeric'
                        onChangeText={(tpin3) => {
                            setPin3(tpin3);
                            if (tpin3 != "") {
                                pin4Ref.current.focus();
                            }
                        }}
                        value={pin3}
                        style={styles.TextInputText}
                    />
                </View>
                <View style={styles.TextInputView}>
                    <TextInput
                        ref={pin4Ref}
                        keyboardAppearance={'number-pad'}
                        maxLength={1}
                        keyboardType='numeric'
                        onChangeText={(tpin4) => {
                            setPin4(tpin4)
                            if (tpin4 != "") {
                                pin5Ref.current.focus();
                            }
                        }}
                        value={pin4}
                        color="#000"
                        style={styles.TextInputText}
                    />
                </View>
                <View style={styles.TextInputView}>
                    <TextInput
                        ref={pin5Ref}
                        keyboardAppearance={'number-pad'}
                        maxLength={1}
                        keyboardType='numeric'
                        onChangeText={(tpin5) => {
                            setPin5(tpin5)
                            if (tpin5 != "") {
                                pin6Ref.current.focus();
                            }
                        }}
                        value={pin5}
                        style={styles.TextInputText}
                        color="#000"
                    />
                </View>
                <View style={styles.TextInputView}>
                    <TextInput
                        ref={pin6Ref}
                        keyboardAppearance={'number-pad'}
                        maxLength={1}
                        keyboardType='numeric'
                        onChangeText={(tpin6) => {
                            setPin6(tpin6)
                        }}
                        value={pin6}
                        style={styles.TextInputText}
                        color="#000"
                    />
                </View>
            </View>
            <View>
                <Button
                    onPress={
                        () => {
                            //navigation.navigate('MainDrawerStack');
                            Otpvalidation();
                            //signIn()
                         
                        }
                    }
                    title="OK"
                    color="#192a53"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        </>
    )
}

export default OTPScreen;


const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: "#fff",
        paddingTop: 20,
        flex: 1,
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    TextInputView: {
        borderBottomWidth: 1,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextInputText: {
        fontSize: 30,
    },
    Textheading: {
        fontSize: 18,
        fontWeight: "300",
        color:"#000"
    },
    Optbg: {
        width: 300,
        height: 300,

    }

});