import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

//customization
import CustomDrawer from './CustomDrawer';



//icons
import Fonticons from 'react-native-vector-icons/FontAwesome'
import Anticon from 'react-native-vector-icons/AntDesign'


const Drawer = createDrawerNavigator();

const IndexScreen = () => {
    return (

        <Drawer.Navigator initialRouteName="Home"
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
            
        </Drawer.Navigator>

    );
}

export default IndexScreen;