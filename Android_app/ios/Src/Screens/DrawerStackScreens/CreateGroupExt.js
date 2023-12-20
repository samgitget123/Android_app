import { StyleSheet, Text, TouchableOpacity, View, Image, Platform, TextInput, Alert, Button, ScrollView, FlatList } from 'react-native'
import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import * as Animatable from "react-native-animatable";
// import call from 'react-native-phone-call'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactList from './ContactList';
export const GroupidContext = createContext();
import { MyContext } from '../../Context/Severcontext';
import Ant from 'react-native-vector-icons/AntDesign';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RNFS from 'react-native-fs';
import FilePickerManager from 'react-native-file-picker';



const CreateGroupExt = ({ route, navigation }) => {
    const { groupId } = route.params;
    const { confId } = route.params;
    const { groupName } = route.params;
    const { usermobile } = route.params;
    const { baseurl } = useContext(MyContext);
    const { Userid } = route.params;
    const [dialicon, setDialicon] = useState(false);
    //updated numbers
    const [updatednumbers, setUpdatednumbers] = useState([]);
    const [updnumdata, setUpddata] = useState("");

    const [csvData, setCsvData] = useState([]);
    const [csvParsingError, setCsvParsingError] = useState('');
    const [invalidCSVFormat, setInvalidCSVFormat] = useState('');


    const getAddedparticipates = async () => {

        const url = `${baseurl}viewusergroupsM?mobile=${usermobile}&gid=${groupId}`;
        console.log(url, 'added participates.......................!!!!');
        try {
            const response = await fetch(url);
            const updatenum = await response.json();
            const jsonres = JSON.parse(JSON.stringify(updatenum));
            const getupdnum = jsonres.messages.success;
            setUpddata(getupdnum);
            const phoneNumber = updnumdata.map(function (el) { return el.phone_number; });
            const deleteuserM = phoneNumber;
            const groupmembernumber = deleteuserM.toString();
            const getphonenumber = getupdnum.map(function (el) { return el.phone_number; });
            const participatephonenumbers = JSON.stringify(getphonenumber);
            const usersresult = JSON.stringify(getphonenumber);
            setUpdatednumbers(usersresult);
            setUpdatednumbers(participatephonenumbers);
        } catch (error) {
            console.log(error);
        }
    }

    //updateparticipate
    const [participatenumber, setParticipateNumber] = useState("");
    const [updateParticipateNumber, setUpdateParticipateNumber] = useState([]);


    //toggledial
    const generateotptoggle = () => {
        setDialicon(!dialicon);
    }


    //remove input clearout
    const [participatesnumber, setParticipatesnumber] = useState("");
    let nextId = 0;
    //update saved contacts 
    const [savedcontacts, setSavedContacts] = useState([]);

    //seperater
    const Separator = () => {
        return (
            <View
                style={{
                    height: 30,
                    width: 1,
                    backgroundColor: "#fff",
                }}
            />
        );
    }

    //updated contact delete function
    const deleteparticipatenumber = async (SingleUserNumbers) => {

        insertnumurl = `${baseurl}deletegroupM?gid=${groupId}&phone=${SingleUserNumbers}`;
        console.log(insertnumurl, 'deleted url');
        try {
            const response = await fetch(
                insertnumurl
            );
            const res = await response.json();
            const obj = JSON.parse(JSON.stringify(res));
            ///console.log(obj.messages.success, '----obj');
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
    //console.log(userGroupIdNUmberValue , 'userGroupIdNUmberValue--userGroupIdNUmberValue--userGroupIdNUmberValue')



    const pickCSVFile = () => {
        FilePickerManager.showFilePicker(null, (response) => {
            if (response.didCancel) {
                console.log('User canceled the file picker');
            } else if (response.error) {
                console.log('File picking failed:', response.error);
                Alert.alert('File picking failed. Please try again.');
            } else {
                console.log('Selected File Type:', response.type);
                console.log('Selected File Name:', response.fileName);
                console.log('Selected File URI:', response.uri);
                console.log('Selected File Path:', response.path);

                const fileExtension = response.fileName.split('.').pop();

                if (fileExtension && (fileExtension.toLowerCase() === 'csv' || fileExtension.toLowerCase() === 'xlsx')) {
                    // Valid file extension, proceed with parsing
                    RNFS.readFile(response.uri, 'utf8')
                        .then((fileContent) => {
                            Papa.parse(fileContent, {
                                header: true,
                                skipEmptyLines: true,
                                error: (error) => {
                                    console.error('CSV parsing error:', error);
                                    setCsvParsingError('CSV parsing error');
                                },
                                complete: (parsedData) => {
                                    if (parsedData.errors.length > 0) {
                                        console.log('CSV parsing error:', parsedData.errors);
                                        setCsvParsingError('CSV parsing error');
                                    } else if (parsedData.errors.length === 0 && parsedData.data.length === 0) {
                                        Alert.alert('Empty File');
                                        console.log('Empty Csv');
                                    } else {
                                        const isValid = validateCSV(parsedData.data);
                                        if (isValid) {
                                            setCsvData(parsedData.data);
                                            console.log('Parsed CSV data:', JSON.stringify(parsedData.data));
                                            // Send the CSV data to your API for insertion
                                            sendCSVDataToAPI(parsedData.data);
                                        } else {
                                            Alert.alert('Invalid CSV format.');
                                            console.error('Invalid CSV format.');
                                            setInvalidCSVFormat('Invalid CSV format');
                                        }
                                    }
                                },
                            });
                        })
                        .catch((readFileError) => {
                            Alert.alert('Error in File');
                            console.error('Error reading the file:', readFileError);
                        });
                } else {
                    console.error('Invalid file type. Please select a CSV or XLSX file.');
                    Alert.alert('Invalid file type. Please select a CSV or XLSX file.');
                }
            }
        });
    };
    const validateCSV = (csvData) => {
        const phoneNumbers = new Set();
        for (const row of csvData) {
            for (const value of Object.values(row)) {
                if (value === '') {
                    console.error('Merged cell detected. CSV has empty cells.');
                    alert('Merged cell detected. CSV has empty cells.');
                    return false;
                }
            }
            const phoneNumber = row['contact'];
            console.log(phoneNumber, 'phoneNumber');
            if (phoneNumber && phoneNumbers.has(phoneNumber)) {
                console.error('Duplicate phone number detected:', phoneNumber);
                alert('Duplicate phone number detected');
                return false;
            }

            if (phoneNumber) {
                phoneNumbers.add(phoneNumber); // Add the phone number to the set
            }
        }

        // Check for proper format (simplified example)
        const firstDataRow = csvData[0];
        if (!firstDataRow || Object.keys(firstDataRow).length === 0) {
            console.error('CSV does not have the expected format.');
            return false;
        }
        return true; // All validations passed
    };


    const sendCSVDataToAPI = async (csvData) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(csvData));
        formData.append('gid', groupId);
        formData.append('uid', Userid);
        try {
            const response = await fetch(`${baseurl}/uploadcsvfile`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('CSV data uploaded successfully!');
                // You can set appropriate state or perform actions upon success
            } else {
                console.log('Failed to upload CSV data.');
                // Handle the error as needed
            }
        } catch (error) {
            console.error('Error sending CSV data to API:', error);
            // Handle the error as needed
        }
    };
    //////DOWNLAOD CSV TEMPLATE///////
    const requestStoragePermission = async () => {
        try {
            const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            if (result === RESULTS.GRANTED) {
                // Permission granted, you can now write to external storage
                downloadCSV();
            } else {
                // Permission denied
                console.log('Permission denied');
            }
        } catch (error) {
            console.error('Error requesting permission:', error);
        }
    };
    const downloadCSV = async () => {
        const csvHeader = 'name,contact,location,state,designation\n';
        console.log('CSVhEADERS : ' + csvHeader);
        const csvRows = [];
        console.log('CSVrOWS : ' + csvRows);
        // Combine header and rows to create CSV content
        const csvContent = csvHeader + csvRows.join('\n');
        console.log('CSVContent : ' + csvContent);
        try {
            // Define the file path where you want to save the CSV in the "Download" directory
            const path = `${RNFS.DownloadDirectoryPath}/deepija.csv`;
            console.log('DOWNLAODED FILE PATH :' + path);
            // Write the CSV content to the file
            await RNFS.writeFile(path, csvContent, 'utf8');

            Alert.alert('File created successfully');
            console.log('File created successfully');
        } catch (error) {
            console.error('Error creating the file:', error);
        }
    };


    return (

        <View style={styles.container}>
            <View style={styles.primarycontainer}>
                <View style={styles.downloadButton}>
                    <TouchableOpacity style={styles.centeredContent} onPress={requestStoragePermission}>
                        <Ant name='download' color='#fff' size={40} />
                        <Text style={{color:"#fff"}}>Csv Temp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.centeredContent} onPress={pickCSVFile}>
                        <Ant name='upload' color='#fff' size={40} />
                        <Text style={{color:"#fff"}}>Upload Csv</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.secondarycontainer} >
                <View style={{ flexDirection: "column", justifyContent: "center" }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <View style={{ marginTop: 50, width: "100%" }}>
                            {<ContactList groupidnumber={groupId} mobilenumber={usermobile} confIdnum={confId} />}
                        </View>
                    </View>
                </View>

                <View style={styles.Nextbtn}>
                    <View style={{ flexDirection: "column" }}>
                        {Platform.OS === 'ios' && <>
                            <TouchableOpacity
                                onPress={() => {
                                    //console.log(groupId, 'group id for setting on add call screen');
                                    navigation.navigate('Addcall', {
                                        groupidnumber: groupId,
                                        mobilenumber: usermobile,
                                        userId: Userid,
                                    });
                                }}
                            >
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={styles.nextbtn}>Next</Text>
                                </View>
                            </TouchableOpacity>
                        </>}

                        {Platform.OS === 'android' && <>
                            <TouchableOpacity
                                onPress={() => {
                                    //console.log(JSON.stringify(groupId), ',,,,,,,,,.....////');
                                    navigation.navigate('Addcall', {
                                        groupidnumber: groupId,
                                        mobilenumber: usermobile,
                                        Groupname: groupName,
                                    });
                                }}
                            >
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={styles.nextbtn}>Next</Text>
                                </View>
                            </TouchableOpacity>
                        </>}
                    </View>
                </View>
            </View>
        </View>

    );
}

