import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator, FlatList, Pressable, Alert, RefreshControl, Modal, Button, PermissionsAndroid } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Updategroupmembers from './Updategroupmembers';
import Antdesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { MyContext } from '../../Context/Severcontext';
import Calenderi from 'react-native-vector-icons/FontAwesome';
import * as Animatable from "react-native-animatable";
import Clocki from 'react-native-vector-icons/Fontisto';
import DateTimePicker from '@react-native-community/datetimepicker';
import Deletei from 'react-native-vector-icons/AntDesign';
import Edit1 from 'react-native-vector-icons/FontAwesome5';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Papa from 'papaparse';
import Ant from 'react-native-vector-icons/AntDesign';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import SearchBar from "react-native-dynamic-search-bar";





// import FloatingButtons from "./FloatingButtons"
import FontAwesome from 'react-native-vector-icons/FontAwesome'; //exporting through expo/vector-icons
import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
const GroupsViewScreen = ({ route, navigation }) => {
  const { getgroupid } = route.params;
  const { getgroupname } = route.params;
  const { getUsreid } = route.params;
  console.log(getUsreid, "getUserid");
  const { getcreatedate } = route.params;
  const { UserMobileNumber } = route.params;
  const { } = route.params;
  const { baseurl } = useContext(MyContext);


  //states
  const [search, setSearch] = useState('');
  const [groupdata, setGroupdata] = useState("");
  const [loading, setLoading] = useState(true);
  const [getusername, setGetusername] = useState('');
  const [groupmembers, setGroupmembers] = useState([]);
  const [getusermobile, setGetusermobile] = useState("");
  const [getnumofusersingroup, setGetnumofusersingroup] = useState('');
  const [usercount, setUserCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [Action, setAction] = useState('');
  const [updatednumber, setUpdatednumber] = useState('');
  const [updategroupname, setUpdategroupname] = useState(getgroupname);
  const [currentnum, setCurrentnum] = useState('');
  const [currentgroup, setCurrentgroup] = useState('')
  /////////////for schedules////////////////////////
  const [agenda, setAgenda] = useState("");
  const [formattedDate, setFormattedDate] = useState(''); // Initialize with an empty string
  console.log(formattedDate, "fffffffffffffffffffffffffffffffffffffffff");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);




  const [schedulejson, setSchedulejson] = useState([]);
  // console.log(schedulejson.length, "ssched");



  //for showing the schedules
  const [showSchedules, setShowSchedules] = useState(true);
  const [editSchedules, setEditSchedules] = useState(false);


  const [csvData, setCsvData] = useState([]);
  const [csvParsingError, setCsvParsingError] = useState('');
  const [invalidCSVFormat, setInvalidCSVFormat] = useState('');
  const [columnArray, setColumn] = useState([]);
  const [valueArray, setValues] = useState([]);



  console.log(groupmembers, "grooooooo");
  const handleSearch = (text) => {
    setSearch(text);
  };

  //const filteredData = groupmembers.length >0 ? groupmembers.filter(eachItem=>eachItem.contact_display_name?.toLowerCase().includes(search.toLowerCase()) || eachItem.phone_number?.includes(search) ):[];

  const filteredData = groupmembers?.length > 0
    ? groupmembers.filter((eachItem) =>
      eachItem.contact_display_name?.toLowerCase().includes(search.toLowerCase()) ||

      eachItem.phone_number?.includes(search)
    )
    : [];

  const handleShowScheduels = async () => {
    setShowSchedules(!showSchedules);
    await viewSchedules();
  }


  const handleDelete = (item) => {
    Alert.alert(
      "Confirmation",
      "Do you want to delete?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            // Perform the deletion here
            deleteSchedule();
          }
        }
      ],
      { cancelable: false }
    );
  };

  const deleteSchedule = async () => {
    Alert.alert("delete");

    const url = `${baseurl}/Deleteschedules?mobile=${UserMobileNumber}&gid=${getgroupid}&status=NEW`;
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      console.log(usersjson, "delete");
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      setSchedulejson([]);
      setAgenda("");
      setFormattedDate("");
    } catch (error) {
      console.log(error);
    }
  }


  const handleEdit = (item) => {
    Alert.alert(
      "Confirmation",
      "Do you want to Edit?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            // Perform the deletion here
            editSchedule();
          }
        }
      ],
      { cancelable: false }
    );
  };


  const editSchedule = () => {
    setShowSchedules(!showSchedules);
    setEditSchedules(true);
  }


  const updateSchedule = async () => {
    if (formattedDate == "") {
      Alert.alert("Select Date and Time");
    } else if (agenda == "") {
      Alert.alert("Select Agenda!");
    }
    else {
      const url = `${baseurl}/Updatechedules?mobile=${UserMobileNumber}&agenda=${agenda}&gid=${getgroupid}&status=NEW&newscheduledate=${formattedDate}`;
      console.log(url, "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
      try {
        const response = await fetch(url);
        const usersjson = await response.json();
        const jsonres = JSON.parse(JSON.stringify(usersjson));
        console.log(jsonres, "update schedule");

        //setSchedulejson()
        setFormattedDate("");
        setAgenda("");

        if (jsonres) {
          Alert.alert("Schedule updated successfully!");
        }

      } catch (error) {
        console.log(error);
      }
    }

  }



  const viewSchedules = async () => {
    const url = `${baseurl}/Viewschedules?mobile=${UserMobileNumber}&gid=${getgroupid}&status=NEW`;
    // console.log(url, "uuuuuuuuuuuuuuuuu");
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      console.log(jsonres, "sssssssssssssssssssssssssssssss");
      const usersmessage = jsonres.messages.View;
      console.log(usersmessage, "mmmmmmmmmmmmmmmm");
      setSchedulejson(usersmessage);
      const usersresult1 = usersmessage[0].agenda;
      const usersresult2 = usersmessage[0].schedule_date;
      setAgenda(usersresult1);
      setFormattedDate(usersresult2);
    } catch (error) {
      console.log(error);
    }
  }

  const handleBack = () => {
    setShowSchedules(!showSchedules);
  }

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
    if (formattedDate == "") {
      Alert.alert("Select Date and Time");
    } else if (agenda == "") {
      Alert.alert("Select Agenda!");
    }
    else {
      const scheuleurl = `${baseurl}/schedules?gid=${getgroupid}&schedule_date=${formattedDate}&mobile=${UserMobileNumber}&agenda=${agenda}&uid=${getUsreid}`;

      console.log(scheuleurl, 'SCHEDULED URL FOR SCHEDULING');
      try {
        const response = await fetch(scheuleurl);
        const usersjson = await response.json();
        const jsonres = JSON.parse(JSON.stringify(usersjson));
        console.log(jsonres, 'schedulejson');
        setFormattedDate("");
        setAgenda("");

        if (jsonres) {
          Alert.alert("Conference has been scheduled!");
        }

      } catch (error) {
        console.log(error);
      }
    }



  }

  ////////////////////////////
  useEffect(() => {
    (async () => {
      await fetchgroupmembers();
    })();
  }, [getgroupid]);  //groupmembers
  const fetchgroupmembers = async () => {
    let getusermobilenumber = await AsyncStorage.getItem('userMobileNumber');
    const url = `${baseurl}viewgroupM?phone=${getusermobilenumber}&gid=${getgroupid}`;
    // const UserGroupId = await AsyncStorage.setItem('USERGROUPID', getgroupid);
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      const usersresult = jsonres.messages.success;
      // console.log(usersresult.length, 'USERRESULT---------hello-------------')
      const groupnumbers = usersresult?.map(el => el.phone_number)
      // console.log(groupnumbers.length , 'group length');
      const count = groupnumbers?.length;
      setUserCount(count);
      setGroupmembers(usersresult);
      // console.log(groupmembers , 'GROUP MEMEBRS');
      setLoading(false);
    } catch (error) {
      console.log(error);
    }

  }
  //get number of users in one group value
  // const get_count = AsyncStorage.getItem('GET_COUNT_USERS_IN_GROUP');
  // console.log(get_count, 'GET_SET COUNT')

  //delete group
  const deletegroup = async () => {
    // Show a confirmation alert
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this group?',
      [
        {
          text: 'Cancel',
          style: 'cancel', // This is a cancel button
        },
        {
          text: 'Delete',
          onPress: async () => {
            const deletegroup_url = `${baseurl}deletegroup?gid=${getgroupid}`;
            try {
              const response = await fetch(deletegroup_url);
              const groupdeletejson = await response.json();
              const jsongroupres = JSON.parse(JSON.stringify(groupdeletejson));
              console.log(jsongroupres, '######json result####');
              const groupresult = jsongroupres.messages.success;
              if (groupresult) {
                navigation.navigate('Home');
              }

              // const numbofgroupcalls = usersresult.length;
              setLoading(false);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  }


  //delete single user in group
  const deletesingleuser = (phonenumber) => {
    // Show a confirmation alert
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete the user with phone number ${phonenumber}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel', // This is a cancel button
        },
        {
          text: 'Delete',
          onPress: async () => {
            const deleteuser = `${baseurl}deletesingleMgroup?gid=${getgroupid}&phone=${phonenumber}`;
            try {
              const response = await fetch(deleteuser);
              const groupdeletejson = await response.json();
              const jsongroupres = JSON.parse(JSON.stringify(groupdeletejson));
              console.log(jsongroupres, 'JSON GROUP RESULT');
              const groupresult = jsongroupres.messages;
              console.log(groupresult, 'successfully deleted user member');
              await fetchgroupmembers();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  // const deletesingleuser = async (phonenumber) => {
  //   const deleteuser = `${baseurl}deletesingleMgroup?gid=${getgroupid}&phone=${phonenumber}`;
  //   try {
  //     const response = await fetch(deleteuser);
  //     const groupdeletejson = await response.json();
  //     const jsongroupres = JSON.parse(JSON.stringify(groupdeletejson));
  //     console.log(jsongroupres, 'JSON GROUP RESULT');
  //     const groupresult = jsongroupres.messages;
  //     console.log(groupresult, 'succesfully deleted user member');
  //    await fetchgroupmembers();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //update group members numbers
  const updatephonenumbers = async () => {
    let getusermobilenumber = await AsyncStorage.getItem('userMobileNumber');

    // Show a confirmation alert
    Alert.alert(
      'Confirm Update',
      'Are you sure you want to update the phone number?',
      [
        {
          text: 'Cancel',
          style: 'cancel', // This is a cancel button
        },
        {
          text: 'Update',
          onPress: async () => {
            try {
              const updatephone = `${baseurl}updategroupM?gid=${getgroupid}&mobile=${getusermobilenumber}&phone=${updatednumber}&curphone=${currentnum}&active=1`;
              console.log(updatephone, 'Updated phone number');
              const response = await fetch(updatephone);
              const numberupdatejson = await response.json();
              const jsonnumres = JSON.parse(JSON.stringify(numberupdatejson));
              await fetchgroupmembers();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  // const updatephonenumbers = async () => {
  //   let getusermobilenumber = await AsyncStorage.getItem('userMobileNumber');
  //   const updatephone = `${baseurl}updategroupM?gid=${getgroupid}&mobile=${getusermobilenumber}&phone=${updatednumber}&curphone=${currentnum}&active=1`;
  //   console.log(updatephone, 'Updated phone number');
  //   try {
  //     const response = await fetch(updatephone);
  //     const numberupdatejson = await response.json();
  //     const jsonnumres = JSON.parse(JSON.stringify(numberupdatejson));
  //     // const groupresult = jsonnumres.messages;
  //     // const success = groupresult.success;
  //     // console.log(success, 'succesfully updated user number');
  //     await fetchgroupmembers();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  //Update group name
  // const Updategroup = async () => {
  //   let getusermobilenumber = await AsyncStorage.getItem('userMobileNumber');
  //   const updategroupname = `${baseurl}updategroup?gid=${getgroupid}&&mobile=${getusermobilenumber}&gname=${currentgroup}`;
  //   console.log( updategroupname, 'Updated group name');
  //   try {
  //     const response = await fetch(updategroupname);
  //     const groupupdatejson = await response.json();
  //     const jsongroupres = JSON.parse(JSON.stringify(groupupdatejson));
  //     const groupresult = jsongroupres.messages;
  //     const success = groupresult.success;
  //     if(success){
  //       setUpdategroupname(currentgroup)
  //     }
  //     console.log(success, 'succesfully updated Groupname');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const Updategroup = async () => {
    let getusermobilenumber = await AsyncStorage.getItem('userMobileNumber');
    const updategroupname = `${baseurl}updategroup?gid=${getgroupid}&&mobile=${getusermobilenumber}&gname=${currentgroup}`;
    console.log(updategroupname, 'Updated group name');
    // Show a confirmation alert
    Alert.alert(
      'Confirm Update',
      'Are you sure you want to update the group name?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Update',
          onPress: async () => {
            try {
              const response = await fetch(updategroupname);
              const groupupdatejson = await response.json();
              const jsongroupres = JSON.parse(JSON.stringify(groupupdatejson));
              const groupresult = jsongroupres.messages;
              const success = groupresult.success;
              if (success) {
                setUpdategroupname(currentgroup);
              }
              console.log(success, 'successfully updated Groupname');
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };







  //if flatlist gets empty
  const EmptyListMessage = () => {
    return (
      // Flat List Item
      <View>
        <Text style={{ textAlign: "center" }}>No Data found</Text>
      </View>
    );
  };


  ///pick csv handle////
  const pickCSVFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const selectedFile = res[0];
      console.log('URI: ' + selectedFile.uri);
      console.log('Type: ' + selectedFile.type);
      console.log('File Name: ' + selectedFile.name);
      console.log('File Size: ' + selectedFile.size);


      // Read the file
      const fileContent = await RNFS.readFile(selectedFile.uri, 'utf8');

      // Parse the CSV content into JSON
      Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        complete: async (parsedData) => {
          console.log('Parsed CSV data:', parsedData.data);

          // Validate the CSV data
          const isValid = validateCSV(parsedData.data);

          if (isValid) {
            // Data is valid, you can proceed to send it to your API
            // Your new code here
            await handleFile(selectedFile, parsedData.data);
          } else {
            // Data is invalid, handle the error
            Alert.alert('Invalid CSV data. Please check the format.');
            console.error('Invalid CSV data. Please check the format.');
          }

          const firstDataRow = parsedData.data[0];
          // if (firstDataRow) {
          //   setColumn(Object keys(firstDataRow));
          //   setValues(parsedData.data.map((d) => Object.values(d)));
          // }
        },
        error: (error) => {
          console.error('CSV parsing error:', error);
        },
      });

      // Setting the state to show single file attributes

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled from single doc picker');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const handleFile = async (file, csvData) => {
    // Your new code here
    try {
      // Check if a file is selected
      if (!file) {
        console.error('No file selected.');

        return;
      }

      // // Check if the selected file is a CSV file
      // if (!file.type || !file.type.includes('csv')) {
      //   console.error('Invalid file type. Please upload a CSV file.');

      //   return;
      // }

      // Fetch existing contacts
      const existingContacts = (await getExistingcontacts(getUsreid, getgroupid)) || [];

      // Handle the CSV file and perform additional operations
      // Your new code here

      const isValid = validateCSV(csvData);

      if (!isValid) {
        console.error('Invalid CSV format.');

        return;
      }

      // Check for duplicates within the uploaded CSV
      const encounteredPhoneNumbers = new Set();
      csvData = csvData.filter((row) => {
        const phoneNumber = row['contact'];
        if (encounteredPhoneNumbers.has(phoneNumber)) {
          return false; // Duplicate, skip this row
        }
        encounteredPhoneNumbers.add(phoneNumber);
        return true;
      });

      // Check for duplicates between CSV and existing contacts
      const existingPhoneNumbers = existingContacts.map((contact) => contact.phone_number);
      const duplicateWithExisting = csvData.filter((row) => existingPhoneNumbers.includes(row.contact));

      if (duplicateWithExisting.length > 0) {
        console.warn('Duplicate phone numbers with existing contacts:', duplicateWithExisting);

        // Filter out duplicate rows from the CSV data, keeping the first occurrence
        csvData = csvData.filter((row) => !duplicateWithExisting.some((existingRow) => existingRow.contact === row.contact));
      }

      // setData(csvData);
      const firstDataRow = csvData[0];
      if (firstDataRow) {
        setColumn(Object.keys(firstDataRow));
        setValues(csvData.map((d) => Object.values(d)));
      }

      // Ensure csvData is an array and is not empty before proceeding
      if (!Array.isArray(csvData) || csvData.length === 0) {
        console.error('No valid data remaining after duplicate removal.');
        return;
      }

      const formData = new FormData();
      formData.append('data', JSON.stringify(csvData));
      formData.append('gid', getgroupid);
      formData.append('uid', getUsreid);

      const response = await fetch(`${baseurl}/uploadcsvfile`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('CSV data uploaded successfully!');
      } else {
        console.error('Failed to upload CSV data.');

      }
    } catch (error) {
      console.error(error);

    }
  };
  const getExistingcontacts = async (getUsreid, getgroupid) => {
    try {
      const url = `${baseurl}/viewgroupM?phone=${getUsreid}&gid=${getgroupid}`;

      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      const existContacts = jsonres.messages.success;

      return existContacts;
    } catch (error) {
      console.log(error);
    }
  };
  const validateCSV = (csvData) => {
    const phoneNumbers = new Set();
    // Check for merged cells (simplified example)
    for (const row of csvData) {
      for (const value of Object.values(row)) {
        if (value === '') {
          console.error('Merged cell detected. CSV has empty cells.');

          return false;
        }
      }

      // Check for duplicates
      // Assuming "contact" is the column containing phone numbers
      const phoneNumber = row['contact'];

      if (phoneNumber && phoneNumbers.has(phoneNumber)) {
        console.error('Duplicate phone number detected:', phoneNumber);


      }

      if (phoneNumber) {
        phoneNumbers.add(phoneNumber); // Add the phone number to the set
      }
    }

    // Check for proper format (simplified example)
    const firstDataRow = csvData[0];
    if (!firstDataRow || Object.keys(firstDataRow).length === 0) {
      console.error('CSV does not have the expected format.');


    }

    return true; // Validation passed
  };
  // Your existing functions (getExistingContacts, validateCSV)

  ///////////////////

  //////DOWNLAOD CSV TEMPLATE///////
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to save CSV files.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
      const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // Generate a timestamp
      const fileName = `Template_${timestamp}.csv`; // Append the timestamp to the filename
      console.log('FILENAME :' + fileName);
      const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;
      // Define the file path where you want to save the CSV in the "Download" directory
      console.log('DOWNLAODED FILE PATH :' + path);
      // Write the CSV content to the file
      await RNFS.writeFile(path, csvContent, 'utf8');

      Alert.alert('File created successfully');
      console.log('File created successfully');
    } catch (error) {
      console.error('Error creating the file:', error);
    }
  };
  const checkStoragePermission = async () => {
    try {
      const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission is already granted, you can write to external stora ,PERge
        downloadCSV();
      } else {
        // Permission is not granted; you can request it
        requestStoragePermission();
      }
    } catch (error) {
      console.error('Error checking permission:', error);
    }
  };


  return (
    <>

      {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#192a53" /></View>)
        :
        (
          <View style={[styles.maincontainer, {
            flexDirection: "column"
          }]}>
            <View style={styles.topcontainer} >
              <View style={styles.detailscontainer}>
                <View style={{ flexDirection: "column", marginLeft: 10, marginTop: 10 }}>
                  <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    {/* <Image
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20
                      }}
                      source={require('../../Assets/avatar.png')}
                    /> */}
                    <FontAwesome
                      name="group"
                      color="#fff"
                      size={30}
                      style={{ marginRight: 10 }}
                    />
                    <Text style={[styles.detailsteststyle]}><Text style={{ fontWeight: "500" }}> {updategroupname}</Text></Text>

                  </View>

                  <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 6 }}>
                    <Text style={[styles.detailsteststyles]}><Text style={{ fontWeight: "300" }}>{usercount}</Text> Members</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 6 }}>
                    <Text style={[styles.detailsteststyles]}><Text style={{ fontWeight: "300" }}>Created On :</Text> {getcreatedate}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 6 }}>
                    <Text style={[styles.detailsteststyles]}><Text style={{ fontWeight: "300" }}>Lastcall On :</Text> {getcreatedate}</Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: 'center', marginTop: 20 }}>
                    <View >
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Initialcallscreens', {
                            groupId: getgroupid,
                            groupName: getgroupname,
                            userid: getUsreid,
                            usermobilenumber: UserMobileNumber,
                          })
                        }}
                      >
                        <MatIcon
                          name="live-tv"
                          color="#fff"
                          size={22}
                          style={{ marginLeft: 20 }}

                        />
                      </TouchableOpacity>
                    </View>
                    <View >
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(!modalVisible);
                          setAction('EDITGROUPNAME');
                          setUpdategroupname(getgroupname)
                        }}
                      >
                        <Antdesign
                          name="edit"
                          color="#fff"
                          size={22}
                          style={{ marginLeft: 20 }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => {
                        setModalVisible(!modalVisible);
                        setAction('ADDMEMBERINGROUP');
                        // navigation.navigate('Updategroupmembers');
                      }}>
                        <Antdesign
                          name="adduser"
                          color="#fff"
                          size={22}
                          style={{ marginLeft: 20 }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          deletegroup();
                        }}
                      >
                        <Antdesign
                          name="delete"
                          color="#fff"
                          size={22}
                          style={{ marginLeft: 20 }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>

                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(!modalVisible);
                          setEditSchedules(false);
                          setAction('SCHEDULESADDANDEDITVIEW');
                        }}
                        style={{ marginRight: 10 }}
                      >
                        {/* <Mc name="phone-hangup" style={{ fontSize: 33, color: "red" }} /> */}
                        <Calenderi name="calendar" style={{ fontSize: 22, color: "#fff", marginLeft: 20 }} />
                      </TouchableOpacity>

                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.bottomcontainer}>

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

              <View>
                <FlatList
                  data={filteredData}
                  onRefresh={() => { fetchgroupmembers() }}
                  ListEmptyComponent={EmptyListMessage}
                  refreshing={loading}
                  // keyExtractor={(item) => item.group_id}
                  renderItem={({ item }) => {
                    return (
                      <View style={{
                        flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginBottom: 10,
                        borderBottomWidth: 0.3, borderColor: "grey", paddingVertical: 5
                      }}>

                        {/* <View>
                          <Mc name="face-man-profile" style={{ fontSize: 50, color: "grey" }} />
                        </View> */}
                        <View>
                          <Image
                            style={styles.drawerboardusersimage}
                            source={require('../../Assets/user.png')}
                          />
                        </View>
                        <View >
                          <Text style={{ color: "grey" }}>{item.contact_display_name?.slice(0, 10)}...</Text>
                          <Text style={{ fontWeight: "500", color: "#000" }}>{item.phone_number}</Text>
                        </View>

                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              deletesingleuser(item.phone_number);
                            }}
                          >
                            <Antdesign
                              name="delete"
                              color="#000"
                              size={22}
                            />
                          </TouchableOpacity>
                        </View>
                        <View >
                          <TouchableOpacity
                            onPress={() => {
                              setAction('EDITUSERNUMBER')
                              setModalVisible(!modalVisible);
                              setUpdatednumber(item.phone_number)
                            }}
                          >
                            <Antdesign
                              name="edit"
                              color="#000"
                              size={22}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )

                  }}

                />
                {/* <Text>{groupmembers.phone_number}</Text> */}

              </View>


            </View>
          </View>

        )
      }

      {/* // MODAL */}
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
          Action === 'ADDMEMBERINGROUP' ? (
            <>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.downloadButton}>
                    <TouchableOpacity style={styles.centeredContent} onPress={checkStoragePermission} >
                      <Ant name='download' color='#fff' size={40} />
                      <Text style={{ color: '#fff' }}>Csv Temp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.centeredContent} onPress={pickCSVFile}>
                      <Ant name='upload' color='#fff' size={40} />
                      <Text style={{ color: '#fff' }}>Upload Csv</Text>
                    </TouchableOpacity>
                  </View>
                  {/* <Text style={styles.modalText}>ConvoxMeet.</Text> */}
                  <Pressable
                  // style={[styles.button, styles.buttonClose]}
                  >
                    <View style={styles.contactviewbox}>
                      {
                        <Updategroupmembers viewgroupid={getgroupid} />
                      }
                    </View>
                  </Pressable>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <View style={{ backgroundColor: "#192a53", padding: 12, borderRadius: 12 }}>
                      <Text style={{ color: "#fff" }}>close</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : null
        }
        {
          Action === 'SCHEDULESADDANDEDITVIEW' ? (
            <>
              <View style={styles.centeredView1}>
                <View style={styles.modalView1}>
                  <Text style={styles.modalheading}>SCHEDULE  CONFERENCE</Text>
                  {/* <Text style={styles.modalText}>ConvoxMeet.</Text> */}
                  <Pressable
                  // style={[styles.button, styles.buttonClose]}
                  >
                    <View style={styles.contactviewbox}>
                      <View style={styles.container}>
                        <View style={styles.primarycontainer}></View>
                        <Animatable.View style={styles.secondarycontainer} animation="fadeInDownBig">
                          {showSchedules &&
                            <View>
                              <View style={styles.secondarycontainer_maincontent}>


                                <View style={{ width: "80%" }}>

                                  <Text style={styles.sideLabel}>Schedule Date and Time</Text>
                                  <View style={{ paddingHorizontal: 10 }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: 30, marginBottom: 30 }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          showDatepicker();
                                        }}
                                        style={{ marginRight: 10 }}
                                      >
                                        {/* <Mc name="phone-hangup" style={{ fontSize: 33, color: "red" }} /> */}
                                        <Calenderi name="calendar" style={{ fontSize: 40, color: "#192a53" }} />
                                      </TouchableOpacity>

                                      <TouchableOpacity
                                        onPress={() => {
                                          showTimepicker();
                                        }}
                                        style={{ marginRight: 10 }}
                                      >
                                        {/* <Mc name="phone-hangup" style={{ fontSize: 33, color: "red" }} /> */}
                                        <Clocki name="clock" style={{ fontSize: 40, color: "#192a53" }} />
                                      </TouchableOpacity>
                                    </View>
                                    <Text style={{ color: "#000" }}>Selected: {formattedDate}</Text>
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
                                <View style={{ width: "80%", marginTop: 10 }}>
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
                                    groupIdN: getgroupid
                                  });
                                }}
                              >
                                {!editSchedules && <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginTop: 30 }}>
                                  <Text onPress={handleSchedule} style={styles.nextbtn}>Done</Text>
                                  <Text onPress={handleShowScheduels} style={styles.nextbtn}>Show</Text>
                                </View>}

                                {editSchedules && <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginTop: 30 }}>
                                  <Text onPress={updateSchedule} style={styles.nextbtn}>Update Schedule</Text>
                                </View>}



                              </TouchableOpacity>
                            </View>}

                          {!showSchedules &&
                            <>
                              <View style={{ padding: 20 }}>
                                <FlatList
                                  data={schedulejson}
                                  keyExtractor={(item, index) => index.toString()}
                                  // onRefresh={() => { fetchdata() }}
                                  // refreshing={loading}
                                  ListHeaderComponent={
                                    <View style={styles.row}>
                                      <Text >Agenda</Text>
                                      <Text >Date & Time</Text>
                                      <Text >Actions</Text>
                                    </View>
                                  }
                                  renderItem={({ item }) => {
                                    return (
                                      <>

                                        {schedulejson.length > 0 &&
                                          <View>
                                            <View>
                                              <View style={styles.rowvalues}>
                                                <Text >{item.agenda}</Text>
                                                <Text >{item.schedule_date}</Text>
                                                <Text >
                                                  <Deletei name="delete" size={25} color="red"
                                                    onPress={() => {
                                                      handleDelete();
                                                    }}
                                                  />

                                                </Text>

                                                <Text >
                                                  <Edit1 name="edit" size={20} color="green"
                                                    onPress={() => {
                                                      handleEdit();
                                                    }}
                                                  />

                                                </Text>
                                              </View>
                                            </View>
                                          </View>}
                                        {schedulejson.length == 0 && <View style={{ color: "red", fontSize: 20 }}>No Schedule</View>}
                                      </>
                                    )

                                  }}

                                /></View>

                              <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                                <Text onPress={handleBack} style={styles.nextbtn}>Back</Text>
                              </View>
                            </>
                          }


                        </Animatable.View>
                      </View>
                    </View>
                  </Pressable>
                </View>


                <View>
                  <TouchableOpacity

                  >
                    <View style={{ backgroundColor: "#192a53", padding: 12, borderRadius: 12 }}>
                      <Text onPress={() => setModalVisible(!modalVisible)} style={{ color: "#fff" }}>Close</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : null
        }
        {
          Action === 'EDITUSERNUMBER' ? (
            <>
              <View style={styles.centeredView}>
                <View style={styles.editmodalView}>
                  <View style={{ width: "100%" }}>
                    <TextInput
                      placeholder='Find in Contacts'
                      autoFocus={true}
                      autoCapitalize="none"
                      color="#000"
                      keyboardType='alpha-numeric'
                      maxLength={10}
                      keyboardAppearance={'number-pad'}
                      // onSubmitEditing={(event) => onEditabledone(event.nativeEvent.text)}
                      style={styles.searchbar}

                      onChangeText={(text) => {
                        setCurrentnum(text)
                      }}
                    />

                  </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  <View>
                    <TouchableOpacity
                      onPress={() => updatephonenumbers(updatednumber)}
                    >
                      <View style={{ backgroundColor: "#192a53", padding: 12, borderRadius: 12 }}>
                        {/* <Text style={{ color: "#fff" }}>Update</Text> */}
                        <Entypo
                          name="edit"
                          color="#fff"
                          size={33}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <View style={{ backgroundColor: "#192a53", padding: 12, borderRadius: 12, marginLeft: 30 }}>
                        {/* <Text style={{ color: "#fff" }}>Close</Text> */}
                        <Entypo
                          name="cross"
                          color="red"
                          size={33}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          ) : null
        }

        {
          Action === 'EDITGROUPNAME' ? (
            <>
              <View style={styles.centeredView}>
                <View style={styles.editmodalView}>
                  <View style={{ width: "100%" }}>
                    <TextInput
                      placeholder='Update Group Name'
                      autoFocus={true}
                      autoCapitalize="none"
                      color="#fff"
                      keyboardType='alpha-numeric'
                      maxLength={30}
                      keyboardAppearance={'number-pad'}
                      // onSubmitEditing={(event) => onEditabledone(event.nativeEvent.text)}
                      style={styles.searchbar}
                      value={currentgroup}
                      onChangeText={(text) => {
                        setCurrentgroup(text)
                      }}
                    />

                  </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  <View>
                    <TouchableOpacity
                      onPress={() => Updategroup()}
                    >
                      <View style={{ backgroundColor: "#192a53", padding: 12, borderRadius: 12 }}>
                        {/* <Text style={{ color: "#fff" }}>Update</Text> */}
                        <Entypo
                          name="edit"
                          color="#fff"
                          size={33}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <View style={{ backgroundColor: "#192a53", padding: 12, borderRadius: 12, marginLeft: 30 }}>
                        {/* <Text style={{ color: "#fff" }}>Close</Text> */}
                        <Entypo
                          name="cross"
                          color="red"
                          size={33}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          ) : null
        }

      </Modal>

      {/* EDIT USERNUMBER MODAL */}

    </>
  )
}

