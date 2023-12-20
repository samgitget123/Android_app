import { StyleSheet , Vibration} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Groupmembers from './Groupmembers';
import Handrise from './Handrise';
import MuteScreen from './MuteScreen';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionic from 'react-native-vector-icons/Ionicons';
import Fa from 'react-native-vector-icons/FontAwesome';
import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
import Hangupall from './Hangupall';
//blink
import Blink from '../../../Components/Blink';
import { MyContext } from '../../../Context/Severcontext';
const MainBottomTabs = (props) => {
  const groupid = props.groupid;
  const Groupname = props.groupname;
  const Useridnum = props.Userid;
  const Usermobilenumber = props.UserMobileNumber;
 const groupusercallers =  props.groupcallstatus;   //group callers
//  const handrisenotify = props.handrisecount;
//  const handrisemem = props.handrisemembers;
 const {baseurl} = useContext(MyContext);
//  console.log(groupusercallers , 'Groupstatus-------------------');
 const Oncallercountstatus = props.oncallercount;
//  const groupmutestatus = props.mutecallstatus;
  const grouphandrisestatus = props.handrisestatus;
  //console.log(grouphandrisestatus , '--------------******grouphandrisestatus******--------------------')
//  const hangupcallerlists = props.haguplists;
//  const Livecallidnumber = props.Livecallid;
const [handriselist, setHandriselist] = useState(0);
//handrise active
useEffect(()=>{
  risefilters();
},[]);
const risefilters = () => {
  const Handrisings =  props.groupcallstatus;
  const Filterhandriselists = Handrisings.filter(item=>item.hand_raise_flag == 1);
  console.log(Filterhandriselists , '----------------------------------------------hello---------------')
  // setHandriselist(Filterhandriselists);
  const getcount = Filterhandriselists.length;
  console.log(getcount , 'count of handrisings==========>');
 
  // setLoading(false)
}
  //state
  const [mute, unmute] = useState(true);
  const Tab = createBottomTabNavigator();
  //vibration
  const vibrate = () =>{
    Vibration.vibrate(100);
  }
  return (
    <>
      <Tab.Navigator
        initialRouteName="groupmembers"
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#192a53',
          tabBarActiveBackgroundColor: '#192a53',
          tabBarShowLabel: false,
          tabBarBadgeStyle: { color: '#fff' , backgroundColor:"red"}
        }}
       
      >
        <Tab.Screen name="groupmembers" children={()=><Groupmembers  groupcallers = {groupusercallers} 
        groupId = {groupid} userId = {Useridnum}  Usermobile = {Usermobilenumber} Groupname = {Groupname}
         />}
          options={{
            header: () => null,
            tabBarLabel: 'group',
            tabBarIcon: ({ color, size }) => (
              <Ionic name="people" color={color} size={size} />
            ),
            tabBarBadge: groupusercallers?.length,
          }}
        />
        <Tab.Screen name="handrise" children={()=><Handrise  groupcallers = {groupusercallers} oncallercount = {Oncallercountstatus} handrises={grouphandrisestatus} />}  
          options={{
            header: () => null,
            tabBarLabel: 'handrise',
            tabBarIcon: ({ color, size }) => (
             (groupusercallers?.filter(item => item.hand_raise_flag == 1 && item.status != 'DISCONNECTED').length > 0)?(<Blink duration={500}><Ionic name="hand-right-outline" color={color} size={size} /></Blink>):(<Ionic name="hand-right-outline" color={color} size={size} />)
            ),
            tabBarBadge: groupusercallers?.filter(item => item.hand_raise_flag == 1 && item.status != 'DISCONNECTED').length,
          }}
        />
        <Tab.Screen name="mutescreen" children={()=><MuteScreen  groupcallers = {groupusercallers} oncallercount = {Oncallercountstatus} />}   
          options={{
            header: () => null,
            tabBarLabel: 'off/on',
            tabBarIcon: ({ color, size }) => (
                <Fa name="microphone-slash" color={color} size={size} />
            ),
            tabBarBadge: groupusercallers?.filter(item => item.mute_flag == 1 && item.status != 'DISCONNECTED').length,
          }}
        />
        <Tab.Screen name="hangupall" children={()=><Hangupall groupcallers = {groupusercallers} oncallercount = {Oncallercountstatus} Groupid = {groupid} Userid = {Useridnum} UserMobilenumber = {Usermobilenumber} />}
          // initialParams={{ groupid: props.value }}
          options={{
            header: () => null,
            tabBarLabel: 'hangup',
            tabBarIcon: ({ color, size }) => (
              <Mc name="phone-hangup" color={color} size={size}

              />
            ),
            tabBarBadge: groupusercallers?.filter(item => item.status == 'DISCONNECTED').length,

          }}
        />

      </Tab.Navigator>
    </>
  )
}

export default MainBottomTabs

const styles = StyleSheet.create({})