export default CreateGroupExt;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#192a53"
    },
    primarycontainer: {
        flex: 1,
        margin:20,

    },
    secondarycontainer: {
        flex: 8,
        backgroundColor: "#fff",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        textAlign: "center",


    },
    searchfield: {
        marginVertical: 20,
        borderColor: "grey",
        width: "80%",
        borderWidth: 0.5,
        paddingVertical: 6,
        borderRadius: 22,
        paddingLeft: 15,

    },
    Register: {
        borderWidth: 1,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 22,
        backgroundColor: "#192a53",
        width: "60%",
        textAlign: "center",
        marginVertical: 20
    },
    Register_Text: {
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center"
    },
    nextbtn: {
        borderWidth: 1,
        paddingHorizontal: 40,
        paddingVertical: 10,
        width: "100%",
        textAlign: "center",
        borderRadius: 22,
        backgroundColor: "#192a53",
        color: "#fff",
        fontWeight: "bold"
    },
    addcontactimagebg: {
        width: 100,
        height: 100
    },
    toggledialicon: {
        justifyContent: "center",
        alignItems: "center",
    },
    updatenumberbox: {
        borderWidth: 1,
        paddingHorizontal: 1.5,
        paddingVertical: 0.5,
        backgroundColor: "#192a53",
        color: "#fff",
        borderRadius: 8,

    },
    //enter mobile input
    inputField: {
        flexDirection: "row",
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "grey",

    },
    Addparticipatebtn: {
        borderColor: "#000",
        borderWidth: 1,
        width: "33%",
        textAlign: "center",
        paddingVertical: 10,
        color: "#fff",
        backgroundColor: "#192a53",
        // borderRadius: 12,


    },
    Nextbtn: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 40,
        // color: "#fff",
        width: "100%",
    },
    downloadButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
      },
      centeredContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },

});