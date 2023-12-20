import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from './Settings';
import QuickTalkHistory from './QuickTalkHistory';
import UserGuide from './UserGuide';
import RequestCallback from './RequestCallback';
import Convoxmeet_web_scan from './Convoxmeet_web_scan';
import FAQ from './FAQ';
import ContactUs from './ContactUs';
const Drawer = createDrawerNavigator();
import CustomDrawer from './CustomDrawer';



//icons

import Fonticons from 'react-native-vector-icons/FontAwesome'
import Ionics from 'react-native-vector-icons/Ionicons'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import Ant from 'react-native-vector-icons/AntDesign'
import DrawerHome from './Home';


const DrawerStackScreen = (props) => {
  // console.log(props.useridnumber, 'USERID NUM IN DRAWERSTACK SCREEN========');
  // console.log(props, 'USERIDsNUM IN DRAWERSTACK SCREEN========');

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions=
      {{
        headershown: false,
        drawerActiveBackgroundColor: '#192a53',
        drawerInactiveTintColor: '#000',
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 15
        },

      }}
    >
      <Drawer.Screen name="Home" component={DrawerHome}
        userID={({ params }) => props.useridnumber}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Fonticons name="globe" size={25} color="#000" />
          )
        }}
      />

      <Drawer.Screen name="Convoxmeet Web" component={Convoxmeet_web_scan}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Fonticons name="home" size={25} color="#ccc" />
          )
        }}
      />

      <Drawer.Screen name="Settings" component={Settings}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Ionics name="settings-outline" size={25} color="#ccc" />
          )
        }}
      />

      <Drawer.Screen name="QuickTalk History" component={QuickTalkHistory}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Ionics name="speedometer-outline" size={25} color="#ccc" />
          )
        }}
      />

      <Drawer.Screen name="User Guide" component={UserGuide}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <MCI name="television-guide" size={25} color="#ccc" />
          )
        }}
      />

      {/* <Drawer.Screen name="Request Callback" component={RequestCallback}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Ionics name="git-pull-request-sharp" size={25} color="#ccc" />
          )
        }}
      /> */}

      <Drawer.Screen name="Contact Us" component={ContactUs}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Ant name="contacts" size={25} color="#ccc" />
          )
        }}
      />

      <Drawer.Screen name="FAQ" component={FAQ}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Ant name="questioncircleo" size={25} color="#ccc" />
          )
        }}
      />


    </Drawer.Navigator>
  );
}

export default DrawerStackScreen;
