import { useContext, useEffect, useState } from 'react';
import { PermissionsAndroid, StyleSheet, View, Text, Image, TextInput, Alert, TouchableOpacity , ActivityIndicator } from 'react-native';
import * as Contacts from 'react-native-contacts';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from '../../Context/Severcontext';

const Updategroupmembers = (props) => {
    const usermob = props.mobilenumber;
    const viewgroupidnum = props.viewgroupid;
    const {baseurl} = useContext(MyContext);
    console.log(viewgroupidnum , 'View group id number');
    const [participatenumber, setParticipateNumber] = useState("");
    const [updnumdata, setUpddata] = useState([]);
    const [countofquickcallusers, setcountofquickcallusers] = useState(0);
    const [filterdData, setfilterdData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [search, setSearch] = useState('');
    //pagination lazy laod contacts
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
    // const [search, setSearch] = useState('');
    const [updateParticipateNumber, setUpdateParticipateNumber] = useState([]);
    //Added group Members
     // Fetch the initial contact list when the component mounts
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
              setfilterdData(contacts);
              setmasterData(contacts)
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((error) => {
          console.error('Permission error: ', error);
        });
    })();
  }, []);
    // useEffect(() => {
    //     (async () => {
    //         PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    //             title: 'Contacts',
    //             message: 'Convoxmeet would like to view your contacts.',
    //             buttonPositive: 'Please accept',
    //         })
    //             .then((res) => {
    //                 console.log('Permission: ', res);
    //                 Contacts.getAll()
    //                     .then((contacts) => {
    //                         setfilterdData(contacts) //actual Data
    //                         setmasterData(contacts);  //filterdata it can be used for serch filter
    //                     })
    //                     .catch((e) => {
    //                         console.log(e);
    //                     });
    //             })
    //             .catch((error) => {
    //                 console.error('Permission error: ', error);
    //             });
    //     })();

    // }, []);

    //if flatlist gets empty
    const EmptyListMessage = ({ item }) => {
        return (
            // Flat List Item
            <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
                No Data Found
            </Text>
        );
    };
    

    const searchFilter = (text) => {
        if (text != '') {
            const newData = masterData.filter((item) => {
                const itemData = item.displayName ? item.displayName.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setfilterdData(newData);
            setSearch(text);
        }else {
            setfilterdData(masterData);
            setSearch(text);
        }
       
    }

    //Get Added participates
    const getAddedparticipates = async () => {
        const usermobilenumber = await AsyncStorage.getItem('userMobileNumber'); //User Login Mobile number
        // const getgroupid = await AsyncStorage.getItem('@GROUP_ID');   //Group_id
        //${baseurl}viewgroupM?phone=7036181279&gid=4
        const url = `${baseurl}viewgroupM?phone=${usermobilenumber}&gid=${viewgroupidnum}`;
        try {
            const response = await fetch(url);
            const updatenum = await response.json();
            const jsonres = JSON.parse(JSON.stringify(updatenum));
            const getmessage = jsonres.messages;
            const getupdnum = jsonres.messages.success;
            setUpddata(getupdnum);
            const phoneNumber = updnumdata.map(function (el) { return el.phone_number; });
            const deleteuserM = phoneNumber;
            const countofnumbers = deleteuserM.length;
            setcountofquickcallusers(countofnumbers);
            const getphonenumber = getupdnum.map(function (el) { return el.phone_number; });
        } catch (error) {
            console.log(error);
        }
    }


    //Onsubmit Edit Function
    const onEditabledone = async (dialNumber, contactname) => {
        const usermobilenumber = await AsyncStorage.getItem('userMobileNumber');
        insertnumurl = `${baseurl}addgroupM?mobile=${usermobilenumber}&gid=${viewgroupidnum}&phone=${dialNumber}&name=${contactname}`;
        console.log(insertnumurl, '------------------url check');
        //store dial number in loocal storage
        try {
            await AsyncStorage.setItem("DialerNumber", dialNumber);
        } catch (error) {
            console.log(error);
        }

        try {
            const response = await fetch(
                insertnumurl
            );
            const res = await response.json();
            const obj = JSON.parse(JSON.stringify(res));
            // const received_group_id = obj.messages.group_id;
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
        insertnumurl = `${baseurl}deletesingleMgroup?gid=${viewgroupidnum}&phone=${SingleParticipateNumbers}`;
        console.log(insertnumurl, 'deleted url');
        try {
            const response = await fetch(
                insertnumurl
            );
            const res = await response.json();
            const obj = JSON.parse(JSON.stringify(res));
            const Result = obj.messages.success;
            if (Result) {
                Alert.alert(Result);
                getAddedparticipates();
            }


        } catch (error) {
            Alert.alert('sorry,something went wrong!!!')
            console.error(error);
        }

    }

    //Delete all group Members
    const deleteallgroupmembers = async () => {
        insertnumurl = `${baseurl}deletegroupM?gid=${viewgroupidnum}&usermobile=${usermob}`;
        console.log(insertnumurl, 'deleted url');
      
        // Show a confirmation alert before deleting all group members
        Alert.alert(
          'Confirm Delete',
          'Are you sure you want to delete all group members?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: async () => {
                try {
                  const response = await fetch(insertnumurl);
                  const res = await response.json();
                  const obj = JSON.parse(JSON.stringify(res));
                  const Result = obj.messages.success;
                  await getAddedparticipates();
                } catch (error) {
                  Alert.alert('Sorry, something went wrong!!!');
                  console.error(error);
                }
              },
            },
          ],
          { cancelable: true }
        );
      };
      
    //load more
  //Object.values(updnumdata)
    return (
        <>
            <View>

                <FlatList
                    horizontal
                    data={updnumdata}
                    renderItem={({ item }) => {
                        return (
                            <>
                                <View style={{ flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", flexWrap: "nowrap" }}>
                                    <TouchableOpacity
                                        onPress={
                                            () => {
                                                deleteparticipatenumber(item.phone_number);
                                                getAddedparticipates();
                                            }}>
                                        <View style={{ marginHorizontal: 10, position: 'relative', flexDirection: "row", justifyContent: "space-evenly" }}>
                                            <View style={{ flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", flexWrap: "nowrap" }}>
                                                <Image
                                                    style={{ height: 40, width: 40, borderRadius: 20, opacity: 0.75 }}
                                                    source={require('../../Assets/avatar.png')}
                                                />
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", flexWrap: "nowrap", position: 'absolute', top: 0 }}>
                                                <View>

                                                    <Image
                                                        style={{ height: 14, width: 14, borderWidth: 0.3, borderRadius: 7 }}
                                                        source={require('../../Assets/remove.png')}
                                                    />
                                                    


                                                </View>
                                            </View>

                                        </View>

                                        <View><Text style={{ fontWeight: "500", color: "grey", marginHorizontal: 10 }}>{item.contact_display_name?.slice(0,3)}...</Text></View>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )
                    }}


                />

            </View>
            <View style={{ marginTop: 20, marginRight: 50, flexDirection: "row", justifyContent: "flex-end" }}>
                <TouchableOpacity onPress={async () => {
                    await deleteallgroupmembers()

                }}>
                    <Text style={{ color: "red", opacity: 0.75 }}>{(countofquickcallusers > 0) ? (<Text>Delete All</Text>) : null}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "100%" }}>
                <TextInput
                    placeholder='Find in Contacts'
                    autoFocus={true}
                    autoCapitalize="none"
                    color="#000"
                    keyboardType='alpha-numeric'
                    maxLength={10}
                    value={search}
                    keyboardAppearance={'number-pad'}
                    onSubmitEditing={(event) => onEditabledone(event.nativeEvent.text)}
                    style={styles.searchbar}
                    onChangeText={(text) => {
                        searchFilter(text)
                    }}
                />

            </View>

            <FlatList
                data={filterdData}
                keyExtractor={(item) => item.recordID}
                renderItem={
                    ({ item }) => {
                        // console.log(item, 'ITEM LISTS');
                        // console.log(viewgroupidnum , 'View group id number');
                        let findnumber = item.phoneNumbers;
                        let usercontacts = findnumber.map(({number}) => number);
                        let getphone = usercontacts[0];
                        let formattednumber = getphone?.replace(/\s+/g, '') //it will remove "+91" prefix to number
                        let contactnumber = formattednumber?.substring(formattednumber.length - 10);
                        let findNames = item.displayName;  //contact name
                        return (
                            <>
                                    <View style={styles.userslistbox}>
                                       <TouchableOpacity
                                        onPress={async () => {
                                            await onEditabledone(contactnumber, findNames);
                                            await getAddedparticipates();
                                        }}
                                       style={{flexDirection:"row" , justifyContent:"flex-start"}}
                                       >
                                       <View>
                                            <Image
                                                style={styles.drawerboardusersimage}
                                                source={require('../../Assets/user.png')}
                                            />
                                        </View>
                                        <View style={{ flexDirection: "column" }}>
                                            <Text style={{ fontWeight: "bold", color: "#000" }}>{findNames}</Text>
                                            <Text style={{ color: "grey" }}>{contactnumber}</Text>
                                        </View>
                                       </TouchableOpacity>
                                    </View>
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

export default Updategroupmembers

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