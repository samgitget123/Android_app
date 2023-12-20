import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, TextInput, Button, Alert, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useRef, useEffect, useContext } from 'react';

import SearchBar from "react-native-dynamic-search-bar";

import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from "react-native-animatable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import ContactList from './ContactList';
import ContactListforquickcalls from './ContactListforquickcalls';
import { MyContext } from '../../Context/Severcontext';
const QuickTalks = ({ route, navigation }) => {

    // const num1Ref = useRef(null);
    // const [searchcontacts, setSearchContacts] = useState();
    const {baseurl} = useContext(MyContext);
    const [dialicon, setDialicon] = useState(false);
    const [usermobile, setUsermobile] = useState("");
    const [runCall, setRunCall] = useState([]);
    //single user numbers
    const [userid, setUserid] = useState([]);
    const [search, setSearch] = useState([]);
    const [serialid , SetSerialid] = useState('');

    //getusernumber
    //load username and anything here through async and useeffect
    //USERIDNUMBER

    const _storeuserid = async () => {
        try {
            const userid = await AsyncStorage.getItem('USERIDNUMBER');
            const usermobilenumber = await AsyncStorage.getItem('userMobileNumber');
            setUserid(userid);
            console.log(usermobile, '.........../usereffect///////////////');
            // We have data!!
            console.log(serialid, 'USER ID NUMBER saved at home,,,,state');
        } catch (error) {
            console.log(error, 'USERD NOT SAVED IN ASYNC STORAGE AT HOME');
        }
    }
    React.useEffect(() => {
        (async () => {
            await _storeuserid();
            quickserialgenerate();
        })();

    }, []);
    // useEffect(()=>{
    //     quickserialgenerate();
    // },[]);
    //quick serial generate
    const quickserialgenerate = async () => {
        const userid = await AsyncStorage.getItem('USERIDNUMBER');
        fetch(`${baseurl}createquickserial?user_id=${userid}`)
            .then(response => response.json())
            .then(data => {
                // Do something with the response data
               const quickid = data.messages.quickid;
               SetSerialid(quickid);
               console.log(serialid , 'QUICK ID=======================>');
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error(error);
            });
        // try {
        //     const userid = await AsyncStorage.getItem('USERIDNUMBER');
        //     const quickserial = '${baseurl}createquickserial?user_id=1';
        //     console.log(quickserial, 'quick serial');
        //     const quickresponse = await fetch(quickserial);
        //     console.log(quickresponse, 'QUICK RESPONSE');
        //     // console.log(quickresponse, '----response');
        //     const json_obj = JSON.stringify(quickresponse);
        //     console.log(json_obj.messages, 'quick serial has been generated');
        // } catch (error) {
        //     Alert.alert('sorry,something went wrong!!!')
        //     console.error(error);
        // }
    }

    //updateparticipate
    const [participatenumber, setParticipateNumber] = useState("");
    const [updateParticipateNumber, setUpdateParticipateNumber] = useState([]);
    //toggledial
    const generateotptoggle = () => {
        setDialicon(!dialicon);
    }

    //Goto Livescreen
    const gotoquickcalllivescreen = async() => {   //singleusercall
        const usermobilenumber = await AsyncStorage.getItem('userMobileNumber');
        navigation.navigate('QuickcallLivescreen', {
            userId: userid,
            usermobilenumber : usermobilenumber 
        });
    }

    // /quick call
    // useEffect(() => {
    //     (async () => {
    //         const usermobilenumber = await AsyncStorage.getItem('userMobileNumber');
    //         setUsermobile(usermobilenumber);

    //     })();

    // }, []);
    const Runsinglecall = async (userid) => {
        //getuseridle
        console.log(runCall, 'Array of signle run calls')
        try {
            const usermobilenumber = await AsyncStorage.getItem('userMobileNumber');
            ////${baseurl}runsinglecall?uid=1&mute=0&handrise=0&name=contatname&usermobile=9848851443&quickid=2
            insertnumurl = `${baseurl}runsinglecall?uid=${userid}&mute=0&handrise=0&name=contatname&usermobile=${usermobilenumber}&quickid=${serialid}`;
            const response = await fetch(
                insertnumurl
            );
            const res = await response.json();
            const obj = JSON.parse(JSON.stringify(res));

        } catch (error) {
            Alert.alert('sorry,something went wrong!!!')
            console.error(error);
        }

    }


    //update saved contacts 
    const [savedcontacts, setSavedContacts] = useState([]);
    //seperater
    const Separator = () => {
        return (
            <View
                style={{
                    height: 30,
                    width: 1,
                    backgroundColor: "#fff",
                }}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.primarycontainer}>
                {/* <View style={{ padding: 30 }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                        <Image
                            source={require('../../Assets/arrow.png')}
                            style={styles.arraowimage}
                        />
                    </TouchableOpacity>
                </View> */}
                <View style={{ width: "40%", padding: 10, marginTop: 20, marginLeft: 20 }}>
                    <Button
                        title="Live Board"
                        onPress={() => {
                            gotoquickcalllivescreen(userid);
                        }}
                        style={styles.livedashboardbtn}
                    />
                </View>
            </View>
            <Animatable.View style={styles.secondarycontainer} animation="fadeInDownBig">
                <View style={{ marginHorizontal: 0, marginTop: 10 }}>
                    <View style={{ flexDirection: "column", justifyContent: "space-around" }}>
                        <View style={{ marginTop: 80, marginBottom: 20 }}>
                            {<ContactListforquickcalls userId={userid} serialid = {serialid}/>}
                        </View>
                    </View>
                </View>
                <View style={styles.callbtn}>
                    <TouchableOpacity
                        onPress={
                            async () => {
                                await Runsinglecall(userid);
                                gotoquickcalllivescreen(userid);
                            }
                        }
                    >
                        <View >
                            {/* <Text style={styles.Register_Text}>Call</Text> */}
                            <Image
                                style={{ height: 60, width: 60 }}
                                source={require('../../Assets/dialcall.png')}
                            />
                        </View>
                    </TouchableOpacity>

                </View>



            </Animatable.View>
        </View>
    )
}

