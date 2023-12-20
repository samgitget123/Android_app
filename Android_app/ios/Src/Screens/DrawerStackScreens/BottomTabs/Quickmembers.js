import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CallsContext } from '../../../Context/CallsContext';
import Fa from 'react-native-vector-icons/FontAwesome';
import Simpleicon from 'react-native-vector-icons/SimpleLineIcons';
import { MyContext } from '../../../Context/Severcontext';
import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
const Quickmembers = (props) => {
    const Quickmemlist = props.quickcalls;
    const count = props.onCallercount
    const { baseurl } = useContext(MyContext);
    const [usercount, setUserCount] = useState(0);
    const [groupname, setGroupname] = useState('');
    const [loading, setLoading] = useState(false);
    const [mutetoggle, setMutetoggle] = useState(true);
    const [mutestatus, setMutestatus] = useState('');

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
    //mute
    const mutetogglestate = () => {

        setMutetoggle(!mutetoggle); //it will send mute satus by on press
    }
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

    //${baseurl}mutequickcallstatus?uid=3&Userno=1&MUTE=mute
    const muteuser = async (userid, userno) => {
        try {
            //${baseurl}mutestatus?gid=5&Userno=1&MUTE=mute
            const muteurl = `${baseurl}mutequickcallstatus?uid=${userid}&Userno=${userno}&MUTE=${mutetoggle ? 'mute' : 'unmute'}`;
            console.log(muteurl, 'MUTEURL');
            const muteresponse = await fetch(muteurl);
            const json_obj = JSON.parse(JSON.stringify(muteresponse));
            console.log(json_obj, 'JSON OBJECT OF MUTE STATUS');
            const getmutestatus = groupmembersoncall.filter(item => item.mute_flag == 1);
            mutestatus = getmutestatus.mute_flag == 1;
            setMutestatus(mutestatus);
            console.log(getmutestatus, 'GET MUTE');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View >
            <View>
                <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20 }}>

                    {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#192a53" /></View>)
                        :
                        (
                            <FlatList
                                data={Quickmemlist}
                                refreshing={loading}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity>
                                            <View style={{
                                                flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginBottom: 10, borderBottomColor: "grey", borderBottomWidth: 0.3, paddingBottom: 10

                                            }}>
                                                {/* <Image
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 20,

                                                    }}
                                                    source={require('../../../Assets/avatar.png')}
                                                /> */}
                                                <View style={{flexDirection:"row" , justifyContent:"center"}}>
                                                <Mc name="face-man-profile" style={{ fontSize: 50, color: "grey" }} />
                                                <View style={{ marginHorizontal: 20 }}>
                                                    <Text style={{ color: "grey", fontSize: 10, fontWeight: "500" }}>{item.contact_display_name?.slice(0, 15)}</Text>
                                                    <Text style={{ fontWeight: "300", color: "#000" }}>{item.phone_number}</Text>
                                                    <Text style={{ fontWeight: "500", color: "green", fontSize: 10 }}>{item.status}</Text>
                                                </View>
                                                </View>
                                                        {/* <View>
                                                                        <TouchableOpacity
                                                                    onPress={async() => {
                                                                        mutetogglestate();
                                                                        muteuser(item.user_id , item.party_number);
                                                                    }}
                                                                >
                                                                    {getMuteIconComponent(item.mute_flag)}
                                                                </TouchableOpacity>
                                                                    </View> */}
                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            HangupSinglecall(item.live_id);
                                                        }}
                                                    >
                                                        {/* <Image
                                                            source={require('../../../Assets/hangup.png')}
                                                            style={{ width: 40, height: 40, borderRadius: 20 }}
                                                        /> */}
                                                        <Simpleicon name="call-end" style={{ fontSize: 22, color: "red" }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
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

export default Quickmembers