import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
export const CallsContext = createContext();
export const Callsprovider = ({children}) => {
//states
const [loading, setLoading] = useState(true);
const [groupmembers, setGroupmembers] = useState(null);
const [usercount , setUserCount] = useState(0);
const [countofquickcallusers, setcountofquickcallusers] = useState(0);
const [updnumdata, setUpddata] = useState([]);
const [participatenumber, setParticipateNumber] = useState("");
const [updateParticipateNumber, setUpdateParticipateNumber] = useState([]);
const [search, setSearch] = useState('');

// const [mobilenumber , setMobilenumber] = useState(null);
// const [groupId , setGroupid] = useState(null);
// const [userid , setUserId] = useState(null);
// const [groupname , setuserGroupname] = useState(null);

    //Asyncstorage Variables
    // useEffect(()=>{
    //     (async () => {
    //         try {
    //           const usermobilenumber = await AsyncStorage.getItem('userMobileNumber'); //User Login Mobile number
    //           setMobilenumber(usermobilenumber)
    //           const  getgroupid = await AsyncStorage.getItem('@GROUP_ID');   //Group_id
    //           setGroupid(getgroupid);
    //           const userId = await AsyncStorage.getItem('');   //User_id
    //           setUserId(userId);
    //           const usergroupname = await AsyncStorage.getItem('GROUP_NAME'); //GROUP_NAME
    //           setuserGroupname(usergroupname)

    //           } catch (error) {
    //             console.log(error);
    //           }
    //     })()
    // },[]);
    
   //To make a group call with out mute 
  const Makecall = async (groupId) => {
    // const  groupid = await AsyncStorage.getItem('@GROUP_ID');   //Group_id
    //${baseurl}groupcall?group_id=24&user_id=1&mute=YES&handrise=NO 
    const url = `${baseurl}groupcall?group_id=${groupId}&user_id=1&mute=0&handrise=0 `;
    console.log(url, '---------url');
    try {
      console.log(groupid, '-------Make call group id------GROUPID')
      const response = await fetch(url);
      console.log(response, '----response');
      //console.log(response.messages , '--------message');
      const result = response;
      console.log(result, '----result')
      const json_obj = JSON.parse(JSON.stringify(result));
      console.log(json_obj, '------json_obj')
      console.log(json_obj, 'call make ok.....ok');
    } catch (error) {
      Alert.alert('sorry,something went wrong!!!')
      console.error(error);
    }
  }

   //Mute call (if call to be muted)
   const Mutecall = async (groupId) => {
    const getgroupid = await AsyncStorage.getItem('@GROUP_ID');
    //${baseurl}runsinglecall?uid=1&phone_number=9848851443&mute=YES&handrise=NO 
    const url = `${baseurl}groupcall?group_id=${groupId}&mute=0&handrise=0`;
    console.log(url, '---------url');
    try {
      console.log(getgroupid, '-------------GROUPID')
      const response = await fetch(url);
      console.log(response, '----response');
      //console.log(response.messages , '--------message');
      const result = response;
      console.log(result, '----result')
      const json_obj = JSON.parse(JSON.stringify(result));
      console.log(json_obj, '------json_obj')
      console.log(json_obj, 'call make ok.....ok');
    } catch (error) {
      Alert.alert('sorry,something went wrong!!!')
      console.error(error);
    }
  }


  //To hangup the group call based on group id
  //${baseurl}grouppartyend?groupid=25 
  const HangupGroup = async(groupId) => {
    const  getgroupid = await AsyncStorage.getItem('@GROUP_ID');   //Group_id
    const hangup = `${baseurl}grouppartyend?groupid=${groupId}`;
    console.log(hangup  , 'Hangup call ');
    try{
      const hangupresponse = await fetch(hangup);
      console.log(hangupresponse, '----response');
      const hangupresult = hangupresponse;
      console.log(hangupresult, '----result')
      const json_obj = JSON.parse(JSON.stringify(hangupresult));
      console.log(json_obj, 'Call has been Hanged up');
    }catch{
      Alert.alert('sorry,something went wrong!!!')
      console.error(error);
    }
  }

  //Hangup single quick call based on live id
  const Hangupsinglecall = async(liveId) => {
    const hangupquickcall = `${baseurl}singlepartyend?liveid=${liveId}`;
    try{
      const hangupresponse = await fetch( hangupquickcall);
      console.log(hangupresponse, '----response');
      const hangupresult = hangupresponse;
      console.log(hangupresult, '----result')
      const json_obj = JSON.parse(JSON.stringify(hangupresult));
      console.log(json_obj, 'Call has been Hanged up');
    }catch{
      Alert.alert('sorry,something went wrong!!!')
      console.error(error);
    }

  }

  //recharge status
  const getrechargestatus = async () => {
    const getstatus = `${baseurl}recharge?uid=1`;
    console.log(getstatus, 'GET STATUS');
    try {
      const response = await fetch(getstatus);
      console.log(response, 'Response');
      const balancejson = await response.json();
      console.log(balancejson, 'BALANCEJSON');
      const baljsonres = JSON.parse(JSON.stringify(balancejson));
      console.log(baljsonres, 'balcnceJSONRES=============');
      const balmessage = baljsonres.messages;
      console.log(balmessage, 'Usermesssage=====message========');
      const balresult = balmessage.success;
      const balanacedata = balmessage.data;
      console.log(balresult, 'SUCCESS');
      console.log(balanacedata, 'GET STATUS data')
      setBalanceStatus(balanacedata);
      console.log(balanceStatus, 'RECHARGE STATUS')

    }
    catch (error) {
      console.log(error);
    }
  }

  //Fetch mute calls members
  const fetchmutecallers = async(groupId) => {
    // const  getgroupid = await AsyncStorage.getItem('@GROUP_ID');   //Group_id
    const url = `${baseurl}livecalldata?groupid=${groupId}`;
    console.log(url, 'jdurl----')
    // const UserGroupId = await AsyncStorage.setItem('USERGROUPID' , getgroupid);
    // console.log(UserGroupId , 'USERGROUPID taken from groupview and stored in asyncstorage')
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      const jsonobj = jsonres;
      console.log(jsonobj  , 'obj------------------------------------')
      
      // const usersresult = jsonres.messages.success;
      // console.log(usersresult , 'USERRESULT')
      // const get_con_len = Object.keys(usersresult).length;
      // console.log(get_con_len, 'GET_CON_LEN---count');
      // setUserCount(get_con_len);
      // setGroupmembers(usersresult);
      // console.log(phone_numbers , 'Phone numbers');
      // console.log(groupmembers , 'groupmembers');
      // // console.log(usersresult , 'userresult-------------');
      // setLoading(false);
      
    }catch(error) {
      console.log(error);
    }
  }

  //Fetch Group members
  const fetchlivegroupmembers = async(groupId) => {
    try {
      // const  getgroupid = await AsyncStorage.getItem('@GROUP_ID');   //Group_id
      const groupID = props.route.params.groupid;
      console.log(groupID , 'GROUP ID FROM TAB')
      const url = `${baseurl}livecalldata?groupid=${groupID}`;
      console.log(url , 'The live table members -------------------------------------------')
    const response = await fetch(url);
    const usersjson = await response.json();
    const jsonres = JSON.parse(JSON.stringify(usersjson));
    const jsonobj = jsonres;
    console.log(jsonobj  , 'obj--------------------------------000000000000000------')
    const usermessages = jsonobj.messages;
    console.log(usermessages , 'USER MESSAGES');
    const userdata = usermessages.data;
    console.log(userdata , 'USER DATA OF LIVE TABLE');
    let livecallid  = userdata.map(({ live_id }) => live_id);
    console.log(parseInt(livecallid) , 'LIVECALLID');
    const liveid = parseInt(livecallid);
    console.log(liveid , 'LIVE ID');
  //   await AsyncStorage.setItem( '@LIVE_ID' , liveid);
    // const calls = userdata[0];
    // console.log(calls , 'count')
    // const countofcalls = calls.length;
    // console.log(countofcalls , 'COUNT OF CALLS');
    // const usersresult = jsonres.messages.success;
    // console.log(usersresult , 'USERRESULT')
    // const get_con_len = Object.keys(usersresult).length;
    // const userdata = userresult.data;
    // console.log(userdata , 'USER DATA');
    // console.log(get_con_len, 'GET_CON_LEN---count')
  // if(usersresult){
  //   await AsyncStorage.setItem('GET_COUNT_USERS_IN_GROUP' , get_con_len.toString()).then((response) => {return response});
  // }
    // setUserCount(get_con_len);
    setGroupmembers(userdata);
    // console.log(phone_numbers , 'Phone numbers');
    // console.log(groupmembers , 'groupmembers');
    // console.log(usersresult , 'userresult-------------');
    setLoading(false);
    
  }catch(error) {
    console.log(error);
  }
  }

  //Delete all group Members
  const deleteallgroupmembers = async (groupId , usermobile) => {
    // const userMobile = props.mobilenumber;
    // const GroupId = props.groupidnumber
    // const usermobilenumber = await AsyncStorage.getItem('userMobileNumber'); //User Login Mobile number
    // const  getgroupid = await AsyncStorage.getItem('@GROUP_ID');   //Group_id
    //${baseurl}deletegroupM?gid=4&usermobile=9848851443
    insertnumurl = `${baseurl}deletegroupM?gid=${groupId}&usermobile=${usermobile}`;
    console.log(insertnumurl, 'deleted url');
    try {
        const response = await fetch(
            insertnumurl
        );
        const res = await response.json();
        const obj = JSON.parse(JSON.stringify(res));
        ///console.log(obj.messages.success, '----obj');
        const Result = obj.messages.success;
       await getAddedparticipates();
    } catch (error) {
        Alert.alert('sorry,something went wrong!!!')
        console.error(error);
    }

}

 //delete single member in a group
 const deleteparticipatenumber = async (groupId , SingleParticipateNumbers) => {
  // const  getgroupid = await AsyncStorage.getItem('@GROUP_ID');
  //${baseurl}deletesingleMgroup?gid=16&phone=9848851443
  insertnumurl = `${baseurl}deletesingleMgroup?gid=${groupId}&phone=${SingleParticipateNumbers}`;
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

//Get Added participates 
const getAddedparticipates = async (usermobile , groupId) => {
  // const usermobilenumber = await AsyncStorage.getItem('userMobileNumber'); //User Login Mobile number
  // const  getgroupid = await AsyncStorage.getItem('@GROUP_ID');   //Group_id
  const url = `${baseurl}viewgroupM?phone=${usermobile}&gid=${groupId}`;
  try {
      const response = await fetch(url);
      const updatenum = await response.json();
      const jsonres = JSON.parse(JSON.stringify(updatenum));
      console.log(jsonres, '######json result####---------------')
      const getupdnum = jsonres.messages.success;
      console.log(getupdnum, 'getupdnum ....json flatlist');
      setUpddata(getupdnum);
      console.log(updnumdata, 'this canb eused in flatlist');
      const phoneNumber = updnumdata.map(function (el) { return el.phone_number; });
      console.log(phoneNumber, 'DELETED NUMBER');
      const deleteuserM = phoneNumber;
      console.log(deleteuserM, 'DELETEUSER SINGLE NUMBER')
      const groupmembernumber = deleteuserM.toString();
      const countofnumbers = deleteuserM.length;
      setcountofquickcallusers(countofnumbers);
      // await AsyncStorage.setItem('@DELETE_GROUPMEMBER' , phoneNumber);
      //console.log(StoredDeleteNumber , 'ASYNCSTORAGE DELETE NUMBER')
      console.log(updnumdata.map(function (el) { return el.phone_number; }), 'UPD PHONE NUMBER');
      const getphonenumber = getupdnum.map(function (el) { return el.phone_number; });
      const participatephonenumbers = JSON.stringify(getphonenumber);
      console.log(participatephonenumbers, 'getphonenumber......!!!!');
      console.log(JSON.stringify(getphonenumber), 'getupdnum....flat.');
      const usersresult = JSON.stringify(getphonenumber);
      //setUpdatednumbers(usersresult);
      console.log(usersresult, 'userresult-------------');
      // setLoading(false);
      //setUpdatednumbers(participatephonenumbers);
      //console.log(updatednumbers, 'ok array');

  } catch (error) {
      console.log(error);
  }
}

//delete all members based on user id
const deleteallquicnumbers = async () => {
  const deleteallurl = `${baseurl}deleteallsingleuser?&uid=1`;
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

//Onsubmit
 //Onsubmit Edit Function
 const onEditabledone = async (usermobile , dialNumber) => {
  // const usermobilenumber = await AsyncStorage.getItem('userMobileNumber'); //User Login Mobile number
  // const  getgroupid = await AsyncStorage.getItem('@GROUP_ID');   //Group_id
  insertnumurl = `${baseurl}addgroupM?mobile=${usermobile}&gid=${getgroupid}&phone=${dialNumber}`;
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
      // console.log(obj, '----obj');
      const received_group_id = obj.messages.group_id;
      console.log(received_group_id, '.hello..........received group id.123...//////....');
      const received_success = obj.messages.success;
      console.log(received_success, 'received success/////////');
      if (received_success) {
          Alert.alert(received_success);
          getAddedparticipates();
          // setSearchContacts('')
          setSearch('');
          //update mobile numbers
          //clearooutparticipateinput(); //This will clear out the input box
          setParticipateNumber(dialNumber);
          console.log(participatenumber, 'saved participate number....................');
          // clearEditable(); // it can clear out the dialnumber  input
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

    return (
               <CallsContext.Provider
               value={{ 
                //Functions Here
                Makecall,
                Mutecall,
                HangupGroup,
                Hangupsinglecall,
                getrechargestatus,
                fetchlivegroupmembers,
                deleteallgroupmembers,
                deleteparticipatenumber,
                getAddedparticipates,
                deleteallquicnumbers, //Temperary
                onEditabledone,
                //states
                groupmembers,
                countofquickcallusers,
                updnumdata,
                participatenumber,
                search,
                setSearch,
                usercount ,
                loading,
               }}>
                {children}
               </CallsContext.Provider>
            );
}