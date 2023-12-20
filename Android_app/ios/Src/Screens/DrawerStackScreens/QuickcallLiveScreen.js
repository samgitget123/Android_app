import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CallsContext } from '../../Context/CallsContext';
import Groupmembers from './BottomTabs/Groupmembers';
import MainBottomTabs from './BottomTabs/MainBottomTabs';
import { MyContext } from '../../Context/Severcontext';
const QuickcallLiveScreen = ({ route, navigation }) => {
    // const {fetchlivegroupmembers} = useContext(CallsContext);
    const { HangupGroup } = useContext(CallsContext);
    const {usercount } = useContext(CallsContext);
    const {baseurl} = useContext(MyContext);
   
   

    //States
    const [loading, setLoading] = useState(true);
    const [groupmembers, setGroupmembers] = useState('');
    const [mutemembers, setMutemembers] = useState('');
    // const [usercount, setUserCount] = useState(0);
    const [groupname, setGroupname] = useState('');  //Groupname
    const [time, setTime] = useState(null);
    
    //set call duration
    useEffect(() => {
        const interval = setInterval(async() => {
            try {
            //    await fetchlivegroupmembers();
                const date = new Date();
                const seconds = date.getSeconds();
                setTime(seconds);
                const usergroupname = await AsyncStorage.getItem('GROUP_NAME'); //GROUP_NAME
                setGroupname(usergroupname)
            } catch (error) {
                console.log(error);
            }
          
        }, 1000);
       
        return () => clearInterval(interval);
        // fetchlivegroupmembers();

        
    }, []);

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
                                    navigation.goBack();
                                }}>
                                    <Image
                                        source={require('../../Assets/arrow.png')}
                                        style={styles.arraowimage}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginLeft: 20 }}>
                                <Image
                                    source={require('../../Assets/avatar.png')}
                                    style={{ width: 40, height: 40, borderRadius: 20 }}
                                />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ color: "#fff", fontSize: 22 }}>Quick Call</Text>
                            </View>
                        </View>
                        <View style={{ padding: 30, flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={{ color: "#fff", fontSize: 22 }}>0:{time}</Text>
                                <Text style={{ color: "#fff", fontSize: 14 }}>{usercount} Member(s) On Call</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                <View style={{ marginLeft: 20 }}>
                                    <Image
                                        source={require('../../Assets/mike.png')}
                                        style={{ width: 30, height: 30, borderRadius: 15 }}
                                    />
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <Image
                                        source={require('../../Assets/add-user.png')}
                                        style={{ width: 30, height: 30, borderRadius: 15 }}
                                    />
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    {/* //${baseurl}grouppartyend?groupid=25  */}
                                    <TouchableOpacity
                                        onPress={() => {
                                            HangupGroup();
                                        }}
                                    >
                                        <Image
                                            source={require('../../Assets/hangup.png')}
                                            style={{ width: 30, height: 30, borderRadius: 15 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>


                <View style={styles.bottomcontainer}>
                    <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between", paddingBottom: 0 }}>
                        <View>
                            <View style={{ width: "100%" }}>
                                <TextInput
                                    placeholder='Search for member(s)'
                                    autoFocus={true}
                                    autoCapitalize="none"
                                    color="#000"
                                    keyboardType='numeric'
                                    maxLength={10}
                                    //value={searchcontacts}
                                    keyboardAppearance={'number-pad'}
                                    //onSubmitEditing={(event) => onEditabledone(event.nativeEvent.text)}
                                    style={styles.searchbar}
                                // onChangeText={(text) => setSearchContacts(text)}
                                />
                            </View>
                        </View>
                        <MainBottomTabs/>  
                    </View>
                    
                </View>

            </View>
        </>
    )
}

export default QuickcallLiveScreen

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
        alignItems:"center",
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
        textAlign: "center",
        fontSize: 22,
        borderColor: "grey",
        borderWidth: 0.7,
        borderRadius: 28,
        backgroundColor:"#fff"

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
});