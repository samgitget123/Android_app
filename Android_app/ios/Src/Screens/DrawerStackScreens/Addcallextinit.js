import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert } from 'react-native'
import React, { useContext } from 'react';

import * as Animatable from "react-native-animatable";
import {MyContext } from '../../Context/Severcontext';
const Addcallextinit = ({route , navigation }) => {
    const {groupidnumber}= route.params;
    const {mobilenumber} = route.params;
    const {Groupname} = route.params;
    const {userId} = route.params;
     //servers 
    const { baseurl} = useContext(MyContext);
    console.log(groupidnumber , 'GROUP ID NUMBER FOR ADD CALL');
    //when user press call tis function triggers
    const called = async () => {
        try {
          const response = await fetch(
            'http://172.16.12.74/CallApi.php'
          );
          const json = await response.json();
          return json;
        } catch (error) {
          console.error(error);
        }
      };

      const Makecall = async () => {
        // const groupcallid = JSON.stringify(groupidnumber);
        // console.log(groupcallid ,'......air....');
        try {
            //${baseurl}groupcall?group_id=8&user_id=1&usermobile=9848851443&name=contactname&mute=0&handrise=0
            const url = `${baseurl}groupcall?group_id=${groupidnumber}&user_id=${userId}&usermobile=${mobilenumber}&name=contactname&mute=0&handrise=0`;
            console.log(url , 'call url');
            const response = await fetch(url);
            const result =  response;
            const json_obj = JSON.parse(JSON.stringify(result));
        } catch (error) {
            Alert.alert('sorry,something went wrong!!!')
            console.error(error);
        }
      }

    return (
        <View style={styles.container}>
            <View style={styles.primarycontainer}>

            </View>
            <Animatable.View style={styles.secondarycontainer} animation="fadeInUpBig">
                <View style={{ flexDirection: "column", justifyContent: "space-around" }}>
                    <View>

                    </View>
                    <View>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Image
                                style={styles.addcontactimagebg}
                                source={require('../../Assets/addcontactssetting.jpg')}
                            />
                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center" }}><Text style={{ fontWeight: "bold", marginVertical: 15 }}>Welcome To Convoxmeet </Text></View>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>


                            <TouchableOpacity style={styles.Register}
                                onPress={
                                    () => {
                                        Makecall();
                                        navigation.navigate('Initialcallscreens',{
                                            groupId: groupidnumber,
                                            groupName: Groupname,
                                            userid : userId,
                                        })
                                    }
                                }
                            >
                                <View >
                                    <Text style={styles.Register_Text}>Call</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={styles.lineStyle} />

                            <View style={{ marginVertical: 20 }}>
                                <Text style={{ color: "grey" }}>OR </Text>
                            </View>

                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontWeight: "bold", color: "grey" }}>Create a Schedule for this group</Text>
                            </View>

                            <TouchableOpacity style={{ marginVertical: 30 }}
                                onPress = {
                                    () => {
                                        navigation.navigate('Schedulecalls',{
                                            groupId : groupidnumber 
                                        });
                                    }
                                }
                            >
                                <View >
                                    <Text style={{ fontSize: 22, color: "#192a53", fontWeight: "500" }}>Continue</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: "column" }}>

                </View>

            </Animatable.View>




        </View>
    )
}

export default Addcallextinit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#192a53"
    },
    primarycontainer: {
        flex: 1,

    },
    secondarycontainer: {
        flex: 5,
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
        paddingVertical: 20,
        borderRadius: 50,
        backgroundColor: "#192a53",
        width: "80%",
        textAlign: "center",
        marginVertical: 20,

    },
    Register_Text: {
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        fontSize: 18
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
        fontWeight: "bold"
    },
    addcontactimagebg: {
        width: 100,
        height: 100
    },
    lineStyle: {
        borderWidth: 0.25,
        borderColor: 'grey',
        marginTop: 40,
        width: "60%"
    }
});