import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Dimensions,
    Alert,
    Modal,
    Pressable
} from "react-native";

//import axios from "axios";

import React, { useContext, useState, useEffect } from "react";
//import axios from "axios";
import * as Animatable from "react-native-animatable";
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontisoIcon from 'react-native-vector-icons/Fontisto';

import AsyncStorage from "@react-native-async-storage/async-storage";
import Termsandcond from "./Termsandcond";
//servers
import { MyContext } from "../../Context/Severcontext";
//deviceid
import Devicecontext from "../../Context/Devicecontext";
/////Dimensions//////
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SignInScreen = ({ navigation, route }) => {
    //deviceid
    //  const {deviceidnumber} = useContext(Devicecontext);
    //  console.log(deviceidnumber, '==============deviceidnumber==========')
    //servers 
    //static device id 
    const deviceidnumber = 123456789;
    const { baseurl } = useContext(MyContext);
    console.log(baseurl, 'BASE URL');//9848851443  
    // console.log(getdevid , 'DEVICE ID IN SIGNIN SCREEN....');
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [generateotp, setGenerateotp] = useState(false);
    const [getotp, setgetotp] = useState('');

    const [data, setData] = useState({
        name: "",
        number: "",
        check_textInputChange: false,
        secureTextEntry: true,
        checkboxupdate: false,
    });
    //validation
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");

    //input resets
    const Inputreset = () => {
        setName("");
        setMobile("");
    }

    //Terms and conditions
    const [termsandcond, setTermsandcond] = useState('');
    //checkbox
    useEffect(() => {
        (async () => {

        })();
    }, []);
    //get ip server based on
    //checkbox
    const [checkboxpress, setCheckboxpress] = useState(false);
    const checkboxaction = () => {
        setCheckboxpress(!checkboxpress);
    }
    //generate otp
    const generateotptoggle = () => {
        setGenerateotp(!generateotp);
    }


    //Signin validation
    const Signinvalidation = async () => {

        try {
            const deviceidnumber = 123456789;
            const response = await fetch(`${baseurl}generateotp?mobile=${mobile}&deviceid=123456789`);
            console.log(response, 'SIGNI IN URL');
            const res = await response.json();
            const obj = JSON.parse(JSON.stringify(res));
            console.log(mobile);
            // console.log(res , 'hfhdffdhgfgdfg');
            const message = obj.messages;
            console.log(message, 'MESSAGE');
            const received_otp = obj.messages.otp;
            setgetotp(received_otp);
            console.log(received_otp);
            //AsyncStorage.setItem(received_otp , 'userotp');
            AsyncStorage.setItem('userMobileNumber', mobile);
            AsyncStorage.setItem('userName', name);
            console.log(mobile);
            if (mobile == "") {
                Alert.alert('please Enter Mobile Number.')
            } else if (mobile.length < 10) {
                Alert.alert('Please Enter Valid Mobile Number!!!');
            } else {
                if (received_otp) {
                    navigation.navigate('OTP', {
                        received_otp: received_otp,
                        mobile: mobile,
                    })
                } else {
                    Alert.alert('OTP does not match!!');
                }
            }
        } catch (error) {
            Alert.alert('sorry,something went wrong!!!')
            console.error(error);
        }
    };

    //send otp to user mobile
    const Sendotptouser = async () => {
        try {
            const sendotp = `${baseurl}Sendotp?sent_to=${mobile}&otp=${received_otp}`;
            console.log(sendotp, 'SEND OTP');
            const response = await fetch(sendotp);
            const res = await response.json();
            const obj = JSON.parse(JSON.stringify(res));
            console.log(obj, 'otp json--------');
        } catch (error) {
            console.log(error)
        }
    }

    //modal terms and conditions
    const [modalVisible, setModalVisible] = useState(false);
    const [condshow, setCondshow] = useState(false);


    return (
        <>
            <View
                style={
                    styles.container
                }
            >
                <Animatable.View style={styles.topbox} justifyContent="center"
                    alignItems="center"
                    animation="zoomInUp">

                    <View >
                        <Text style={styles.welcometext}>Welcome!</Text>
                    </View>
                </Animatable.View>

                <Animatable.View style={styles.bottombox} animation="fadeInUpBig">
                    <View style={styles.formbox}>

                        <Text style={styles.inputlabel}>Your Name:</Text>
                        <View style={styles.inputField}>
                            <Text><Icon name="person" color="#000" size={30} /></Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Your Name"
                                autoCapitalize="none"
                                value={name}
                                onChangeText={(name) => setName(name)}
                                name="name"
                                color="#000"
                                maxLength={20}
                            />

                            {name.length > 2 ? (
                                <Animatable.View animation="bounceIn"><Text> <Icon name="person" color="#000" size={30} /></Text></Animatable.View>
                            ) : null}

                        </View>
                        <Text style={styles.inputlabel}>Mobile Number:</Text>
                        <View style={styles.inputField}>
                            <Text><Icon name="phone" color="#000" size={30} /></Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Your Mobile Number"
                                autoCapitalize="none"
                                value={mobile}
                                onChangeText={(mobile) => setMobile(mobile)}
                                name="number"
                                color="#000"
                                keyboardType='numeric'
                                maxLength={10}
                            />


                        </View>

                        <View style={{ marginVertical: 20, width: windowWidth }}>
                            <Text style={{ color: '#000' }}>
                                <TouchableOpacity >
                                    {checkboxpress?(<FontisoIcon name="checkbox-active" size={22} color="black"
                                            onPress={() =>{ setModalVisible(true);    checkboxaction(); }}
                                        />):(<FontisoIcon name="checkbox-passive" size={22} color="black"
                                        onPress={() => {setModalVisible(true); checkboxaction(); generateotptoggle();}}
                                        style={{ marginTop: 50 }} // Adjust the margin here
                                        
                                    />)}
                                </TouchableOpacity>
                                    I Agree With <Text style={{ color: '#192a53', fontWeight: "bold", fontStyle: "italic", textTransform: "capitalize" , marginLeft:"10" }}>terms and Conditions</Text>
                            </Text>
                        </View>


                        <TouchableOpacity style={{ marginVertical: 40 }}>
                            {
                                generateotp ?
                                    <Button
                                        style={styles.generateotpbtn}
                                        onPress={async () => {
                                            await Signinvalidation();
                                            Inputreset();
                                            //  Sendotptouser();  //it will send otp to user mobile
                                        }}
                                        title="Generate OTP "
                                        color= {mobile && checkboxpress ? "#192a53" : "grey"}
                                    />
                                    : <Button
                                        style={styles.generateotpbtn}
                                        onPress={() => {
                                            alert("Must accept Terms and Conditions.");
                                          //  generateotptoggle();
                                        }}
                                        title="Generate OTP "
                                        color="grey"
                                    />
                            }

                        </TouchableOpacity>
                    </View>

                </Animatable.View>
            </View>

            {/* Modal for terms and condtion */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>ConvoxMeet.</Text>
                        <Text style={styles.modalheading}>Terms And Conditions:</Text>
                        <View style={{ color: "#fff" }}>
                            <Text style={styles.tandc}>{termsandcond}</Text>
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)

                            }
                        >
                            <Text style={styles.textStyle}>Accepted</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {/* Modal for terms and condtion end */}

        </>
    );
};

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#192a53',
        width: "100%",
    },

    topbox:
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    bottombox: {
        flex: 2,
        backgroundColor: "#f8f8ff",
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,

    },
    welcometext: {
        fontSize: 30,
        fontWeight: "400",
        color: "#fff"
    },

    formbox: {
        marginHorizontal: 40,
        marginVertical: 80
    },
    inputField: {
        flexDirection: "row",
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: "grey"
    },
    input: {
        flex: 1,
        margin: "auto",
        paddingVertical: 2,
        color: "#000"

    },
    inputlabel: {
        fontSize: 16,
        fontWeight: "400",
        color: "#000"
    },

    buttons: {
        marginVertical: 20
    },
    welcome: {
        color: '#fff',
        marginBottom: 40,
        marginHorizontal: 40,
        fontSize: 22,

    },
    generateotpbtn: {
        borderRadius: 22,
        paddingVertical: 12,
    },


    //generate otp button
    generatebuttonotp: {
        borderRadius: 12,
        paddingVertical: 15,
        elevation: 2,
        marginVertical: 10
    },
    generateotpbuttongrey: {
        backgroundColor: "grey",
    },

    buttonClose: {
        backgroundColor: "#fff",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",


    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 22,
        fontWeight: "500"
    },
    //modal
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#192a53",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#192a53",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
    },
    modalText: {
        marginBottom: 5,
        textAlign: "center",
        fontSize: 18,
        color: "#192a53",

    },
    modalheading: {
        fontSize: 18,
        fontWeight: "500",
        marginVertical: 10,
        color: "#fff"
    },
    tandc: {
        color: "#fff",
        marginBottom: 5,
        opacity: 0.65,

    }
});
