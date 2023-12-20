
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
  RefreshControl, SafeAreaView, ScrollView, Alert, Pressable,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
  Linking
} from "react-native";
import React, { useState, useEffect, useContext,useCallback } from "react";
import SearchBar from "react-native-dynamic-search-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FloatingButtons from "./FloatingButtons";
import FontAwesome from 'react-native-vector-icons/FontAwesome'; //exporting through expo/vector-icons
import Antdesign from 'react-native-vector-icons/AntDesign';
import { MyContext } from "../../Context/Severcontext";
import { disabled } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";

// import CallInitialisingScreens from "./CallInitialisingScreens";
/////Dimensions//////
const windowWidth = Dimensions.get('window').width;
//refresh controller


const DrawerHome = (props) => {
const userIdnumber = props.useridNumber;
const {baseurl} = useContext(MyContext);
  const [data, setData] = useState([]);
 // console.log(data, "dataaaaaaaaaaaaaaa");

  const [filterdata , setFilterdata] = useState([]);
 // console.log(filterdata, "filtereeeee");
  const [search , setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  //recharge
  
  const [mutestatus, unmuteSetStatus] = useState(0);
  const [makecallstatus, setMakecallstatus] = useState(0);

  const [modelgroupid, setModelgroupid] = useState('');
  const [modelconfid , setModelconfid] = useState('');
  const [modelgroupname, setModelgroupname] = useState('');
  const [modeluserid , setModeluserid] = useState('');
  //count of members
  const [countmem , setCount] = useState(0);

  const [sortedData, setSortedData] = useState([]); //for used sorting a to z 

  //const [confUniqueid, setconfUniqueid] = useState("");
   //console.log(confUniqueid, "conf uid");
  




  //userinfo
  const [mobilenumber, setGetMobilenumber] = useState('');
  const [userid, setUserid] = useState('');
  //modal
  const [modalVisible, setModalVisible] = useState(false);
  //filter
  //show modal
  const [action, setAction] = useState('');
  const [useridnumber , setUseridnumber] = useState('');  //taking userid number form groups
  
  useEffect(() => {
    (async () => {
      try {
      //  await  _storeuserid();
        const usermobilenumber = await AsyncStorage.getItem('userMobileNumber');
        setGetMobilenumber(usermobilenumber);
        const userid = await AsyncStorage.getItem('USERID');
        setUserid(userid);
        fetchdata();
        // getcountofmembers();  //it will call count of members in group
      }
      catch (error) {
        console.log(error);
      }

    })();
  }, [data]);


  const fetchdata = async () => {
    let mobilenumber = await AsyncStorage.getItem('userMobileNumber');
    const url = `${baseurl}viewusergroups?mobile=${mobilenumber}`;
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      const usersmessage = jsonres.messages;
      const usersresult = usersmessage.success;
      // console.log(usersresult , 'USERRESULT');
      const getuserid = usersresult.map(el=>el.user_id);
      setUseridnumber(getuserid[0]);
      setData(usersresult); //masterdata
      setFilterdata(usersresult); //filterdata
      const sortdata = filterdata.map(({group_name}) => group_name);
      setLoading(false)
      // console.log(useridnumber , 'USER ID NUMBER IN STATE MODE');
    } catch (error) {
      console.log(error);
    }
  };

  //sorting
  const sortbygroupname = () => {
    const numAscending = filteredData.sort((a, b) => a.group_name.localeCompare(b.group_name));
    // console.log(numAscending , 'numeric-----------------........');
    // tempList = filterdata.sort((a, b) => {
    //   a > b ? 1 : -1
    // }
    // );
    setFilterdata(numAscending);
    setModalVisible(!modalVisible)
  }
  const sortbyrecentcreate = () => {
    const numAscending = filterdata.sort((a, b) => a.created_on.localeCompare(b.created_on));
    // console.log(numAscending , 'numeric-----------------........');
    setFilterdata(numAscending);
    setModalVisible(!modalVisible)
  }
  const sortbygroupnamedesc = () => {
    const numAscending = filteredData.sort((a, b) => b.group_name.localeCompare(a.group_name));
    // console.log(numAscending , 'numeric-----------------........');
    // tempList = filterdata.sort((a, b) => {
    //   a > b ? 1 : -1
    // }
    // );
    setFilterdata(numAscending);
    setModalVisible(!modalVisible)
  }
  //go to initial screens
  const goIinitialMutecall = async () => {
    let getgroupid = await AsyncStorage.getItem('@GROUP_ID');
    props.navigation.navigate('Initialcallscreens', {
      Getgroupcallid: getgroupid,
    });
    setModalVisible(!modalVisible);
  }
  const goInitialmakecalllivescreeen = async (groupId, groupName , userId , confid, confUniqueid) => {
    props.navigation.navigate('Initialcallscreens', {
      groupId: groupId,
      groupName: groupName,
      userid : userId,
      usermobilenumber : mobilenumber,
      confidnumber : confid,
      confUniqueid: confUniqueid

    });
    setModalVisible(!modalVisible);
  }


  //get days for recharge validation
  const checkdaysforrecharge = (edate) => {
    var fdate = '2023-03-01 13:17:30';
    const diffTime = Math.abs(fdate - edate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffTime + " milliseconds");
    // console.log(diffDays + " days");
  }

  //get status
  const checkmutestatus = () => {
    unmuteSetStatus('YES');
    // console.log(mutestatus, 'MUTE CALL STATUS')
  }

  const checkmakecallstatus = () => {
    setMakecallstatus(0)
    // console.log(makecallstatus, 'Make  CALL STATUS')
  }

  //groupcall
  const Makecall = async (getgroupid , modeluserid , modelconfid) => {
    try {
      $dispalyname=["srinivas" , "shiva"];
      let modelmobileusermobile = await AsyncStorage.getItem('userMobileNumber');
      // ${baseurl}groupcall?group_id=8&user_id=1&usermobile=9848851443&name=contactname&mute=0&handrise=0 if mute = 1 , then it goes to a mute call else unmute call
      const url = `${baseurl}groupcall?group_id=${getgroupid}&user_id=${modeluserid}&usermobile=${modelmobileusermobile}&mute=0&handrise=0&conf_id=${modelconfid}&isadmininclude=""`;
    
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres =  JSON.parse(JSON.stringify(usersjson));
      // console.log(jsonres, "json respone.......................");
      
      const getConfUniqueid =  jsonres.messages.success.conf_unique_id;
   return getConfUniqueid;
      //setconfUniqueid(getConfUniqueid);
    
    } catch (error) {
      Alert.alert('sorry,something went wrong!!!')
      console.error(error);
    }
  }

  //Mute call
  //Mute call (if call to be muted)
  const Mutecall = async (getgroupid , modeluserid) => {
    let modelmobileusermobile = await AsyncStorage.getItem('userMobileNumber');
    //${baseurl}groupcall?group_id=${getgroupid}&user_id=${modeluserid}&usermobile=${modelmobileusermobile}&name=contactname&mute=&handrise=0
    const url = `${baseurl}groupcall?group_id=${getgroupid}&user_id=${modeluserid}&usermobile=${modelmobileusermobile}&mute=1&ismute=1&handrise=0&conf_id=${modelconfid}&isadmininclude="`;
    
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres =  JSON.parse(JSON.stringify(usersjson));
      // console.log(jsonres, "json respone.......................");
      
      const getConfUniqueId =  jsonres.messages.success.conf_unique_id;
   return getConfUniqueId;
     // setconfUniqueid(getConfUniqueId);
    }catch(error) {
      Alert.alert('sorry,something went wrong!!!')
      console.error(error);
    }
  }

  const EmptyListMessage = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
        <View><Text style={{ fontSize: 22, color: "#192a53", fontWeight: "500" }}>Welcome To ConvoxMeet</Text></View>
        <Image source={require('../../Assets/Emptyboard.jpg')} style={styles.imagesize} />
        <View><Text style={{ fontSize: 22, color: "#192a53", fontWeight: "500" }}>Your Board is Empty</Text></View>
        <View><Text style={{
          fontSize: 16, color: "#000", fontWeight: "300", textAlign: 'center', width: windowWidth - 10,
          justifyContent: 'center',
          alignItems: 'center', marginTop: 10,
        }}>Create a Group and Schedule Your Conference Call Now.</Text></View>
      </View>
    );
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  //search filter
  const searchFilter = (text) => {
    if(text != ''){
        const newData = data.filter((item)=>{
            const itemData = item.group_name ? item.group_name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setFilterdata(newData);
        setSearch(text);
    }else{
      setFilterdata(data);
        setSearch(text);
    }
}
//get count of members 
// const getcountofmembers = async(getgroupid) => {
//   try{
//     let modelmobileusermobile = await AsyncStorage.getItem('userMobileNumber');
//     const count = `${baseurl}viewgroupM?phone=${modelmobileusermobile}&gid=6`
//     console.log(count , 'count of members API');
//     const response = await fetch(count);
//     const usersjson = await response.json();
//     const jsonres = JSON.parse(JSON.stringify(usersjson));
//     const usersresult = jsonres.messages.success;
//     const get_con_len = Object.keys(usersresult).length;
//     console.log(get_con_len , 'Get couint of lenght ----------------');
//     setCount(get_con_len);
//     console.log(countmem  , 'count-=------------------');
//   }catch(error){
//     console.log(error);
//   }
// }
const handleSearch = (text) => {
  setSearch(text);
};

const filteredData = data.length >0 ? data.filter(eachItem=>eachItem.group_name.toLowerCase().includes(search.toLowerCase())
  
  ):[];



 const handleSortingAtoZ = () => {
  // Alert.alert("se");

  const sortedDataCopy = [...data];
  const sortedDataResult = sortedDataCopy.sort((a, b) => {
    if (a.group_name < b.group_name) {
      return -1;
    }
    if (a.group_name > b.group_name) {
      return 1;
    }
    return 0;
  });
  setSortedData(sortedDataResult);
 };


 const handleSortingZtoA=()=>{

    const sortedDataCopy = [...data];
    const sortedDataResult = sortedDataCopy.sort((a, b) => {
      if (a.group_name < b.group_name) {
        return 1;
      }
      if (a.group_name > b.group_name) {
        return -1;
      }
      return 0;
    });
    setSortedData(sortedDataResult);
  };


  const recentlyCreated=()=>{
    const sortedDataCopy = [...data];
    const sortedDataResult = sortedDataCopy.sort((a, b) => {
      if (a.created_on < b.created_on) {
        return 1;
      }
      if (a.created_on > b.created_on) {
        return -1;
      }
      return 0;
    });
    setSortedData(sortedDataResult);



  }


 
  return (
    <>
      {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#192a53" /></View>)
        :
        (
          <View style={[styles.container, { flexDirection: "column" }]}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >

            <View style={styles.drawerhomeheader}>
              <View style={styles.drawerhometop}>
                <View style={{ flexDirection: "row" }}>
                  <FontAwesome
                    name="sliders"
                    color="#fff"
                    size={30}
                    style={{ marginHorizontal: 10 }}
                    onPress={() => {
                      props.navigation.toggleDrawer();
                    }}

                  />
                </View>
                <View  >
                  <SearchBar
                    placeholder="Search here..."
                    shadowColor="#282828"
                    iconColor="#fff"
                    cancelIconColor="#fff"
                    value={search}
                    onChangeText={(text) => handleSearch(text)}
                    onClearPress={() => setSearch("")}
                    // onPress={() => alert("onPress")}          
                    
                  />
                </View>
                <View
                >
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setAction('ACTION_F');
                    }}
                  >
                    <Antdesign
                      name="filter"
                      color="#fff"
                      size={30}
                      style={{ marginRight: 10 }}

                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 12,
                    width: windowWidth - 10,
                    textAlign: 'center'

                  }}
                >
                  Experience the 5 days of free trial ,
                  Further Lets
                  <TouchableOpacity
                    onPress={() => { props.navigation.navigate('Recharge') }}
                  ><Text style={styles.register}>Recharge Here
                  </Text></TouchableOpacity>
                </Text>
              </View>
            </View>
            <View style={styles.drawerhomefooter}>
              <FlatList
                 data={search.length > 0 ? filteredData : sortedData.length > 0 ? sortedData : filterdata}
                ListEmptyComponent={EmptyListMessage}
                keyExtractor={(item) => item.group_id}
                onRefresh={() => { fetchdata() }}
                refreshing={loading}
                renderItem={({ item }) => {
                    return (
                      <View >
                        <View style={styles.userslistbox}
                        >
                          <TouchableOpacity onPress={
                            () => {
                              props.navigation.navigate('ViewGroups', {
                                getgroupid: item.group_id,
                                getgroupname: item.group_name,
                                getcreatedate: item.updated_on,
                                getUsreid : userIdnumber,
                                 UserMobileNumber: mobilenumber,
                              });

                            }
                          }>

                            <View style={{ flexDirection: "row" }}>
                              <View >
                                <FontAwesome
                                  name="group"
                                  color="grey"
                                  size={30}
                                  style={{ marginRight: 10 }}
                                />
                              </View>
                              <View style={{ flexDirection: "column" }}>
                                <Text style={{ fontWeight: "bold", color: "#000" }}>{item.group_name}</Text>
                                <Text style={{ fontSize: 12, color: "#000" }}>
                                  Created on {item.created_on}.
                                </Text>
                                {/* <Text style={{ fontSize: 12, color: "#000" }}>
                                   {} Members.
                                </Text> */}

                              </View>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => {
                            setModelgroupid(item.group_id);
                            setModeluserid(item.user_id);
                            setModelgroupname(item.group_name)
                            setModalVisible(!modalVisible);
                            setModelconfid(item.cm_unique_id)
                            setAction('ACTION_M');
                            // Makecall();
                          }}>
                            <View>
                              <Image
                                style={{ width: 30, height: 30 }}
                                source={require('../../Assets/call.png')}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>

                    )
                  }
                }
              />
            </View>
            <FloatingButtons style={{ bottom: 80 }} {...props} userid={useridnumber}/>
          </View>
        )
      }
      {/* //modal for group call */}

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
          action === 'ACTION_M' ? (
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalheading}>Start Convoxmeet Talk?</Text>
                {/* <Text style={styles.modalText}>ConvoxMeet.</Text> */}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={async () => {
                    // checkmutestatus();
              await Mutecall(modelgroupid , modeluserid , modelconfid);
                    //  goIinitialMutecall()
                    goInitialmakecalllivescreeen(modelgroupid, modelgroupname , modeluserid , modelconfid);
                  }}
                >
                  <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 12 }}>
                    <Text style={{ fontWeight: "500", color: "#000" }}>Mute a Call</Text>
                  </View>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={async () => {
                    // checkmakecallstatus();
                    const   confUniqueid = await Makecall(modelgroupid , modeluserid  , modelconfid );
                    goInitialmakecalllivescreeen(modelgroupid, modelgroupname , modeluserid , modelconfid, confUniqueid);
                  }}
                >
                  <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 12 }}>
                    <Text style={{ fontWeight: "500", color: "#000" }}>Make a Call</Text>
                  </View>
                </Pressable>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <View style={{ backgroundColor: "#192a53", padding: 12, borderRadius: 12 }}>
                    <Text style={{ color: "#fff" }}>Close</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : null

        }
        {
          action === 'ACTION_F' ? (
            <View style={styles.centeredView}>
              <View style={styles.filterviewlist}>
                <Pressable
                  onPress={() => {
                    sortbygroupname();
                  }}
                >
                  <View >
                    <Text onPress={handleSortingAtoZ} style={styles.filterlist}>A to Z</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    sortbygroupnamedesc();
                  }}
                >
                  <View >
                    <Text onPress={handleSortingZtoA} style={styles.filterlist}>Z to A</Text>
                  </View>
                </Pressable>
                {/* <Pressable
                  onPress={() => {
                    sortbygroupname();
                  }}
                >
                  <View >
                    <Text style={styles.filterlist}>Upcoming Calls</Text>
                  </View>
                </Pressable> */}
                <Pressable
                  onPress={() => {
                    sortbygroupname();
                  }}
                >
                  <View >
                    <Text onPress={recentlyCreated} style={styles.filterlist}>Recently Created</Text>
                  </View>
                </Pressable>
                {/* <Pressable
                  onPress={() => {
                    sortbyrecentcreate();
                  }}
                >
                  <View >
                    <Text style={styles.filterlist}>Recent Calls</Text>
                  </View>
                </Pressable> */}
                <Pressable
                  onPress={() => {
                    sortbygroupname();
                  }}
                >
                  {/* <View >
                    <Text style={styles.filterlist}>Maximum Members</Text>
                  </View> */}
                </Pressable>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <View style={{ backgroundColor: "#192a53", padding: 12, borderRadius: 12 }}>
                    <Text style={{ color: "#fff" }}>Close</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : null
        }
      </Modal>
    </>


  );
};

