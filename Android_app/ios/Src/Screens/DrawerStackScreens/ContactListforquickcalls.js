import { useEffect, useState  , useContext} from 'react';
import { PermissionsAndroid, StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar, Image, TextInput, Alert, TouchableOpacity } from 'react-native';
import * as Contacts from 'react-native-contacts';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from '../../Context/Severcontext';
import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
const ContactListforquickcalls = (props) => {
    const useridnum = props.userId;
    const quickid = props.serialid;
    const {baseurl} = useContext(MyContext);
    console.log(useridnum , 'quick call screen user id number-kjsksk---hello- djklllllllllllllllllll-------');
    // const [error, setError] = useState("");
    // const [devicedata, setDeviceData] = useState('');
    // const [searchcontacts, setSearchContacts] = useState('');

    const [filterdData, setfilterdData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [search , setSearch] = useState([]);
    
    const [userloginmobile, setUserLoginMobile] = useState("");
    // const [userIdValue, setUserIdValue] = useState("");  //user group id
    //updateparticipate
    const [participatenumber, setParticipateNumber] = useState("");
    // const [updateParticipateNumber, setUpdateParticipateNumber] = useState([]);
    //record status
    // const [contactStatus, setContactStatus] = useState(false);
    //add quick calls flatlist
    const [updnumdata, setUpddata] = useState(""); //flatlist
    //count for delete all
    const [countofquickcallusers, setcountofquickcallusers] = useState(0);
    // const [updateSinglenumber, setUpdatesinglenumber] = useState([])
    const [runCall, setRunCall] = useState([]);
    console.log(runCall , '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-----------------------');

    //load more scrolll
    const [page, setPage] = useState(0);

    useEffect(() => {
        (async () => {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: 'Contacts',
                message: 'This app would like to view your contacts.',
                buttonPositive: 'Please accept',
            })
                .then((res) => {
                    console.log('Permission: ', res);
                    Contacts.getAll()
                        .then((contacts) => {
                            // work with contacts
                            setfilterdData(contacts);
                            setmasterData(contacts);
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                })
                .catch((error) => {
                    console.error('Permission error: ', error);
                });


            //define values
            const mobilenumber = await AsyncStorage.getItem('userMobileNumber');
            setUserLoginMobile(mobilenumber);

            const Groupid_storedval = await AsyncStorage.getItem('@GROUP_ID');
            //setUserIdValue(Groupid_storedval);
            console.log(Groupid_storedval, 'userGroupIdNUmberValue------userGroupIdNUmberValue----userGroupIdNUmberValue');
        })();

    }, []);

    useEffect(()=>{
        //fetch added quicklist
        getAddedparticipates();
    },[]);

    // }
    // /quick call
    // const Runsinglecall = async () => {
    //     //getuseridlet 
    //     try {
    //         ////${baseurl}runsinglecall?phone_number=9848851443&uid=1&mute=1&handrise=1
    //         insertnumurl = `${baseurl}runsinglecall?uid=${useridnum}&mute=0&handrise=0`;
    //         console.log(insertnumurl, 'RUNNING SINGLE CALL');
    //         console.log(runCall , 'RUN calls');
    //         const response = await fetch(
    //             insertnumurl
    //         );
    //         const res = await response.json();
    //         const obj = JSON.parse(JSON.stringify(res));
    //         console.log(obj, '----obj------------quicktalk');

    //     } catch (error) {
    //         Alert.alert('sorry,something went wrong!!!')
    //         console.error(error);
    //     }

    // }
    //delete single user calls
    const deleteparticipatenumber = async (SingleUserNumbers) => {
        const userid = await AsyncStorage.getItem('USERIDNUMBER');
        insertnumurl = `${baseurl}deletesingleuser?phone_number=${SingleUserNumbers}&uid=${userid}&qid=${quickid}`;
        console.log(insertnumurl, 'deleted url');
       
        try {
            const response = await fetch(
                insertnumurl
            );
            const res = await response.json();
            console.log(res, 'RES')
            const obj = JSON.parse(JSON.stringify(res));
            console.log(obj.messages.success, '----obj');
            const Result = obj.messages.success;
            if (Result) {
                getAddedparticipates();
            }


        } catch (error) {
            Alert.alert('sorry,something went wrong!!!')
            console.error(error);
        }

    }
    const getAddedparticipates = async () => {
        const userid = await AsyncStorage.getItem('USERIDNUMBER');
        //${baseurl}viewsingleusers?uid=3&quickid=100
        const url = `${baseurl}viewsingleusers?uid=${userid}&quickid=${quickid}`;
        console.log(url, 'added participates..............hello.........!!!!');
        try {
            const response = await fetch(url);
            const updatenum = await response.json();
            const jsonres = JSON.parse(JSON.stringify(updatenum));
            const getupdnum = jsonres.messages.success;
            setUpddata(getupdnum);
            const phoneNumber = updnumdata.map(function (el) { return el.phone_number; });
            const deleteuserM = phoneNumber;
            const groupmembernumber = deleteuserM.toString();
            await AsyncStorage.setItem('@DELETE_GROUPMEMBER', JSON.stringify(phoneNumber));
            const getphonenumber = getupdnum.map(function (el) { return el.phone_number; });
            const participatephonenumbers = JSON.stringify(getphonenumber);
            setSearch(participatenumber);
            const countofnumbers = deleteuserM.length;
            setcountofquickcallusers(countofnumbers);
            const usersresult = JSON.stringify(getphonenumber);
            console.log(usersresult, 'userresult-------------');
        } catch (error) {
            console.log(error);
        }
    }

    const onEditabledone = async (dialNumber , contactname) => {
        if (!dialNumber) {
            Alert.alert('Please Enter Mobile Number!!!');
        } else {
            console.log(dialNumber, 'Enter single call Number');
            const userid = await AsyncStorage.getItem('USERIDNUMBER');
            //${baseurl}insertquickcall?phone_number=8790023271&name=sampath&user_id=1active=1
            //${baseurl}insertquickcall?user_id=3&phone_number=9000202102&name=sampath&quick_id=2
            const insertquicakcalls = `${baseurl}insertquickcall?phone_number=${dialNumber}&name=${contactname}&user_id=${userid}&active=1&quick_id=${quickid}`;
            console.log(insertquicakcalls, '------------------Inserted quick call url');
            try {
                const response = await fetch(
                    insertquicakcalls
                );
                const res = await response.json();
                const obj = JSON.parse(JSON.stringify(res));
                console.log(obj, '----obj');
                const object = obj;
                const message = object.messages;
                const messageconfirm = message.success
                console.log(object, 'object');
                console.log(message, 'message');
                console.log(messageconfirm, 'confiremMessage');
                // Alert.alert(messageconfirm);
                setSearch('')
                getAddedparticipates();
            } catch (error) {
                Alert.alert('sorry,something went wrong!!!')
                console.error(error);
            }
        }

    }

    //delete all single quick contacts
    const deleteallquicnumbers = async () => {
        const userid = await AsyncStorage.getItem('USERIDNUMBER');
        const deleteallurl = `${baseurl}deleteallsingleuser?&uid=${userid}&qid=${quickid}`;
        console.log(deleteallurl, 'deleted url');
        try {
            const response = await fetch(
                deleteallurl
            );
            console.log(response, 'RESPONSE');
            const result = await response.json();
            console.log(result, 'RESULT')
            const obj = JSON.stringify(result);
            console.log(obj, 'OBJ')
            getAddedparticipates();
            //   const Result = obj.messages;
            //   if(Result){
            //       Alert.alert(Result);
            //       getAddedparticipates();
            //   }
        } catch (error) {
            Alert.alert('sorry,something went wrong!!!')
            console.error(error);
        }

    }



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
        if(text != ''){
            const newData = masterData.filter((item)=>{
                const itemData = item.displayName ? item.displayName.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setfilterdData(newData);
            setSearch(text);
        }else{
            setfilterdData(masterData);
            setSearch(text);
        }
    }
//load flatlist data
   
    return (
        <>
            <View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={updnumdata}
                    renderItem={({ item }) => {

                        return (
                            <>
                                <View style={{ flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", flexWrap: "nowrap" }}>
                                    <TouchableOpacity
                                        onPress={
                                            async() => {
                                               await deleteparticipatenumber(item.phone_number);
                                               await getAddedparticipates();
                                            }}>
                                        <View style={{ marginHorizontal: 10, position: 'relative', flexDirection: "row", justifyContent: "space-evenly" }}>
                                            <View style={{ flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", flexWrap: "nowrap" }}>
                                                {/* <Image
                                                    style={{ height: 40, width: 40, borderRadius: 20 }}
                                                    source={require('../../Assets/avatar.png')}
                                                /> */}
                                                 <Mc name="face-man-profile" style={{ fontSize: 40, color: "grey"}} />
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", flexWrap: "nowrap", position: 'absolute', top: 0 }}>

                                                <View>

                                                    {/* <Image
                                                        style={{ height: 14, width: 14, borderWidth: 0.3, borderRadius: 8, borderColor: "red" }}
                                                        source={require('../../Assets/remove.png')}
                                                    /> */}
                                                      <Entypo name="cross" style={{ height: 14, width: 14, borderWidth: 0.3, borderRadius: 7 , color:"#fff" , backgroundColor:"red"  }}/>

                                                </View>
                                            </View>

                                        </View>

                                        <View><Text style={{ fontWeight: "500", color: "grey", marginHorizontal: 10 }}>{item.contact_display_name.slice(0, 3)}...</Text></View>
                                    </TouchableOpacity>
                                </View>

                            </>
                        )

                    }}

                />
            </View>
            <View style={{ marginTop: 10, marginLeft: 50 }}>
                <TouchableOpacity onPress={() => { deleteallquicnumbers() }}>
                    <Text style={{ color: "red", opacity: 0.75 }}>{(countofquickcallusers > 0) ? (<Text>Delete All</Text>) : null}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "100%" }}>
                <TextInput
                    autoFocus={true}
                    autoCapitalize="none"
                    color="#000"
                    keyboardType='alpha-numeric'
                    underlineColorAndroid="transparent"
                    maxLength={10}
                    value={search}
                    keyboardAppearance={'number-pad'}
                    onSubmitEditing={(event) => onEditabledone(event.nativeEvent.text)}
                    style={styles.searchbar}
                    // onChangeText={(text) => searchFilter(text)}
                    onChangeText={(text)=>{
                        searchFilter(text);
                        // setRunCall(text)
                        // setSearch(text);
                    }}
                    placeholder="Find In contacts"
                />
            </View>
            <View>
            <FlatList
                data={filterdData}
                keyExtractor={(item) => item.recordID}
                ListEmptyComponent={EmptyListMessage}
                renderItem={
                    ({item})=>{
                        let findnumber = item.phoneNumbers;
                        let usercontacts = findnumber.map(({ number }) => number);
                        let getcontact = usercontacts[0];
                        let formatenumber = getcontact?.replace(/\s+/g, '');
                        let contactnumber = formatenumber?.substring(formatenumber.length - 10);
                        let findNames = item.displayName;  //contact na,e
                        return (
                            <>
                                <TouchableOpacity style={styles.userslistbox} 
                                    onPress={ async() => {
                                       try{
                                       await onEditabledone(contactnumber , findNames);
                                        getAddedparticipates();
                                       }catch(error){
                                        console.log(error);
                                       }
                                    }}
                                    >
                                        <View >
                                            {/* <Image
                                                style={styles.drawerboardusersimage}
                                                source={require('../../Assets/user.png')}
                                            /> */}
                                             <Mc name="face-man-profile" style={{ fontSize: 50, color: "grey"}} />
                                        </View>
                
                                        <View style={{ flexDirection: "column" }}>
                                            <Text style={{ fontWeight: "bold", color: "#000" }}>{findNames}</Text>
                                            <Text style={{color:"grey"}}>{contactnumber}</Text>
                
                                        </View>
                                    </TouchableOpacity>
                            </>
                        )
                    }
                }
            />
</View>


          

        </>

    );
}

export default ContactListforquickcalls;

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
        borderBottomWidth: .3,
        paddingVertical: 10,
    },
    searchbar: {
        color: "#000",
        fontSize: 22,
        // borderColor: "grey",
        borderBottomWidth: 0.7,
        borderRadius: 20,
        paddingLeft:20,

    },
    callbtn: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 10,
        color: "#fff",
        width: "100%",
    }
})