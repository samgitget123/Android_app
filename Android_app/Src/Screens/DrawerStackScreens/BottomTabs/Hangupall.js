import { StyleSheet, Text, View ,TextInput, TouchableOpacity , ActivityIndicator , FlatList , Image, Alert } from 'react-native'
import React ,  { useContext, useEffect  , useState}   from 'react'
import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
import { MyContext } from '../../../Context/Severcontext';
import SearchBar from "react-native-dynamic-search-bar";


const Hangupall = (props) => {
    const Disconnectcallers = props.groupcallers;
    const groupidnum = props.Groupid;
    const userid = props.Userid;
    const usermobile = props.UserMobilenumber;
    const {baseurl} = useContext(MyContext);
    const [loading, setLoading] = useState(true);
    const [hangupLists, setHangupLists] = useState([]);
    const [search, setSearch] = useState('');
    const [hangupcount , sethangupcount] = useState(0);
    useEffect(() => {
        sethangupcount(0);
        hangupfilters();
    }, [Disconnectcallers]);
    const hangupfilters=()=>{
        const Disconnectcallers = props.groupcallers;
        const Filterhanguplists = Disconnectcallers.filter(item=>item.status == "DISCONNECTED");
        setHangupLists(Filterhanguplists);
        const getcount = hangupLists.length;
        sethangupcount(getcount)
        console.log(getcount , 'GET COUNT OF HANGUPS');
        setLoading(false);
    }


    //redial
    const Readdial = async(number , name , liveid, confid)=>{
        //${baseurl}addintoconf?gid=${groupId}&user_id=${userid}&usermobile=${usermobilenumber}&contactnumber=${currentnum}&name=Joined&mute=0&handrise=0
        //${baseurl}redial?gid=9&user_id=5&usermobile=9848851443&contactnumber=9490592156&name=Redial&mute=0&handrise=0
        const redial = `${baseurl}redial?gid=${groupidnum}&user_id=${userid}&usermobile=${usermobile}&contactnumber=${number}&name=${name}&lid=${liveid}&mute=0&handrise=0&conf_id=${confid}&isadmininclude=`;

        //const url = `${baseurl}/redial?gid=${gId}&user_id=${uId}&usermobile=${myValue.userMobile}&contactnumber=${phone}&name=${phoneNm}&lid=${livId}&mute=&handrise=0&conf_id=${uniqueId}&isadmininclude=`;
        console.log(redial , 'REDIAL');
        try{
            const response = await fetch(redial);
            console.log(response, '----response---testing url');
            //console.log(response.messages , '--------message');
            const json_obj = JSON.parse(JSON.stringify(response));
            console.log(json_obj , 'JSON OBJ')
        }catch(error){
            console.log(error)
        }
    }
     //redial all
     const Readdialall = async()=>{
        
        const confuniqueid = hangupLists.map((el)=>el.conf_unique_id);
        const uniqueId = [...new Set(confuniqueid)];
        //${baseurl}redialgroup?gid=11&user_id=5&usermobile=9848851443&contactnumber=9490592156&name=Redial&mute=0&handrise=0
        //${baseurl}redial?gid=9&user_id=5&usermobile=9848851443&contactnumber=9490592156&name=Redial&mute=0&handrise=0
         const redialall = `${baseurl}redialgroup?gid=${groupidnum}&user_id=${userid}&usermobile=${usermobile}&name=contactname&mute=0&handrise=0&conf_id=${uniqueId}&isadmininclude=`;
       

         //const url = `${baseurl}/redialgroup?gid=${groupId}&user_id=${myValue.userId}&usermobile=${myValue.userMobile}&name=&mute=1&handrise=0&conf_id=${uniqueId}&isadmininclude=`;
         console.log(redialall , 'REDIAL');
        try{
            const response = await fetch(redialall);
            console.log(response, '----response---testing url');
            //console.log(response.messages , '--------message');
            const json_obj = JSON.parse(JSON.stringify(response));
            console.log(json_obj , 'JSON OBJ')
        }catch(error){
            console.log(error)
        }
      
    }


    const handleSearch = (text) => {
        setSearch(text);
      };
    
      const filteredData = hangupLists.length >0 ? hangupLists.filter(eachItem=>eachItem.contact_display_name.toLowerCase().includes(search.toLowerCase()) ||
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
    <View style={{marginTop:20 ,  display:"flex" , flexDirection:"row" , justifyContent:"space-evenly"}}>
        <Text style={{color:"#000"}}>{hangupcount} Callers were Disconnected</Text>
       { hangupLists.length >1 ?   <View style={{flexDirection:"column"}}>
       <TouchableOpacity onPress={()=>{Readdialall()}}>
            <Mc name="repeat" style={{fontSize:40,color:"red"}} />
            <Text style={{fontSize:10}}>Redial Group</Text>
        </TouchableOpacity>
       </View>:""}
    </View>
        <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20 }}>
            {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#192a53" /></View>)
                :
                (
                    <FlatList
                        data={filteredData}
                        refreshing={loading}
                        onRefresh={() => {hangupfilters()}}
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
                                            <Text style={{color:"grey",fontSize:10,fontWeight:"300"}}>{item.contact_display_name?.slice(0,15)}</Text>
                                            <Text style={{ fontWeight: "500", color: "#000" }}>{item.phone_number}</Text>
                                        </View>
                                        <View >
                                            {/* <TouchableOpacity
                                                onPress={() => {
                                                    // HangupSinglecall(item.live_id);
                                                }}
                                            >
                                                    <Mc name="phone-hangup" style={{fontSize:22}} />
                                            </TouchableOpacity> */}
                                        </View>
                                        <View style={{flexDirection:"column"}}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Readdial(item.phone_number , item.contact_display_name , item.live_id, item.conf_unique_id);
                                                }}
                                            >
                                                   <Mc name="repeat" style={{fontSize:40,color:"red"}} />
                                                        <Text style={{fontSize:10}}>Redial</Text>
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

export default Hangupall

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