export default DrawerHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#192a53",
  },
  drawerhomeheader: {
    flex: 1,
    flexDirection: "column",
  },
  imagesize: {
    width: 300,
    height: 300
  },
  drawerhomefooter: {
    flex: 4,
    backgroundColor: "#fff",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  drawerhometop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  logocss: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
    marginHorizontal: 20,
  },
  register: {
    fontSize: 18,
    fontWeight: "bold",
    color: "steelblue",
    borderBottomWidth: 1,
    borderColor: "#fff"
  },
  drawerboardusersimage: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    opacity: 0.5,

  },
  userslistbox: {
    margin: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  searchbar: {
    height: 30,
    borderWidth: 1,
    borderColor: "#fff",
    width: 200,
    borderRadius: 12,
    paddingLeft: 12,
    backgroundColor: "#fff",
   
  },
  //modal
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
  },
  modalView: {
    margin: 20,
    backgroundColor: "#192a53",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
    fontSize: 18,
    color: "#fff",

  },
  modalheading: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 10,
    color: "#fff",

  },
  tandc: {
    color: "#fff",
    marginBottom: 5,
    textAlign: "auto"
  },
  //toggle
  togglebtnsize: {
    flexDirection: "row", justifyContent: "space-around", width: "60%"
  },
  imagesize: {
    width: 300,
    height: 300
  },
  //filter modal
  filterlist: {
    fontWeight: "300",
    color: "#000",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 5
  },
  filterviewlist: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
 


});
