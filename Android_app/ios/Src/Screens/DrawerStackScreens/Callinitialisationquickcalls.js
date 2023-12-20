import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator, FlatList, Modal, Alert } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CallsContext } from '../../Context/CallsContext';
import Groupmembers from './BottomTabs/Groupmembers';
import Mainbottomquickcall from './BottomTabs/Mainbottomquickcall';
import Quickmembers from './BottomTabs/Quickmembers';
import Fa from 'react-native-vector-icons/FontAwesome';
import Simpleicon from 'react-native-vector-icons/SimpleLineIcons';
import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionic from 'react-native-vector-icons/Ionicons' 
import {MyContext} from '../../Context/Severcontext';
const Callinitialisationquickcalls = ({ navigation, route }) => {
    const { userId } = route.params;
    const {usermobilenumber} = route.params;
     //servers 
    const {baseurl} = useContext(MyContext);
    console.log(userId, 'USER ID FOR QUICK CALLS...........');
    //States
    const [usercount, setUserCount] = useState(0);
    const [quickmembers, setQuickmembers] = useState([]);
    const [time, setTime] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [Action, setAction] = useState('');
    const [mutetoggle, setMutetoggle] = useState(true);
    const [currentnum, setCurrentnum] = useState('');
    const [currentname, setCurrentname] = useState('');
    //set call duration
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                await fetchlivequickmembers();
            } catch (error) {
                console.log(error);
            }

        }, 1000);

        return () => clearInterval(interval);

    }, []);

    //hangup quickcall
    const HangupGroup = async () => {
        //${baseurl}singlepartygroupend?userid=1`   
        const hangup = `${baseurl}singlepartygroupend?userid=${userId}`;
        console.log(hangup, 'Hangup call--------------------');
        try {
            const hangupresponse = await fetch(hangup);
            const json_obj = JSON.parse(JSON.stringify(hangupresponse));
            console.log(json_obj, 'Hangup group json object====');
        } catch {
            Alert.alert('sorry,something went wrong!!!')
            console.error(error);
        }
    }
    //Fetch Group members
    const fetchlivequickmembers = async () => {
        try {
            const url = `${baseurl}livequickcalldata?uid=${userId}`;
            const response = await fetch(url);
            const usersjson = await response.json();
            const jsonres = JSON.parse(JSON.stringify(usersjson));
            const jsonobj = jsonres;
            const usermessages = jsonobj.messages;
            console.log(usermessages, 'USER MESSAGES');
            const userdata = usermessages.data;
            setQuickmembers(userdata)
            console.log(Quickmembers, 'set quickmembers=====');
            let livecallid = userdata.map(({ live_id }) => live_id);
            const oncallcount = livecallid.length;
            setUserCount(oncallcount);
        } catch (error) {
            console.log(error);
        }
    }
    //mute toggle
    function getMuteIconComponent(muteflag) {
        if (muteflag == 1) {
            return <Fa name="microphone-slash" style={{
                marginHorizontal: 20,
                fontSize: 22
            }} />; // Mute icon
        } else {
            return <Fa name="microphone" style={{
                marginHorizontal: 20,
                fontSize: 22
            }} />; // Unmute icon
        }
    }

    const mutetogglestate = () => {

        setMutetoggle(!mutetoggle); //it will send mute satus by on press
    }
    const Mustegroupall = async () => {
        // const mutegroup = `${baseurl}muteall?gid=${groupId}&MUTE=${mutetoggle?'mute':'unmute'}`;
        // console.log(mutegroup, 'mute group-----');
        // try {
        //     const muteresponse = await fetch(mutegroup);
        //     const json_obj = JSON.parse(JSON.stringify(muteresponse));
        //     console.log(json_obj , 'JSON OBJ');
        // } catch (error) {
        //     Alert.alert('sorry,something wwent wrong!!!')
        //     console.error(error);
        // }
        Alert.alert('in progress');
    }
    //add number live conference
    const addnumberintoconf = async () => {
        const addcallerintolive = `${baseurl}addintoconf?gid=&user_id=${userId}&usermobile=${usermobilenumber}&contactnumber=${currentnum}&name=contactname&mute=0&handrise=0`;
        console.log(addcallerintolive, 'ADD CALLER INTO LIVE CALLS');
        try {
            if (currentnum == '' ||  currentname == '') {
                Alert.alert('please Enter Mobile Number!!!');
            } else {
                const response = await fetch(addcallerintolive);
                console.log(response, '----response---testing url');
                //console.log(response.messages , '--------message');
                const json_obj = JSON.parse(JSON.stringify(response));
                console.log(json_obj, 'JSON OBJ')
                setCurrentnum('');
                setCurrentname('')
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <View
                style={[
                    styles.container,
                    {
                        // Try setting `flexDirection` to `"row"`.
                        flexDirection: 'column',
                        flex: 1
                    },
                ]}>
                <View style={styles.topcontainer}>
                    <View style={{ flexDirection: "column", justifyContent: "space-around" }}>
                        <View style={{ padding: 30, flexDirection: "row", marginTop: 20 }}>
                            <View>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('DrawerStack');
                                }}>
                                    <Image
                                        source={require('../../Assets/arrow.png')}
                                        style={styles.arraowimage}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginLeft: 20 , flexDirection:"row" , justifyContent:"center" , alignItems:"center"}}>
                                {/* <Image
                                    source={require('../../Assets/avatar.png')}
                                    style={{ width: 40, height: 40, borderRadius: 20 }}
                                /> */}
                                 <Ionic name="speedometer" style={{fontSize:50,color:"#fff"}} />
                                 <View><Text style={{fontWeight:"bold" , color:"#fff"}}>Quick Call</Text></View>
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: "#fff", fontSize: 22 }}></Text>
                            </View>
                        </View>
                        {/* <View style={{ padding: 30, flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={{ color: "#fff", fontSize: 22 }}></Text>
                                <Text style={{ color: "#fff", fontSize: 14 }}>{usercount} Member(s) On Call</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                <View style={{ marginLeft: 20 }}>
                                    <Image
                                        source={require('../../Assets/mike.png')}
                                        style={{ width: 30, height: 30, borderRadius: 15 }}
                                    />
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <Image
                                        source={require('../../Assets/add-user.png')}
                                        style={{ width: 30, height: 30, borderRadius: 15 }}
                                    />
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                   
                                    <TouchableOpacity
                                        onPress={() => {
                                            HangupGroup();
                                        }}
                                    >
                                        <Image
                                            source={require('../../Assets/hangup.png')}
                                            style={{ width: 30, height: 30, borderRadius: 15 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> */}
                        <View style={{ padding: 30, flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={{ color: "#fff", fontSize: 22 }}></Text>
                                <Text style={{ color: "#fff", fontSize: 14 }}>{usercount} Member(s) On Call</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                {/* <TouchableOpacity
                                    onPress={() => {
                                        mutetogglestate();
                                        Mustegroupall();
                                    }}
                                >
                                    <View style={{ marginLeft: 20 }}>
                                        <Fa name="microphone" style={{ fontSize: 33, color: "#fff" }} />
                                    </View>
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                        setAction('ADDMEMBERINGROUP');
                                    }}
                                >
                                    <View style={{ marginLeft: 20 }}>
                                        <Fa name="group" style={{ fontSize: 33, color: "#fff" }} />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ marginLeft: 20 }}>
                                    {/* //${baseurl}grouppartyend?groupid=25  */}
                                    <TouchableOpacity
                                        onPress={() => {
                                            HangupGroup();
                                        }}
                                    >
                                        <Simpleicon name="call-end" style={{ fontSize: 33, color: "red" }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>


                <View style={styles.bottomcontainer}>
                    <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between", paddingBottom: 0 }}>
                        <View>
                            <View style={{ width: "100%" }}>
                                <TextInput
                                    placeholder='Search for member(s)'
                                    autoFocus={true}
                                    autoCapitalize="none"
                                    color="#000"
                                    underlineColorAndroid="transparent"
                                    keyboardType='numeric'
                                    maxLength={10}
                                    keyboardAppearance={'number-pad'}
                                    style={styles.searchbar}
                                />
                            </View>
                        </View>
                        {< Mainbottomquickcall
                            quickcallmembers={quickmembers}
                            oncallercount={usercount}
                        />}
                    </View>

                </View>

            </View>
            {/*modal*/}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                {

                    Action === 'ADDMEMBERINGROUP' ? (
                        <>
                            <View style={styles.centeredView}>
                            <View style={styles.editmodalView}>
                                    <View><Text>Here!, you can add contact into conference...</Text></View>
                                    <View style={{ width: "100%" , marginVertical:10 }}>
                                        <TextInput
                                            placeholder='Mobile Number'
                                            autoFocus={true}
                                            autoCapitalize="none"
                                            color="#fff"
                                            keyboardType='alpha-numeric'
                                            maxLength={10}
                                            keyboardAppearance={'number-pad'}
                                            // onSubmitEditing={(event) => onEditabledone(event.nativeEvent.text)}
                                            style={styles.searchbar}
                                            value={currentnum}
                                            onChangeText={(text) => {
                                                setCurrentnum(text)
                                            }}
                                        />

                                    </View>
                                    <View style={{ width: "100%" }}>
                                        <TextInput
                                            placeholder='Participate Name'
                                            autoFocus={true}
                                            autoCapitalize="none"
                                            color="#fff"
                                            keyboardType='alpha-numeric'
                                            maxLength={10}
                                            keyboardAppearance={'number-pad'}
                                            // onSubmitEditing={(event) => onEditabledone(event.nativeEvent.text)}
                                            style={styles.searchbar}
                                            value={currentname}
                                            onChangeText={(text) => {
                                                setCurrentname(text)
                                            }}
                                        />

                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => addnumberintoconf()}
                                        >
                                            <View style={{ backgroundColor: "#192a53", padding: 12, borderRadius: 12 }}>
                                                {/* <Text style={{ color: "#fff" }}>Update</Text> */}
                                                <Entypo
                                                    name="edit"
                                                    color="#fff"
                                                    size={33}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <View style={{ backgroundColor: "#192a53", padding: 12, borderRadius: 12, marginLeft: 30 }}>
                                                {/* <Text style={{ color: "#fff" }}>Close</Text> */}
                                                <Entypo
                                                    name="cross"
                                                    color="red"
                                                    size={33}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </>
                    ) : null
                }
            </Modal>
        </>
    )
}

