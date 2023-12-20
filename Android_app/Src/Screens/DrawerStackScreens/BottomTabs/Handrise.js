import { StyleSheet, Text, View, TouchableOpacity,TextInput, ActivityIndicator, FlatList, Image , Vibration} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons';
import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from "react-native-dynamic-search-bar";


import Fa from 'react-native-vector-icons/FontAwesome';
//blink
import Blink from '../../../Components/Blink';
import { MyContext } from '../../../Context/Severcontext';
const Handrise = (props) => {
    
     const Handriselists = props.groupcallers;
     const {baseurl} = useContext(MyContext);
    // console.log(Handriselists, 'HANDRISELISTS COMING FROM LIVE MAIN SCREEN');
    const handrisecount = props.oncallercount;
    const [loading, setLoading] = useState(false);
    //   const [countofrise ,  setcountofrise] = useState(0);
    const [handriselist, setHandriselist] = useState([]);
    const [risecount ,  setHandrisecount] = useState(0);
    const [mutetoggle, setMutetoggle] = useState(true);
    const [mutestatus, setMutestatus] = useState('');
    const [search, setSearch] = useState('');
     //mute toggle
     const mutetogglestate = async () => {

        setMutetoggle(!mutetoggle); //it will send mute satus by on press
    }
    useEffect(() => {
        setHandrisecount(0);
        risefilters();
    }, [Handriselists]);
 
    const risefilters = () => {
        const Handrisings = props.groupcallers;
        const Filterhandriselists = Handrisings.filter(item=>item.hand_raise_flag == 1 && item.status != 'DISCONNECTED');
        setHandriselist(Filterhandriselists);
        const getcount = handriselist.length;
        setHandrisecount(getcount);
        setLoading(false)
    }
   //mute and unmute user
   const muteuser = async (groupid, userno) => {
    try {
        //${baseurl}mutestatus?gid=5&Userno=1&MUTE=mute
        const muteurl = `${baseurl}mutestatus?gid=${groupid}&Userno=${userno}&MUTE=unmute`;
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
//vibration
const vibrate = () => {
    Vibration.vibrate(100);
}


const handleSearch = (text) => {
    setSearch(text);
  };

  const filteredData = handriselist.length >0 ? handriselist.filter(eachItem=>eachItem.contact_display_name.toLowerCase().includes(search.toLowerCase()) ||
    eachItem.phone_number.includes(search)
    
    ):[];


    return (
        <View >
            <View>
            <View>
                    <View>
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
                <View style={{ marginTop: 20, marginLeft: 40 }}><Text style={{color:"#000"}}>{risecount} callers  on queue for Voice</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20 }}>
                    {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#192a53" /></View>)
                        :
                        (
                            <FlatList
                                data={filteredData}
                                refreshing={loading}
                                onRefresh={() => {risefilters()}}
                                keyExtractor={(item) => item.live_id}
                                renderItem={({item})=>{
                                    return (
                                        <TouchableOpacity>
                                        <View style={{
                                            flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 10,borderBottomColor:"grey",borderBottomWidth:0.3,paddingBottom:10
                                        }}>
                                            {/* <Image
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 20,

                                                }}
                                                source={require('../../../Assets/avatar.png')}
                                            /> */}
                                             <Mc name="face-man-profile" style={{fontSize:50,color:"grey"}} />
                                            <View style={{ marginHorizontal: 30 }}>
                                                <Text style={{color:"#000",fontSize:8,fontWeight:"500"}}>{item.contact_display_name?.slice(0,15)}</Text>
                                                <Text style={{ fontWeight: "500", color: "#000" }}>{item.phone_number}</Text>
                                            </View>
                                    
                                            <View>
                                                <TouchableOpacity
                                                    onPress={async() => {
                                                        try{
                                                            await  mutetogglestate();
                                                            muteuser(item.group_id, item.party_number);
                                                            vibrate(); 
                                                        }catch(error){
                                                            console.log(error);
                                                        }
                                                        }}
                                                >
                                                  {/* <Ionic name="hand-right-outline" style={{fontSize:22}}  /> */}
                                                  <Fa name="microphone-slash" style={{fontSize:30}} />
                                                  
                                                </TouchableOpacity>
                                            </View>
                                
                                        </View>
                                    </TouchableOpacity>
                                    )
                                }}

                            />
                           
                        )
                    }


                </View>
            </View>
        </View>
    )
}

export default Handrise

const styles = StyleSheet.create({

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
})