import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert, Vibration ,PermissionsAndroid} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
//imagepicker
import { launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; //Asyncstorage
import Feather from 'react-native-vector-icons/Feather';
import Ant from 'react-native-vector-icons/AntDesign';
import { createContext } from 'react';
import Anticon from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Oct from 'react-native-vector-icons/Octicons';
import * as Animatable from "react-native-animatable";
import EmptyHomeBoard from './EmptyHomeBoard';
import { MyContext } from '../../Context/Severcontext';

const CreateGroup = ({ navigation }) => {
    const {baseurl} = useContext(MyContext);
    const [groupname, setGroupName] = useState('');
    const [getmobile, setGetmobile] = useState("");
    const [userid , setUserid] = useState('');
    const [groupid , setGroupid] = useState('');
    const [galleryPhoto , setGalleryPhoto] = useState();
    const [cameraPhoto , setCameraPhoto] = useState();
 
    //reset groupname
    const resetGroupname = () => {
        setGroupName("");
        setGetmobile("");
    }
    function vibrate() {
        Vibration.vibrate(200);
      }
    //store group id in async storage
    const [storegroupid , setStoregroupid] = useState(null);
      //pin number
      const [randomNumber, setRandomNumber] = useState('');
     // Function to generate a random 6-digit number
  const generateRandomNumber = async() => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    setRandomNumber(randomNumber.toString());
  };
      
    useEffect(() => {
        (async () => {
            await generateRandomNumber();
            const usermobilenumber = await AsyncStorage.getItem('userMobileNumber');
            setGetmobile(usermobilenumber);

        })();
        
    }, []);



    //groupname creation
    const groupcreate = async () => {
        if (!groupname) {
            Alert.alert('Please Enter Group Name');
            return;
        }
        try {
            const url = `${baseurl}creategroup?gname=${groupname}&schedule=1&active=1&mobile=${getmobile}`;
           
            const creategroupapi = await fetch(url);
            const groupjson = await creategroupapi.json();
    
            if (groupjson.messages && groupjson.messages.success) {
                const group_id = groupjson.messages.group_id;
                const conf_id = groupjson.messages.conf_id;
                Alert.alert('Group has been created');
    
                const gotonext = navigation.navigate('creategroupnext', {
                    groupId: group_id,
                    groupName: groupname,
                    usermobile: getmobile,
                    Userid: userid,
                    confId: conf_id,
                });
    
                return gotonext;
            }else if(groupjson.messages && groupjson.messages.fail) {
                Alert.alert('Group name already exist'); // Show this for any other unexpected error
            }
        } catch (error) {
            Alert.alert('Sorry, something went wrong!!!'); // Show this for network or other errors
            console.error(error);
        }
    }
    
    
    // const groupcreate = async () => {
    //     //https://convoxmeet.deepijatel.in/convoxmeet/api/creategroup?gname=${groupname}&schedule=1&active=1&mobile=9848851443
    //     const url = `${baseurl}creategroup?gname=${groupname}&schedule=1&active=1&mobile=${getmobile}`;
    //     try {
    //         console.log(url,'try url');
    //         const creategroupapi = await fetch(url);
    //         const groupjson = await creategroupapi.json();
    //        const jsonres =  JSON.parse(JSON.stringify(groupjson));
           
    //         const returnSuccessMessage =  jsonres.messages.success;
    //         const group_id = jsonres.messages.group_id;
    //         setGroupid(group_id);
    //         const conf_id = jsonres.messages.conf_id;
    //         const returnFailureMessage = jsonres.messages.fail;
    //         if(returnSuccessMessage){
    //             Alert.alert('Group has been created');
    //             const gotonext =  navigation.navigate('creategroupnext' , {
    //                 groupId: group_id,
    //                 groupName : groupname,
    //                 usermobile : getmobile,
    //                 Userid : userid,
    //                 confId : conf_id,
    //               });
    //               return gotonext;
    //         }
    //         if(returnFailureMessage){
    //             Alert.alert('Group Name already Exists');
    //         }
             
    //     } catch (error) {
    //         Alert.alert('sorry,something went wrong!!!')
    //         console.error(error);
    //     }

    // }
    //options
    let options = {
        saveToPhotos : true,
        mediaType: 'photo'
    }
    //imagepicker
    const openGallery = async() => {
       const result = await launchImageLibrary(options);
       setGalleryPhoto(result.assets[0].uri);
      }
      //open camera
      const openCamera = async()=>{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
            const result = await launchCamera(options);
            setCameraPhoto(result.assets[0].uri);
        }
      }
    return (
        <View style={styles.container}>
                <View style={{position:"relative" , width:"100%"  , display:"flex" , justifyContent:"center", alignItems:"center"}}>
                <FontAwesome
                    name="group"
                    color="grey"
                    size={150}           
                />
                <Anticon name='pluscircleo' size={60} color="#192a53" style={{position:"absolute" , bottom:"-20%", left:"55%" }} onPress={openGallery}/>
                </View>
                <View>
                    <Text>Add Group Profile</Text>
                </View>
            <View style={styles.inputFieldstyle}>
                <View style={styles.cameraicon}>
                    <TouchableOpacity onPress={openGallery} >
                        {/* <Feather name="camera" size={30} color="grey" /> */}
                        <FontAwesome name="group" color="grey" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.creategroupinout}>
                    <TextInput
                        placeholder='Create Group Name'
                        color="#000"
                        value={groupname}
                        onChangeText={(name) => setGroupName(name)}
                    />
                </View>
            </View>
            {/* <View style={styles.inputFieldstyle}>
                <View style={styles.cameraicon}>
                    <TouchableOpacity  >
                        <Feather name="camera" size={30} color="grey" />
                    </TouchableOpacity>
                </View>
                <View style={styles.creategroupinout}>
                    <TextInput
                        placeholder='Conference Number'
                        color="#000"
                    />
                </View>
            </View> */}
           {/* <View style={styles.inputFieldstyle}>
                <View style={styles.cameraicon}>
                    <TouchableOpacity  >
                        <Oct name="number" size={30} color="grey" />
                    </TouchableOpacity>
                </View>
                <View style={styles.creategroupinout}>
                    <TextInput
                        placeholder='Pin'
                        color="#000"
                        value={randomNumber}
                    />
                </View>
        </View>*/}
             {/* <View>
                    <Image style={styles.galleryImage} source={{uri: cameraPhoto}} />
                </View> */}
            {/* <View style={styles.inputFieldstyle}>
                <View style={styles.cameraicon}>
                    <TouchableOpacity>
                        <Ant name="idcard" size={30} color="grey" />
                    </TouchableOpacity>
                </View>
                <View style={styles.creategroupinout}>
                    <TextInput
                        placeholder='Conferenece Number'
                        color="#000"
                        // value={groupid}
                        disabled
                    />
                </View>
            </View>
            <View style={styles.inputFieldstyle}>
                <View style={styles.cameraicon}>
                    <TouchableOpacity>
                        <Feather name="list" size={30} color="grey" />
                    </TouchableOpacity>
                </View>
                <View style={styles.creategroupinout}>
                    <TextInput
                        placeholder='ID:'
                        color="#000"
                        value={groupname}
                        disabled
                    />
                </View>
            </View> */}

            <View style={styles.caption}>
                <Text style={{ textAlign: "center", color: "#000" }}>Create  Group and Schedule Your Conference Call Now</Text>
            </View>

            <TouchableOpacity
                onPress={() => {
                     groupcreate();
                    resetGroupname();
                }}
            >
                <View style={styles.next}>
                    <Text style={styles.next_text}>Next</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CreateGroup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        flexDirection: "column",
        justifyContent: "space-evenly"
    },
    creategroupinout: {
        width: "60%",
        borderBottomColor: "#192a53",
        borderBottomWidth: 2,
        marginHorizontal: 20
    },
    inputFieldstyle: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%"
    },
    caption: {
        justifyContent: 'center',
        textAlign: 'center',
        width: "60%",
        marginTop: 30,
        fontWeight: 'bold',
        fontStyle: 'italic'

    },
    creategroupimagebg: {
        width: 400,
        height: 300
    },
    next: {
        borderWidth: 1,
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 22,
        backgroundColor: "#192a53"
    },
    next_text: {
        fontWeight: "bold",
        color: "#fff"
    },
    galleryImage:{
        width: 300,
        height: 300
    }
   

});