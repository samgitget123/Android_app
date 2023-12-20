import { StyleSheet } from 'react-native'
import React from 'react'

//drawer main screeen
import DrawerStackScreen from './DrawerStackScreen';
import CustomDrawer from './CustomDrawer';
import CreateGroup from './CreateGroup';
import CreateGroupExt from './CreateGroupExt';
import Addcallextinit from './Addcallextinit';
import Schedulecall from './Schedulecall';
import ContactList from './ContactList';
import QuickTalks from './QuickTalks';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GroupsViewScreen from './GroupsViewScreen';
import RechargeScreen from './RechargeScreen';
import CallInitialisingScreens from './CallInitialisingScreens';
import Callinitialisationquickcalls from './Callinitialisationquickcalls';
import Updategroupmembers from './Updategroupmembers';


// <DrawerStack.Screen name="DrawerStack"  component={() => <DrawerStackScreen useridnum={useridnum}/>}  options={
 // { header: () => null }
//} />
// import MainBottomTabs from './BottomTabs/MainBottomTabs';
const DrawerStack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
//groupIdN
const MainDrawerStackScreen = (props) => {
  const useridnum = props.userId;
  // console.log(useridnum , 'USER ID NUMBER------Maindraewr------');
  return (
    <>
      <DrawerStack.Navigator initialRouteName='DrawerStack' headerMode="none">
        <DrawerStack.Screen name="DrawerStack" options={
        {header: () => null }}>
        {(props) => (
        <DrawerStackScreen
        useridnumber={useridnum}
        />
        )}
        </DrawerStack.Screen>
        <DrawerStack.Screen name="CustomScreen" component={CustomDrawer} />
        <DrawerStack.Screen name="creategroup" component={CreateGroup} options={{ title: null  }} />
        <DrawerStack.Screen name="creategroupnext" component={CreateGroupExt} options={{ title: null, header: () => null  }} />
        <DrawerStack.Screen name="Addcall" component={Addcallextinit} options={{ title: null, header: () => null  }} />
        <DrawerStack.Screen name="Schedulecalls" component={Schedulecall} options={{ title: null, header: () => null  }} />
        <DrawerStack.Screen name="contactslist" component={ContactList} options={{ title: null, header: () => null  }} />
        <DrawerStack.Screen name="Updategroupmembers" component={Updategroupmembers } options={{ title: null, header: () => null  }} />
        <DrawerStack.Screen name="QuickTalks" component={QuickTalks} options={{ title: null, header: () => null  }} />
        <DrawerStack.Screen name="ViewGroups" component={GroupsViewScreen} options={{ title: null, header: () => null  }} />
        <DrawerStack.Screen name="Initialcallscreens" component={CallInitialisingScreens} options={{ title: null, header: () => null }} />
        <DrawerStack.Screen name="QuickcallLivescreen" component={Callinitialisationquickcalls} options={{ title: null, header: () => null }} />
        <DrawerStack.Screen name="Recharge" component={RechargeScreen} options={{ title: null, header: () => null }} />
      </DrawerStack.Navigator>
    </>

  )
}




export default MainDrawerStackScreen;




const styles = StyleSheet.create({})