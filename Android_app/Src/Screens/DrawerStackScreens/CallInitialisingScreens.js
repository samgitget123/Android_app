import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Pressable, Modal, Alert,Vibration } from 'react-native'
import React, { useEffect, useState, useContext, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Groupmembers from './BottomTabs/Groupmembers';
import MainBottomTabs from './BottomTabs/MainBottomTabs';
import Fa from 'react-native-vector-icons/FontAwesome';
import Simpleicon from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Mater from 'react-native-vector-icons/MaterialIcons';
import Addusersinconf from './Addusersinconf';
import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
import { MyContext } from '../../Context/Severcontext';
const CallInitialisingScreens = ({ navigation, route }) => {
    const { usermobilenumber } = route.params;
     const {confUniqueid} = route.params;
    // console.log(confUniqueid, "cccccccccconf uniquer id");
    
    const { userid } = route.params;
    const { groupId } = route.params;
  //  console.log(usermobilenumber,"group iddddddddddddddddddd");
    const { groupName } = route.params;
    const {baseurl} = useContext(MyContext);
    const [usercount, setUserCount] = useState(0);
    const [masterdata, setMasterdata] = useState([]);  //Masterdata
    const [filterdata , setFilterdata] = useState([]);
    const [mutesFilter, setMuteFilter] = useState([]);   //Mute
    const [handriseFilter, setHandriseFilter] = useState([]);   //handrise
    const [hanguplistFilter, setHanguplistFilter] = useState([]); //Hanguplist
    const [handrisemembers , setHandrisemembers] = useState([]); //Handrise members
    const [groupduration, setGroupduration] = useState(0);
    const [Action, setAction] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentnum, setCurrentnum] = useState('');
    const [currentname, setCurrentname] = useState('');
    const [mutetoggle, setMutetoggle] = useState(true);
    const [search , setSearch] = useState('');
    //count of risings
    const [coutnofrisings , setcountofrisings] = useState('');
    const HangupGroup = async () => {
        const hangup = `${baseurl}grouppartyend?groupid=${groupId}`;
          console.log(hangup, 'Hangup call--------------------');
        try {
            const hangupresponse = await fetch(hangup);
            const json_obj = JSON.parse(JSON.stringify(hangupresponse));
            // console.log(json_obj, 'Hangup group json object====');
            setGroupduration(0);
        } catch {
            Alert.alert('sorry,something went wrong!!!')
            console.error(error);
        }
    }
    //muteall
    const mutetogglestate = async() => {
        setMutetoggle(!mutetoggle); //it will send mute satus by on press
    }
    const Mustegroupall = async () => {
        //${baseurl}muteall?gid=1&MUTE=unmute&usermobile=9848851443
        //${baseurl}muteall?gid=21&MUTE=mute&usermobile=9848851443
        const mutegroup = `${baseurl}muteall?gid=${groupId}&usermobile=${usermobilenumber}&MUTE=${mutetoggle?'mute':'unmute'}`;
        
         console.log(mutegroup, 'mute group--testing---');
        try {
            const muteresponse = await fetch(mutegroup);
            const json_obj = JSON.parse(JSON.stringify(muteresponse));
            // console.log(json_obj, 'JSON OBJ');
        } catch (error) {
            Alert.alert('sorry,something wwent wrong!!!')
            console.error(error);
        }
    }
    //set call duration
    useEffect(() => {
        const interval = setInterval(() => {
           
                 fetchlivegroupmembers();
       
              
           
        }, 1000);
        return () => clearInterval(interval);
    }, [groupId]);

    useEffect(() => {
        groupcallduration();
    },[groupduration, groupId]);

    const groupcallduration = async () => {
        try {
            //${baseurl}calldurationtime?gid=1
            const url = `${baseurl}calldurationtime?gid=${groupId}`;
            const response = await fetch(url);
            const usersjson = await response.json();
            const jsonres = JSON.parse(JSON.stringify(usersjson));
            const usersmessage = jsonres.messages;
            const usersresult = usersmessage.Groupcallduration.map((timer) => timer.conf_duration);
            setGroupduration(usersresult)
        } catch (error) {
            console.log(error);
        }
    }

    //Fetch Group members
    const fetchlivegroupmembers = async () => {
        try {
            const url = `${baseurl}livecalldata?groupid=${groupId}`;
            const response = await fetch(url);
            const usersjson = await response.json();
            const jsonres = JSON.parse(JSON.stringify(usersjson));
            const jsonobj = jsonres;
            const usermessages = jsonobj.messages;
            const userdata = usermessages.data  
            // console.log(userdata, "uuuuuuuuuuuuuu");                  //groupmembers
            let livecallid = userdata.filter(item => item.status == 'ONCALL');
            const oncallcount = livecallid.length;
            const Filterhandriselists = masterdata.filter(item => item.hand_raise_flag == 1);
            const countofhandrisings = Filterhandriselists.length;
            setMasterdata(userdata);  //Groupmembers
            setFilterdata(userdata); //filterdata
            // setHandrisemembers(Filterhandriselists); //handrise Members
            // setcountofrisings(countofhandrisings)
            // console.log(coutnofrisings , 'countofhandrisings ===========')
            // setHandriseFilter(Filterhandriselists);
            // const countofhandrisings = handriseFilter.length;
            // console.log(countofhandrisings , 'COUNT OF RISINGS');
            // setcountofrisings()
            // console.log(handriseFilter , 'HAND RISE FILTERS');
            setUserCount(oncallcount);
            // console.log(coutnofrisings ,'coutnofrisings  coutnofrisings  coutnofrisings ')
        } catch (error) {
            console.log(error);
        }
    }


    //add number live conference
    const addnumberintoconf = async () => {
        const addcallerintolive = `${baseurl}addintoconf?gid=${groupId}&user_id=${userid}&usermobile=${usermobilenumber}&contactnumber=${currentnum}&name=${currentname}&mute=0&handrise=0&cuid=${confUniqueid}`;
        // console.log(addcallerintolive, 'ADD CALLER INTO LIVE CALLS');
        try {
            if (currentnum == '' || currentname == '') {
                Alert.alert('please Enter Mobile Number!!!');
            } else {
                const response = await fetch(addcallerintolive);
                // console.log(response, '----response---testing url');
                //console.log(response.messages , '--------message');
                const json_obj = JSON.parse(JSON.stringify(response));
                // console.log(json_obj, 'JSON OBJ')
                setCurrentnum('');
                setCurrentname('');
            }

        } catch (error) {
            console.log(error)
        }
    }

    //search filter
    const searchFilter = (text) => {
        if(text != ''){
            const newData = masterdata.filter((item)=>{
                const itemData = item.contact ? item.contact_display_name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilterdata(newData);
            setSearch(text);
        }else{
          setFilterdata(masterdata);
            setSearch(text);
        }
    }
    
    const timeinHHMMSS=(time)=>{
       const timer = `${time}`;
        return timer.split(' ')[1];
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
                        <View style={{ padding: 30, flexDirection: "row" }}>
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
                            <View style={{ marginLeft: 20 }}>
                                {/* <Image
                                    source={require('../../Assets/avatar.png')}
                                    style={{ width: 40, height: 40, borderRadius: 20 }}
                                /> */}
                                  <Mc name="face-man-profile" style={{fontSize:50,color:"#fff"}} />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: "#fff", fontSize: 22 }}>{groupName}</Text>
                            </View>
                        </View>
                        <View style={{ padding: 30, flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={{ color: "#fff", fontSize: 22 }}>{timeinHHMMSS(groupduration)}</Text>
                                <Text style={{ color: "#fff", fontSize: 14 }}>{usercount} Member(s) On Call</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                <TouchableOpacity
                                    onPress={async() => {
                                    //   setMutetoggle(!mutetoggle);
                                     await mutetogglestate();
                                      Mustegroupall(); //no toggle
                                    }}
                                >
                                    <View style={{ marginLeft: 20 }}>
                                        <Fa name="microphone-slash" style={{ fontSize: 33, color: "#fff" }} />
                                    </View>
                                </TouchableOpacity>
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
                        {/* <View>
                            <View style={{ width: "100%" }}>
                                <TextInput
                                    placeholder='Search for member(s)'
                                    autoFocus={true}
                                    autoCapitalize="none"
                                    color="#000"
                                    underlineColorAndroid="transparent"
                                    // keyboardType='numeric'
                                    maxLength={10}
                                    keyboardAppearance={'alpha-numeric'}
                                    style={styles.searchbar}
                                    value={search}
                                    onChangeText={(text) => searchFilter(text)}
                                />
                            </View>
                        </View> */}
                        {<MainBottomTabs
                            groupid={groupId}
                            groupcallstatus={masterdata}    //Groupmembers screeN
                            oncallercount={usercount}      //Usercount
                            Userid={userid}
                            UserMobileNumber={usermobilenumber}
                            groupname={groupName}
                            // mutecallstatus = {mutesFilter}     //Mute status
                            handrisestatus={handriseFilter}      //Handrise screen
                            // handrisecount = {coutnofrisings} //handrise count
                            // handrisemembers = {handrisemembers} //Handrise members
                        // haguplists = {hanguplistFilter}       //Hanguplist
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
                    // Action === 'ADDMEMBERINGROUP' ? (
                    //     <>
                    //         <View style={styles.centeredView}>
                    //             <View style={styles.modalView}>
                    //                 <Text style={styles.modalheading}>Add members in Group</Text>
                    //                 {/* <Text style={styles.modalText}>ConvoxMeet.</Text> */}
                    //                 <Pressable
                    //                 // style={[styles.button, styles.buttonClose]}
                    //                 >
                    //                     <View style={styles.contactviewbox}>
                    //                         {
                    //                             // <Addusersinconf viewgroupid={groupId}/>
                    //                         }
                    //                     </View>
                    //                 </Pressable>
                    //             </View>
                    //             <View>
                    //                 <TouchableOpacity
                    //                     onPress={() => setModalVisible(!modalVisible)}
                    //                 >
                    //                     <View style={{ backgroundColor: "#192a53", padding: 12, borderRadius: 12 }}>
                    //                         <Text style={{ color: "#fff" }}>Close</Text>
                    //                     </View>
                    //                 </TouchableOpacity>
                    //             </View>
                    //         </View>
                    //     </>
                    // ) : null
                    Action === 'ADDMEMBERINGROUP' ? (
                        <>
                            <View style={styles.centeredView}>
                                <View style={styles.editmodalView}>
                                    <View><Text style={{color:"#000"}}>Here!, you can add contact into conference...</Text></View>
                                    
                                    <View style={{ width: "100%" }}>
                                        <TextInput
                                            placeholder='Participate Name'
                                            autoFocus={true}
                                            autoCapitalize="none"
                                            color="#000"
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
                                    <View style={{ width: "100%" , marginVertical:10 }}>
                                        <TextInput
                                            placeholder='Mobile Number'
                                            autoFocus={true}
                                            autoCapitalize="none"
                                            color="#000"
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
                                  
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => addnumberintoconf()}
                                        >
                                            <View style={{ backgroundColor: "#192a53", padding: 12, borderRadius: 12 }}>
                                                {/* <Text style={{ color: "#fff" }}>Update</Text> */}
                                                <Mater 
                                                    name="add-call"
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

export default CallInitialisingScreens

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
        padding: 30,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        width: '80%',
       
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