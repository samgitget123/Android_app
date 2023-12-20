import { useContext, useEffect, useState } from 'react';
import { PermissionsAndroid, StyleSheet, View, Text, Image, TextInput, Alert, TouchableOpacity , ActivityIndicator } from 'react-native';
import * as Contacts from 'react-native-contacts';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from '../../Context/Severcontext';
import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import SearchBar from "react-native-dynamic-search-bar";


const ContactList = (props) => {
    const groupid = props.groupidnumber;
    const confid = props.confIdnum;
    console.log(groupid , 'group id in contact list');
    const usermob = props.mobilenumber;
    const {baseurl} = useContext(MyContext);
    const [participatenumber, setParticipateNumber] = useState("");
    const [updnumdata, setUpddata] = useState([]);
    const [countofquickcallusers, setcountofquickcallusers] = useState(0);
    const [filterdData, setfilterdData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    

    const [search, setSearch] = useState('');
    /////////////lazy loading//////////
    const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page
  const [isLoading, setIsLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const loadContacts = async () => {
    if (isLoading || allDataLoaded) {
      return;
    }

    setIsLoading(true);

    // Simulate an API call to load more data
    setTimeout(() => {
      const nextPage = page + 1;
      const newData = filterdData.slice(0, nextPage * itemsPerPage);

      if (newData.length === filterdData.length) {
        setAllDataLoaded(true);
      }

      setPage(nextPage);
      setfilterdData(newData);
      setIsLoading(false);
    }, 1000); // Simulate an API call with a delay
  };
    //////////////////////////////////
    //pagination lazy laod contacts
    const [pageNumber, setPageNumber] = useState(1);

    // const [search, setSearch] = useState('');
    const [updateParticipateNumber, setUpdateParticipateNumber] = useState([]);
    //Added group Members
    useEffect(() => {
        (async () => {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: 'Contacts',
                message: 'Convoxmeet would like to view your contacts.',
                buttonPositive: 'Please accept',
            })
                .then((res) => {
                    console.log('Permission: ', res);
                    Contacts.getAll()
                        .then((contacts) => {
                            setfilterdData(contacts) //actual Data
                            setmasterData(contacts);  //filterdata it can be used for serch filter
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                })
                .catch((error) => {
                    console.error('Permission error: ', error);
                });


            //define values
            // const mobilenumber = await AsyncStorage.getItem('userMobileNumber');
            // // setUserLoginMobile(mobilenumber);

            // const Groupid_storedval = await AsyncStorage.getItem('@GROUP_ID');
            //setUserIdValue(Groupid_storedval);
        })();

    }, []);

    // //if flatlist gets empty
    // const EmptyListMessage = ({ item }) => {
    //     return (
    //         // Flat List Item
    //         <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
    //             No Data Found
    //         </Text>
    //     );
    // };


    // const searchFilter = (text) => {
    //     if (text != '') {
    //         const newData = masterData.filter((item) => {
    //             const itemData = item.displayName ? item.displayName.toUpperCase() : ''.toUpperCase();
    //             const textData = text.toUpperCase();
    //             return itemData.indexOf(textData) > -1;
    //         });
    //         setfilterdData(newData);
    //         setSearch(text);
    //     }else {
    //         setfilterdData(masterData);
    //         setSearch(text);
    //     }
       
    // }

    const handleSearch = (text) => {
        setSearch(text);
      };
      
      const filteredData = masterData.length > 0
        ? masterData.filter((eachItem) => 
            eachItem.displayName?.toLowerCase().includes(search.toLowerCase()) || 
          
            eachItem.phoneNumbers[0]?.number?.includes(search) 
          )
        : [];
      
    //Get Added participates
    const getAddedparticipates = async () => {
        const usermobilenumber = await AsyncStorage.getItem('userMobileNumber'); //User Login Mobile number
        const getgroupid = await AsyncStorage.getItem('@GROUP_ID');   //Group_id
        //${baseurl}viewgroupM?phone=7036181279&gid=4
        const url = `${baseurl}viewgroupM?phone=${usermob}&gid=${groupid}`;
        try{
            const response = await fetch(url);
            const updatenum = await response.json();
            const jsonres = JSON.parse(JSON.stringify(updatenum));
            const getupdnum = jsonres.messages.success;
            setUpddata(getupdnum);
            const phoneNumber = updnumdata?.map(function (el) { return el.phone_number; });
            const deleteuserM = phoneNumber;
            const countofnumbers = deleteuserM.length;
            setcountofquickcallusers(countofnumbers);
            // const getphonenumber = getupdnum.map(function (el) { return el.phone_number; });
        }catch(error) {
            console.log(error);
        }
    }

    //Onsubmit Edit Function
    const onEditabledone = async(dialNumber, contactname) => {
        //https://convoxmeet.deepijatel.in/convoxmeet/api/addgroupM?mobile=9848851443&gid=${groupId}&phone=${contactPhone}&name=${contactName}&confid=${confid}&location=${location}&state=${state}&desig=${designation}`;
        //insertnumurl = `${baseurl}addgroupM?mobile=${usermob}&gid=${groupid}&phone=${dialNumber}&name=${contactname}&confid=${confid}`;
        //store dial number in loocal storage
        // try {
        //     await AsyncStorage.setItem("DialerNumber", dialNumber);
        // }catch(error) {
        //     console.log(error);
        // }

        try {
            AsyncStorage.setItem("DialerNumber", dialNumber);
            insertnumurl = `${baseurl}addgroupM?mobile=${usermob}&gid=${groupid}&phone=${dialNumber}&name=${contactname}&confid=${confid}`;
            const response = await fetch(insertnumurl);
            const res = await response.json();
            const obj = JSON.parse(JSON.stringify(res));
            const received_group_id = obj.messages.group_id;
            const received_success = obj.messages.success;
            if (received_success) {
                getAddedparticipates();
                setSearch('');
                setParticipateNumber(dialNumber);
                console.log(participatenumber, 'saved participate number....................');
                let nextId = 1
                updateParticipateNumber.push({
                    id: nextId++,
                    participatenumber: participatenumber
                });
            }

        } catch (error) {
            Alert.alert('sorry,something went wrong!!!')
            console.error(error);
        }
    }

    //delete single member in a group
    const deleteparticipatenumber = async (SingleParticipateNumbers) => {
        const getgroupid = await AsyncStorage.getItem('@GROUP_ID');
        insertnumurl = `${baseurl}deletesingleMgroup?gid=${groupid}&phone=${SingleParticipateNumbers}`;
        console.log(insertnumurl, 'deleted url');
        try {
            const response = await fetch(
                insertnumurl
            );
            const res = await response.json();
            const obj = JSON.parse(JSON.stringify(res));
            const Result = obj.messages.success;
            if (Result) {
                // Alert.alert(Result);
                getAddedparticipates();
            }


        } catch (error) {
            Alert.alert('sorry,something went wrong!!!')
            console.error(error);
        }

    }

    //Delete all group Members
    const deleteallgroupmembers = async () => {
        // Check if usermob is defined and not empty
        if (usermob) {
            // Show a confirmation alert
            Alert.alert(
                'Confirm Delete',
                'Are you sure you want to delete all group members?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel', // This is a cancel button
                    },
                    {
                        text: 'Delete',
                        onPress: async () => {
                            // Perform the deletion when the user confirms
                            insertnumurl = `${baseurl}deletegroupM?gid=${groupid}&usermobile=${usermob}`;
                            console.log(insertnumurl, 'deleted URL');
                            try {
                                const response = await fetch(insertnumurl);
                                const res = await response.json();
                                const obj = JSON.parse(JSON.stringify(res));
                                const Result = obj.messages.success;
                                 getAddedparticipates();
                            } catch (error) {
                                Alert.alert('Sorry, something went wrong!!!');
                                console.error(error);
                            }
                        },
                    },
                ],
                { cancelable: true }
            );
        } else {
            // Handle the case where usermob is not defined or empty
            Alert.alert('Error', 'User mobile number is not defined.');
        }
    }
    
    
    // const deleteallgroupmembers = async () => {
    //     insertnumurl = `${baseurl}deletegroupM?gid=${groupid}&usermobile=${usermob}`;
    //     console.log(insertnumurl, 'deleted url');
    //     try {
    //         const response = await fetch(
    //             insertnumurl
    //         );
    //         const res = await response.json();
    //         const obj = JSON.parse(JSON.stringify(res));
    //         const Result = obj.messages.success;
    //         await getAddedparticipates();
    //     } catch (error) {
    //         Alert.alert('sorry,something went wrong!!!')
    //         console.error(error);
    //     }

    // }
    //load more


      //if flatlist gets empty
  const EmptyListMessage = () => {
    return (
      // Flat List Item
      <View>
      <Text style={{textAlign:"center"}}>No Data found</Text>
      </View>
    );
  };

    return (
        <>
            <View style={{ marginTop: 100 }}>
                <FlatList
                    horizontal
                    data={updnumdata}
                    renderItem={({ item }) => {
                        return (
                            <>
                                <TouchableOpacity onPress={
                                            () => {
                                                deleteparticipatenumber(item.phone_number);
                                                getAddedparticipates();
                                            }} style={{ flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", flexWrap: "nowrap" }}>
                                    <View
                                        >
                                        <View style={{ marginHorizontal: 10, position: 'relative', flexDirection: "row", justifyContent: "space-evenly" }}>
                                            <View style={{ flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", flexWrap: "nowrap" }}>
                                                {/* <Image
                                                    style={{ height: 40, width: 40, borderRadius: 20, opacity: 0.75 }}
                                                    source={require('../../Assets/avatar.png')}
                                                /> */}
                                                  <Mc name="face-man-profile" style={{ fontSize: 40, color: "grey"}} />
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", flexWrap: "nowrap", position: 'absolute', top: 0 }}>

                                                <View>

                                                    {/* <Image
                                                        style={{ height: 14, width: 14, borderWidth: 0.3, borderRadius: 7 }}
                                                        source={require('../../Assets/remove.png')}
                                                    /> */}
                                                    <Entypo name="cross" style={{ height: 14, width: 14, borderWidth: 0.3, borderRadius: 7 , color:"#fff" , backgroundColor:"red"  }}/>


                                                </View>
                                            </View>

                                        </View>

                                        <View><Text style={{ fontWeight: "500", color: "grey", marginHorizontal: 10 }}>{item.contact_display_name?.slice(0, 3)}...</Text></View>
                                    </View>
                                </TouchableOpacity>
                            </>
                        )
                    }}


                />

            </View>
            <View style={{ marginTop: 20, marginRight: 50, flexDirection: "row", justifyContent: "flex-end" }}>
                <TouchableOpacity onPress={async () => {
                    await deleteallgroupmembers()

                }}>
                    <Text style={{ color: "red", opacity: 0.75,  marginBottom:20 }}>{(countofquickcallusers) ? (<Text>Delete All</Text>) : null}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "100%",borderWidth: 1, borderColor: "#192a53", borderRadius:25}}>
            <SearchBar
                    placeholder="Search here..."
                    shadowColor="#282828"
                    iconColor="#fff"
                    cancelIconColor="#fff"
                    value={search}
                    onChangeText={(text) => handleSearch(text)}
                    onClearPress={() => setSearch("")}
                    // onPress={() => alert("onPress")}  
 		           // style={styles.searchbar}        
                    
                  /> 
            </View>

            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.recordID}
                ListEmptyComponent={EmptyListMessage}
                


                renderItem={
                    ({ item }) => {
                        console.log(item, 'ITEM LISTS');
                        let findnumber = item.phoneNumbers;
                        let usercontacts = findnumber?.map(({number}) => number);
                        let getphone = usercontacts[0];
                        let formattednumber = getphone?.replace(/\s+/g,'') //it will remove "+91" prefix to number
                        let contactnumber = formattednumber?.substring(formattednumber.length - 10);
                        let findNames = item.displayName;  //contact name
                        return (
                            <>
                                    <TouchableOpacity onPress={async () => {
                                             onEditabledone(contactnumber, findNames);
                                             getAddedparticipates();
                                        }} style={styles.userslistbox}>
                                       <View
                                        
                                       style={{flexDirection:"row" , justifyContent:"flex-start"}}
                                       >
                                       <View>
                                            <Image
                                                style={styles.drawerboardusersimage}
                                                source={require('../../Assets/user.png')}
                                            />
                                             {/* <Mc name="face-man-profile" style={{ fontSize: 50, color: "grey"}} /> */}
                                        </View>
                                        <View style={{ flexDirection: "column" }}>
                                            <Text style={{ fontWeight: "bold", color: "#000" }}>{findNames}</Text>
                                            <Text style={{ color: "grey" }}>{contactnumber}</Text>
                                        </View>
                                       </View>
                                    </TouchableOpacity>
                                  
                            </>
                        )
                    }
                }
                onEndReached={loadContacts} // Load more data as the user scrolls
          onEndReachedThreshold={0.1}
               
            />
            {isLoading && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size="large" color="#000" />
                </View>
              )}
               
        </>
    );

}

export default ContactList

const styles = StyleSheet.create({
    emptyListStyle: {
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
    },
    drawerboardusersimage: {
        width: 30,
        height: 30,
        marginHorizontal: 15,
        opacity: 0.5,
    },
    userslistbox: {
        margin: 0,
        flexDirection: "row",
        justifyContent: "flex-start",
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        paddingVertical: 10,
        width: "100%"

    },
    searchbar: {
        color: "#000",
        textAlign: "center",
        fontSize: 22,
        borderColor: "grey",
        borderBottomWidth: 0.7,
        borderRadius: 20,

    }
})