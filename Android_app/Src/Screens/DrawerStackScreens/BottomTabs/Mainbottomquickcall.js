import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useContext } from 'react'
import Iconic from 'react-native-vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Quickmembers from './Quickmembers';


import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionic from 'react-native-vector-icons/Ionicons';
import Fa from 'react-native-vector-icons/FontAwesome';
import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
import Hangupall from './Hangupall';

import { CallsContext } from '../../../Context/CallsContext';
import { MyContext } from '../../../Context/Severcontext';

const Mainbottomquickcall = (props) => {
const quickmem = props.quickcallmembers;
const Oncallercountstatus = props.oncallercount;
const {baseurl} = useContext(MyContext);
  const Tab = createBottomTabNavigator();
  return (
    <>
      <Tab.Navigator
        initialRouteName="quickmembers"
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#192a53',
          tabBarActiveBackgroundColor: '#192a53',
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen name="quickmembers" children={()=><Quickmembers  quickcalls = {quickmem} onCallercount={Oncallercountstatus }/>}
          options={{
            header: () => null,
            tabBarLabel: 'group',
            tabBarIcon: ({ color, size }) => (
              <Ionic name="people" color={color} size={size} />
            ),

          }}

        />
      </Tab.Navigator>
    </>
  )
}

export default Mainbottomquickcall

const styles = StyleSheet.create({})