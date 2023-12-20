import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Button, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import * as Animatable from "react-native-animatable";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MyContext } from '../../Context/Severcontext';
import Calenderi from 'react-native-vector-icons/FontAwesome';
import Clocki from 'react-native-vector-icons/Fontisto';

const Schedulecall = ({ route, navigation }) => {
    const { groupId } = route.params;
    const { mobilenumber } = route.params;
    const { userId } = route.params;
    const { baseurl } = useContext(MyContext);

    const [agenda, setAgenda] = useState("");


    const [formattedDate, setFormattedDate] = useState(''); // Initialize with an empty string

    console.log(agenda, "aggggggggggggg");
    console.log(formattedDate, "fffffffffffff");


     const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);

        if (currentDate) {
            const formattedDate = formatDate(currentDate); // Format the date
            setFormattedDate(formattedDate); // Update the state with the formatted date
        }
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };


    const handleAgenda = (text) => {
        setAgenda(text);  // Update the 'agenda' state with the new text
    }



    const handleSchedule = async () => {
        if(formattedDate =="" ){
          Alert.alert("Select Date and Time");
        }else if(agenda==""){
            Alert.alert("Select Agenda!");  
        }
        else{
            const scheuleurl = `${baseurl}/schedules?gid=${groupId}&schedule_date=${formattedDate}&mobile=${mobilenumber}&agenda=${agenda}&uid=${userId}`;

            console.log(scheuleurl, 'SCHEDULED URL FOR SCHEDULING');
            try {
                const response = await fetch(scheuleurl);
                const usersjson = await response.json();
                const jsonres = JSON.parse(JSON.stringify(usersjson));
                console.log(jsonres , 'schedulejson');
                setFormattedDate("");
                setAgenda("");
                // const Messagereturn = jsonres.messages.success;
                // const Messagereturnfail = jsonres.messages.fail;
                // console.log(Messagereturn, 'Message Return');
                // if (Messagereturn) {
                //     setScheduleinfomessage(Messagereturn);
                //     console.log(contactmsg, 'contact msg');
                // }
                // if(Messagereturnfail){
                //     setContactmsg(Messagereturnfail);
                // }
                if(jsonres){
                    Alert.alert("Conference has been scheduled!");
                }

            } catch (error) {
                console.log(error);
            }
        }
       


    }


    const handleBackToHome=()=>{
        navigation.navigate("Home");
    }

    return (
        <View style={styles.container}>
            <View style={styles.primarycontainer}></View>
            <Animatable.View style={styles.secondarycontainer} animation="fadeInDownBig">
                <View style={styles.secondarycontainer_maincontent}>
                    
                        <View style={{width: "80%", marginVertical: 10 }}>
                            
                            <Text style={styles.sideLabel}>Schedule Date and Time</Text>
                            <View style={{ paddingHorizontal: 10 }}>   
                            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop:30, marginBottom:30 }}>
                                                    <TouchableOpacity
                                                                onPress={ () => {
                                                                     showDatepicker();
                                                                }}
                                                                style={{ marginRight: 10 }}
                                                            >
                                                                {/* <Mc name="phone-hangup" style={{ fontSize: 33, color: "red" }} /> */}
                                                                <Calenderi name="calendar" style={{ fontSize: 25, color: "green" }} />
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                                onPress={ () => {
                                                                    showTimepicker();
                                                                }}
                                                                style={{ marginRight: 10 }}
                                                            >
                                                                {/* <Mc name="phone-hangup" style={{ fontSize: 33, color: "red" }} /> */}
                                                                <Clocki name="clock" style={{ fontSize: 25, color: "blue" }} />
                                                    </TouchableOpacity>

                                                    </View>

                                <Text style={{color:"#000"}}>Selected: {formattedDate}</Text>
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                       value={date}
                                        mode={mode}
                                        is24Hour={true} // Set to true for 24-hour format
                                        display="default"
                                        onChange={onChangeDate}
                                    />
                                )}
                            </View>
                            <Text style={styles.sideLabel}>Agenda:</Text>
                        </View>
                        <View>
                       
                    </View>
                    <View style={{ width: "80%", }}>
                        <TextInput
                            multiline={true}
                            numberOfLines={10}
                            placeholder='Agenda (Max 100 characters)'
                            color="#000"
                            style={{ height: 100, textAlignVertical: 'top', borderWidth: 0.5, paddingLeft: 10 }}
                            onChangeText={handleAgenda}  // Use onChangeText to handle text input changes
                            value={agenda}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('DrawerStack', {
                            groupIdN: groupId
                        });
                    }}
                >
                    <View >
                        <Text style={{ color: "grey", opacity: 0.5, textAlign: "center" }}>Convox Meet Will Send an SMS Invite to All Members</Text>
                       
                       
                       
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginTop: 30 }}>
                        <Text onPress={handleSchedule} style={styles.nextbtn}>Done</Text>
                        <Text onPress={handleBackToHome} style={styles.nextbtn}>Home</Text>
                       

                        </View>

                    </View>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    )
}

export default Schedulecall;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#192a53"
    },
    primarycontainer: {
        flex: 1,
    },
    secondarycontainer: {
        flex: 5,
        backgroundColor: "#fff",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        justifyContent: "space-around"
    },
    secondarycontainer_maincontent: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40
    },
    sideLabel: {
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 20,
        color:"#000"
       
    },
    nextbtn: {
        borderWidth: 1,
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: "#192a53",
        color:"#fff",
    },

});