export default GroupsViewScreen

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#192a53',
    width: "100%",
  },
  topcontainer: {
    flex: 1,
    backgroundColor: "#192a53",
  },
  bottomcontainer: {
    flex: 3,
    backgroundColor: "#fff",
    padding: 20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  detailsteststyle: {
    fontSize: 16,
    color: "#fff"
  },
  detailsteststyles: {
    fontSize: 14,
    color: "#fff"
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
    width: '100%',
    height: 100,
  },
  centeredView1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '100%',
    height: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#192a53",
    borderRadius: 20,
    padding: 3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    width: '100%',
    height: '60%',

  },
  modalView1: {
    margin: 20,
    backgroundColor: "#192a53",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    width: '100%',
    height: '80%',

  },
  editmodalView: {
    margin: 20,
    backgroundColor: "#192a53",
    borderRadius: 20,
    padding: 3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    width: '80%',
    height: '10%',

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
  contactviewbox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    minWidth: '100%',
  },
  searchbar: {
    color: "#000",
    // //paddingLeft: 20,
    // fontSize: 22,
    borderColor: "grey",
    borderWidth: 0.7,
    // borderRadius: 28,
    // backgroundColor: "#fff"
    width: '100%',
  },
  livedashboardbtn: {
    backgroundColor: 'steelblue',
    borderRadius: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#192a53"
  },
  primarycontainer: {
    flex: 1,
  },
  secondarycontainer: {
    flex: 8,
    backgroundColor: "#fff",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    justifyContent: "space-around"
  },
  secondarycontainer_maincontent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  sideLabel: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  nextbtn: {
    borderWidth: 1,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: "#192a53",
    color: "#fff",
  },
  container1: {
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'black', // set your desired border color here
    paddingBottom: 10,
    textAlign: 'center',
    fontWeight: 500,
    color: "#000"
  },
  rowvalues: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'black', // set your desired border color here
    paddingBottom: 10,
    textAlign: 'center',
    alignItems: 'center',
    color: "#000",

  },
  header: {
    flex: 1,
    fontWeight: 'bold',
  },
  downloadButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  centeredContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,

  },
  drawerboardusersimage: {
    width: 30,
    height: 30,
    marginHorizontal: 15,
    opacity: 0.5,
  },
})