export default QuickTalks;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#192a53",

    },
    primarycontainer: {
        flex: 1,
    },
    secondarycontainer: {
        flex: 8,
        backgroundColor: "#fff",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        textAlign: "center",

    },
    searchfield: {
        marginVertical: 20,
        borderColor: "grey",
        width: "80%",
        borderWidth: 0.5,
        paddingVertical: 6,
        borderRadius: 22,
        paddingLeft: 15,

    },
    Register: {
        borderWidth: 1,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 22,
        backgroundColor: "#192a53",
        width: "60%",
        textAlign: "center",
        marginVertical: 20
    },
    Register_Text: {
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center"
    },
    nextbtn: {
        borderWidth: 1,
        paddingHorizontal: 40,
        paddingVertical: 10,
        width: "60%",
        textAlign: "center",
        borderRadius: 22,
        backgroundColor: "#192a53",
        color: "#fff",
        fontWeight: "bold",
        zIndex: 1
    },
    addcontactimagebg: {
        width: 100,
        height: 100
    },
    toggledialicon: {
        justifyContent: "center",
        alignItems: "center",
    },
    updatenumberbox: {
        borderWidth: 1,
        paddingHorizontal: 1.5,
        paddingVertical: 0.5,
        backgroundColor: "#192a53",
        color: "#fff",
        borderRadius: 8,

    },
    //enter mobile input
    inputField: {
        flexDirection: "row",
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "grey",

    },
    callbtn: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 20,
        color: "#fff",
        width: "100%",
    },
    arraowimage: {
        width: 30,
        height: 30
    },
    livedashboardbtn: {
        backgroundColor: 'steelblue',
        borderRadius: 10,
        padding: 10,
    },

    //textarea

});