export default Callinitialisationquickcalls
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#192a53",
    },
    topcontainer: {
        flex: 3,
        backgroundColor: '#192a53'
    },
    bottomcontainer: {
        flex: 10,
        backgroundColor: "#fff",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        // borderBottomLeftRadius: 40,
        // borderBottomRightRadius: 40,
    },
    bottomtabbar: {
        flex: 1,
        backgroundColor: 'grey',
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    arraowimage: {
        width: 30,
        height: 30
    },
    bottomicons: {
        width: 25,
        height: 25,
        borderRadius: 12.5
    },
    searchbar: {
        color: "#000",
        paddingLeft: 20,
        fontSize: 22,
        borderColor: "grey",
        borderWidth: 0.7,
        borderRadius: 28,
        backgroundColor: "#fff"

    },
    userslistbox: {
        margin: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    drawerboardusersimage: {
        width: 40,
        height: 40,
        marginHorizontal: 10,
        opacity: 0.5,

    },
    //Modal
    button: {
        borderRadius: 12,
        paddingVertical: 5,
        marginVertical: 5
    },
    buttonClose: {
        backgroundColor: "#fff",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: '100%',
        height: 100,
    },
    modalView: {
        margin: 20,
        backgroundColor: "#192a53",
        borderRadius: 20,
        padding: 3,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        width: '100%',
        height: '60%',

    },
    editmodalView: {
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingTop: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        width: '80%',
        height: '50%',

    },
    modalText: {
        marginBottom: 5,
        textAlign: "center",
        fontSize: 18,
        color: "#000",

    },
    modalheading: {
        fontSize: 18,
        fontWeight: "500",
        marginVertical: 10,
        color: "#000",

    },
    tandc: {
        color: "#000",
        marginBottom: 5,
        textAlign: "auto"
    },
    contactviewbox: {
        backgroundColor: "#fff",
        borderRadius: 12,
        minWidth: '80%',
    },
    searchbar: {
        color: "#000",
        textAlign: "center",
        fontSize: 22,
        borderColor: "grey",
        borderBottomWidth: 0.7,
        borderRadius: 20,
        paddingTop: 6

    }

});