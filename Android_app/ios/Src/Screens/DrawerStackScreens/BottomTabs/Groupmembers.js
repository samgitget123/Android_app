import { StyleSheet, Text, View, TouchableOpacity, Image, Vibration, TextInput, ActivityIndicator, FlatList, Alert, Button } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
import Fa from 'react-native-vector-icons/FontAwesome';
import Simpleicon from 'react-native-vector-icons/SimpleLineIcons';
import Mi from 'react-native-vector-icons/MaterialIcons';
import { MyContext } from '../../../Context/Severcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from "react-native-dynamic-search-bar";

const Groupmembers = (props) => {
    const groupmembersoncall = props.groupcallers;  //global data
    const [masterdata , setMasterdata] = useState([]); //masterdata
   // console.log(masterdata, "masteringgggggggggggggggggggggggggg");


    //const [filterdata , setFilterdata] = useState([]); //filterd ata
    const {baseurl} = useContext(MyContext);
    useEffect(()=>{
        confmembers();
    },[groupmembersoncall])
    const confmembers = () => {
        setMasterdata(groupmembersoncall);
    }
    const groupID = props.groupId;
    const groupName = props.Groupname;
    const Usermob = props.Usermobile;
   // console.log(Usermob, 'USER MOBILE NUMBER========')
    const userId = props.userId;
    const [loading, setLoading] = useState(false);
   // const [mutetoggle, setMutetoggle] = useState(false);
    //const [mutestatus, setMutestatus] = useState('');
    const [search, setSearch] = useState('');
    // const [usermob , setUsermob] = useState(usermob);
    // const [muteFlag, setMuteFlag] = useState(''); //////extra
    //update mut status icon
    // const [ismuteToggle , setIsmutetoggle] = useState(false)
    const [activeId, setActiveId] = useState('');
    //mute toggle
    // const mutetogglestate = async() => {

    //     setMutetoggle(!mutetoggle); //it will send mute satus by on press
    // }
    
    // const isMuted = getMuteFlagFromDatabase();  //extra
    //mute extra
    function getMuteIconComponent(muteflag) {
        if (muteflag == 1) {
            return <Fa name="microphone-slash" style={{
                marginHorizontal: 20,
                fontSize: 25
            }} />; // Mute icon
        } else {
            return <Fa name="microphone" style={{
                marginHorizontal: 20,
                fontSize: 25
            }} />; // Unmute icon
        }
    }

    const HangupSinglecall = async (liveid) => {
        const hangup = `${baseurl}singlepartyend?liveid=${liveid}`;
        console.log(hangup, 'Hangup call ');
        try {
            const hangupresponse = await fetch(hangup);
            console.log(hangupresponse, '----response');
            const hangupresult = hangupresponse;
            console.log(hangupresult, '----result')
            const json_obj = JSON.parse(JSON.stringify(hangupresult));
            console.log(json_obj, 'Call has been Hanged up');

        } catch {
            Alert.alert('sorry,something went wrong!!!')
            console.error(error);
        }
    }

    //mute and unmute user
    const muteuser = async (groupid, userno, muteflag) => {
        try {
            //${baseurl}mutestatus?gid=5&Userno=1&MUTE=mute
            const muteurl = `${baseurl}mutestatus?gid=${groupid}&Userno=${userno}&MUTE=${muteflag == 1 ? 'unmute' : 'mute'}`;
            console.log(muteurl, "mute url");
            const response = await fetch(muteurl);
            const usersjson = await response.json();
            const jsonres = JSON.parse(JSON.stringify(usersjson));
            //const getmutestatus = groupmembersoncall.filter(item => item.mute_flag == 1);
           //mutestatus = getmutestatus.mute_flag == 1;
            //setMutestatus(mutestatus);
            //console.log(getmutestatus, 'GET MUTE');
        } catch (error) {
            console.log(error);
        }
    }


const filteredData = masterdata.length >0 ? masterdata.filter(eachItem=>eachItem.contact_display_name.toLowerCase().includes(search.toLowerCase()) ||
    eachItem.phone_number.includes(search)
    
    ):[];
    

    //if flatlist gets empty
    const EmptyListMessage = ({ item }) => {
        return (
            // Flat List Item
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../Assets/Emptyboard.jpg')} style={{
                    width: 300,
                    height: 300
                }} />
                <View style={{ marginTop: 20 }}><Text style={{ color: "#000", fontWeight: "bold", fontSize: 22 }}>Empty Dashboard</Text></View>
                <View style={{ width: "40%", marginTop: 6, }}>
                    {/* <Button
                      title="Live Board"
                      onPress={() => {
                        props.navigation.navigate('Initialcallscreens',{
                          groupId: groupID,
                          groupName: groupName,
                          userid : userId,
                          usermobilenumber : Usermob,
                        })
                      }}
                      style={styles.livedashboardbtn}
                  /> */}

                </View>
            </View>
        );
    };
    const vibrate = () => {
        Vibration.vibrate(100);
    }
    //search 
    const handleSearch = (text) => {
        setSearch(text);
      };


    // const searchFilter = (text) => {
    //         const newData = masterdata.filter((item) => {
    //             const itemData = item.contact_display_name ? item.contact_display_name.toUpperCase() : ''.toUpperCase();
    //             const textData = text.toUpperCase();
    //             return itemData.indexOf(textData) > -1;
    //         });
    //         setMasterdata(newData);
    //         setSearch(text);
    // }
    return (
        <View >
            <View>
                <View>
                    <View >
                        <SearchBar
                            placeholder="Search here..."
                            shadowColor="#282828"
                            iconColor="#fff"
                            cancelIconColor="#fff"
                            value={search}
                            onChangeText={(text) => handleSearch(text)}
                            onClearPress={() => setSearch("")}
                            style={styles.searchbar}
                            // onPress={() => alert("onPress")}          
                            
                        />
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20 }}>
                    {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#192a53" /></View>)
                        :
                        (
                            <FlatList
                                data={filteredData}
                                refreshing={loading}
                                ListEmptyComponent={EmptyListMessage}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{
                                            flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginBottom: 10, borderBottomColor: "grey", borderBottomWidth: 0.3, paddingBottom: 10

                                        }}>
                                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                                {/* <Image
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 20,

                                                    }}
                                                    //, borderColor:"steelblue" , borderWidth:1
                                                    source={require('../../../Assets/avatar.png')}
                                                /> */}
                                                {(Usermob != item.phone_number)?(<Mc name="face-man-profile" style={{ fontSize: 50, color: "grey"}} />):(<Mc name="face-man-profile" style={{ fontSize: 50, color: "grey", borderColor:"grey" , borderWidth:0.5 }} />)}
                                                <View style={{ marginHorizontal: 10 }}>
                                                    <Text style={{ color: "grey", fontSize: 10, fontWeight: "500" }}>{item.contact_display_name?.slice(0, 15)}</Text>
                                                    <Text style={{ fontWeight: "300", fontSize: 12, color: "#000" }}>{item.phone_number}</Text>
                                                    <Text style={{ fontWeight: "500", color: "green", fontSize: 10 }}>{item.status}</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: "row" }}>
                                                
                                                     {/* (Usermob !== item.phone_number || userId !== item.user_id ) ? ( */}
                                                        <>
                                                            <TouchableOpacity
                                                                onPress={async () => {
                                                                    await HangupSinglecall(item.live_id);
                                                                }}
                                                                style={{ marginRight: 10 }}
                                                            >
                                                                {/* <Mc name="phone-hangup" style={{ fontSize: 33, color: "red" }} /> */}
                                                                <Simpleicon name="call-end" style={{ fontSize: 25, color: "red" }} />
                                                            </TouchableOpacity>

                                                            <TouchableOpacity
                                                                onPress={async () => {
                                                                   //await mutetogglestate();
                                                                    muteuser(item.group_id, item.party_number, item.mute_flag);
                                                                }}
                                                            >
                                                                {getMuteIconComponent(item.mute_flag)}
                                                            </TouchableOpacity>
                                                        </>
                                                    {/* // ) : (
                                                    //     <>
                                                    //         <TouchableOpacity
                                                    //             style={{ marginRight: 10 }}
                                                    //         >
                                                    //            <Text>ADMIN</Text>
                                                    //         </TouchableOpacity>
                                                    //         <TouchableOpacity
                                                    //         >
                                                    //             <Mi name="admin-panel-settings" style={{ fontSize: 22, color: "black" }} />
                                                    //         </TouchableOpacity>
                                                    //     </>
                                                    // ) */}
                                                
                                            </View>
                                        </View>
                                    );
                                }
                                }
                            />
                        )
                    }
                </View>
            </View>
        </View>
    )
}

export default Groupmembers;

const styles = StyleSheet.create({
    livedashboardbtn: {
        backgroundColor: '#192a53',
        borderRadius: 10,
        padding: 10,
    },
    searchbar: {
         color: "#000",
        // //paddingLeft: 20,
        // fontSize: 22,
         borderColor: "grey",
         borderWidth: 0.7,
        // borderRadius: 28,
        // backgroundColor: "#fff"
        width:'100%',

    },
});
