import { StyleSheet, Text, View ,TextInput, TouchableOpacity , ActivityIndicator , FlatList , Image, Alert,Vibration } from 'react-native'
import React ,  { useContext, useEffect  , useState}   from 'react'
import SearchBar from "react-native-dynamic-search-bar";

import Fa from 'react-native-vector-icons/FontAwesome';
import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
import { MyContext } from '../../../Context/Severcontext';
const MuteScreen = (props) => {
    const Muterecords = props.groupcallers;
    const {baseurl} = useContext(MyContext);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState([]);
    const [mutecount ,  setMutecount] = useState(0);
    const [mutestatus, setMutestatus] = useState('');
    console.log(Muterecords , 'Groupstatus-----------hellll--------');
    const [search, setSearch] = useState('');
  //mute toggle
//   const [mutetoggle , setMutetoggle] = useState(muted);
  const [mutetoggle, setMutetoggle] = useState(false);
    useEffect(() => {
        setMutecount(0)
        mutefilters();
    }, [Muterecords]);

    const mutefilters = () => {
        const Muterecords = props.groupcallers; 
        const Filtermutelists = Muterecords.filter(item=>item.mute_flag == 1 && item.status != 'DISCONNECTED');
        setMuted(Filtermutelists);
        const getcount = muted.length;
        setMutecount(getcount);
        setLoading(false)
    }
       //mute toggle
       const mutetogglestate = async() => {

        setMutetoggle(!mutetoggle); //it will send mute satus by on press
    }

    const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

//mute and unmute user
const muteuser = async (groupid, userno) => {
    try {
        // Alert.alert(groupid);
        //${baseurl}mutestatus?gid=${groupid}&Userno=${userno}&MUTE=${mutetoggle ? 'mute' : 'unmute'}
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

const searchFilter = (text) => {
    const newData = muted.filter((item) => {
        const itemData = item.contact_display_name ? item.contact_display_name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
    });
    setMuted(newData);
    setSearch(text);
}

const handleSearch = (text) => {
    setSearch(text);
  };

  const filteredData = muted.length >0 ? muted.filter(eachItem=>eachItem.contact_display_name.toLowerCase().includes(search.toLowerCase()) ||
    eachItem.phone_number.includes(search)
    
    ):[];



  return (
    <View >
    <View>
   
    <View>
                    <View style={{ width: "100%" }}>
                    <SearchBar
                    placeholder="Search here..."
                    shadowColor="#282828"
                    iconColor="#fff"
                    cancelIconColor="#fff"
                    value={search}
                    onChangeText={(text) => handleSearch(text)}
                    onClearPress={() => setSearch("")}
                    // onPress={() => alert("onPress")}  
 		            style={styles.searchbar}        
                    
                  />
                    </View>
    </View>
    <View style={{marginTop:20 , marginLeft:40}}><Text style={{color:"#000"}}>{mutecount} Callers are on Mute Now</Text></View>
        
        <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20 }}>
            {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#192a53" /></View>)
                :
                (
                   
                    <FlatList
                        data={filteredData}
                        refreshing={loading}
                        onRefresh={() => { mutefilters()}}
                        keyExtractor={(item) => item.live_id}
                        renderItem={({item}) => {
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
                                               <Fa name="microphone-slash" style={{fontSize:30}} />
                                                  
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

export default MuteScreen

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