
//it can be revived


/////////////////drawer section home code 


// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     FlatList,
//     Dimensions,
//     ActivityIndicator
//   } from "react-native";
//   import React, { useState, useEffect } from "react";
  
//   import SearchBar from "react-native-dynamic-search-bar";
  
//   import FloatingButtons from "./FloatingButtons";
  
//   import * as Animatable from "react-native-animatable";
//   import FontAwesome from 'react-native-vector-icons/FontAwesome'; //exporting through expo/vector-icons
//   // import AntDesign from "react-native-vector-icons/AntDesign";
//   // import Ionicons from 'react-native-vector-icons/Ionicons';
//   // import Fontisto from 'react-native-vector-icons/Fontisto';
//   // import Octicons from 'react-native-vector-icons/Octicons';
//   // import { out } from "react-native/Libraries/Animated/Easing";
  
//   //import Drawerhomeuserssearchscreen from "./Drawerhomeusersearchscreen" //searchbar
  
//   //import FloatingButtons from "./FloatingButtons";
//   //import EmptyBoard from "./EmptyBoard";
  
//   /////Dimensions//////
//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;
//   /////////users dummy list//////
  
  
  
//   const DrawerHome = (props) => {
  
//     const [data, setData] = useState();
//     const [loading, setLoading] = useState(true);
//     //const [isempty, setIsnotempty] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     //all users fetch api
//     // useEffect(() => {
//     //   fetch(`${baseurl}viewgroup?gid=1&mobile=9848851443`)
//     //   .then((response) => response.json())
//     //   .then((json) => setData(json))
//     //   .then(console.log(json))
//     //   .catch((error) => console.log(error))
//     //   .finally(setLoading(false));
//     // },[]);
  
//     //getuserdata
//     //https://jsonplaceholder.typicode.com/users
//     const getuserdata = async () => {
//       const usersapi = `${baseurl}viewusergroups?mobile=9848851443`;
//       try {
//         const response = await fetch(usersapi);
//         const usersjson = await response.json();
//         const jsonres = await JSON.parse(JSON.stringify(usersjson));
//         const usersresult = jsonres.messages.success;
//         setData(usersresult);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//       }
  
//     };
  
//     //display when loaded by useeffect
//     useEffect(() => {
//       getuserdata();
//     }, [])
  
//     return (
//       <>
//         {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#192a53" /></View>)
//           :
//           (
//             <View style={[styles.container, { flexDirection: "column" }]}>
//               <View style={styles.drawerhomeheader}>
//                 <View style={styles.drawerhometop}>
//                   <View style={{ flexDirection: "row" }}>
//                     <FontAwesome
//                       name="sliders"
//                       color="#fff"
//                       size={30}
//                       style={{ marginHorizontal: 10 }}
//                       onPress={() => {
//                         props.navigation.toggleDrawer();
//                       }}
//                     />
//                   </View>
//                   <View >
//                     <SearchBar
//                       placeholder="Search here"
//                       shadowColor="#282828"
//                       iconColor="#c6c6c6"
//                       onChangeText={(text) => console.log('hello world')}
                     
//                     />
//                   </View>
//                 </View>
  
//                 <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
//                   <Text
//                     style={{
//                       color: "#fff",
//                       fontSize: 12,
//                       width: windowWidth - 10,
//                       textAlign: 'center'
  
//                     }}
//                   >
//                     Today's Balance is 15 grptalk Minutes Trail Expires in 7 days.
//                     Lets , <Text style={styles.register}>Recharge Here </Text>
//                   </Text>
//                 </View>
//               </View>
//               <View style={styles.drawerhomefooter}>
//                 <FlatList
//                   data={data}
//                    keyExtractor={item => item.group_id}
//                   renderItem={({ item }) => {
//                     return (
//                       <View>
//                         <View style={styles.userslistbox}>
//                           <View>
//                             <Image
//                               style={styles.drawerboardusersimage}
//                               source={require('../../Assets/user.png')}
//                             />
//                           </View>
//                           <View style={{ flexDirection: "column" }}>
//                             <Text style={{ fontWeight: "bold", color: "#000" }}>{item.group_name}</Text>
//                             <Text style={{ fontSize: 14, color: "#000" }}>
//                               Last call on {item.created_on}.
//                             </Text>
//                             <Text>{item.group_name}</Text>
//                           </View>
//                         </View>
//                       </View>
//                     );
//                   }}
//                 />
//               </View>
//               <FloatingButtons style={{ bottom: 80 }} {...props} />
//             </View>
//           )
//         }
//       </>
//     );
//   };
  
//   export default DrawerHome;
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "#192a53",
//     },
//     drawerhomeheader: {
//       flex: 1,
//       flexDirection: "column",
//     },
//     drawerhomefooter: {
//       flex: 4,
//       backgroundColor: "#fff",
//       borderTopRightRadius: 40,
//       borderTopLeftRadius: 40,
//     },
//     drawerhometop: {
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "space-around",
//       paddingVertical: 20,
//     },
//     logocss: {
//       fontWeight: "bold",
//       fontSize: 18,
//       color: "#fff",
//       marginHorizontal: 20,
//     },
//     register: {
//       fontSize: 18,
//       fontWeight: "bold",
//       color: "steelblue",
//       borderBottomWidth: 1,
//       borderColor: "#fff"
//     },
//     drawerboardusersimage: {
//       width: 50,
//       height: 50,
//       marginHorizontal: 10,
//       opacity: 0.77,
//     },
//     userslistbox: {
//       margin: 0,
//       flexDirection: "row",
//       justifyContent: "space-around",
//       borderBottomColor: "grey",
//       borderBottomWidth: 1,
//       paddingVertical: 10,
//     },
//     searchbar: {
//       height: 30,
//       borderWidth: 1,
//       borderColor: "#fff",
//       width: 200,
//       borderRadius: 12,
//       paddingLeft: 12,
//       backgroundColor: "#fff",
//     },
//   });



/////////////////////////APP.JS////////////////////////
// import 'react-native-gesture-handler';
// import 'react-native-gesture-handler';  //it will optimize the render
// import { StyleSheet, Text, View, RefreshControl, ScrollView } from 'react-native'
// import React, { useMemo, useReducer, useState, useEffect } from 'react'
// import { NavigationContainer } from '@react-navigation/native';

// import RootStackScreen from './Src/Screens/RootSctackScreens/RootStackScreen'
// import DrawerStackScreen from './Src/Screens/DrawerStackScreens/DrawerStackScreen';
// import MainDrawerStackScreen from './Src/Screens/DrawerStackScreens/MainDrawerStackScreen';

// import { ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';



// //refresh control
// const wait = (timeout) => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// }
// const App = ({ naviagtion }) => {


//   //const[isLoading , setIsLoading] = useState(true);
//   //const[userToken , setUserToken] = useState(null);

//   const [refreshing, setRefreshing] = React.useState(false);

//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     wait(2000).then(() => setRefreshing(false));
//   }, []);

//   initialLoginState = {
//     isLoading: true,
//     mobile: null,
//     userToken: null,
//   };

//   const loginReducer = (prevState, action) => {
//     switch (action.type) {
//       case 'RETRIEVE_TOKEN':
//         return {
//           ...prevState,
//           userToken: action.token,
//           isLoading: false,
//         };
//       case 'LOGIN':
//         return {
//           ...prevState,
//           mobile: action.id,
//           userToken: action.token,
//           isLoading: false,
//         };
//       case 'LOGOUT':
//         return {
//           ...prevState,
//           mobile: null,
//           userToken: null,
//           isLoading: false,
//         };

//     }
//   };

//   const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)


//   const authContext = useMemo(() => ({
//     signIn: async (userInfo) => {

//       let userToken = null;
//       let mobile = null;

//       console.log(userInfo, '---userInfo');

//       if (userInfo.token) { userToken = userInfo.token; }
//       if (userInfo.mobile) { mobile = userInfo.mobile; }
//       AsyncStorage.setItem('userToken', userToken);
//       console.log(userToken, mobile, '---mobile - userToken');
//       dispatch({ type: 'LOGIN', id: mobile, token: userToken });

//       setTimeout(function () { console.log(loginState); }, 2000);
//     },
//     signOut: async () => {
//       try {
//         await AsyncStorage.removeItem('userToken');
//       } catch (e) {
//         console.log(e);
//       }
//       dispatch({ type: 'LOGOUT' });
//     },


//   }), []);


//   /*if(loginState.isLoading) {
//     return(
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor:"grey", color: "#fff" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }*/
//   const [initialLoading, setInitialLoading] = useState(true)
//   return (
//        <AuthContext.Provider value={authContext}>
//       <NavigationContainer>
//         {
//           !loginState.userToken ? (
//             <RootStackScreen />
//           )
//             :
//             (
//               <MainDrawerStackScreen />
//             )
//         }

//       </NavigationContainer>
//     </AuthContext.Provider>
//   );
// }



// export default App;

// const styles = StyleSheet.create({})






//home screen drawer backup -----23122022

// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     FlatList,
//     Dimensions,
//     ActivityIndicator,
//     RefreshControl,
//     Alert
//   } from "react-native";
//   import React, { useState, useEffect } from "react";
//   import SearchBar from "react-native-dynamic-search-bar";
//   import AsyncStorage from '@react-native-async-storage/async-storage';
//   import FloatingButtons from "./FloatingButtons";
//   //import * as Animatable from "react-native-animatable";
//   import FontAwesome from 'react-native-vector-icons/FontAwesome'; //exporting through expo/vector-icons
//   // import AntDesign from "react-native-vector-icons/AntDesign";
//   // import Ionicons from 'react-native-vector-icons/Ionicons';
//   // import Fontisto from 'react-native-vector-icons/Fontisto';
//   // import Octicons from 'react-native-vector-icons/Octicons';
//   // import { out } from "react-native/Libraries/Animated/Easing";
  
//   //import Drawerhomeuserssearchscreen from "./Drawerhomeusersearchscreen" //searchbar
  
//   //import FloatingButtons from "./FloatingButtons";
//   //import EmptyBoard from "./EmptyBoard";
  
//   /////Dimensions//////
//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;
  
  
//   const DrawerHome = (props) => {
  
//     const [data, setData] = useState();
//     const [loading, setLoading] = useState(true);
//     //const [isempty, setIsnotempty] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [userToken , setUserToken] = useState('');
//     const [getmobilenumber , setGetMobilenumber] = useState("");
//     const [username , setUserName] = useState("")
//     const [userdatafetch , setUserDataFetch] = useState("");
    
//     //get user token here from otp screen through asyncstorage
//     useEffect(() => {
//       (async () => {
        
//           let getusermobilenumber = await AsyncStorage.getItem('userMobileNumber');
//           setGetMobilenumber(getusermobilenumber);
  
//           let userToken = await AsyncStorage.getItem('usertoken');
//           setUserToken(userToken);
  
//           let getusername = await AsyncStorage.getItem('userName');
//           setUserName(getusername);
  
//           await getuserdata();
  
//           console.log(JSON.stringify(getmobilenumber) , '.$$$$njjd..#nk####.....hello world....usermobile getting from sign via otp to here.....testing.....');
//           console.log(username , 'user##srllll##@@jj@@@@@2222 name got fro asynoge from sign in screen########');
//       })();
      
//   }, []);
  
//     //display data when loaded by useeffect
    
//     // useEffect(() => {
//     //   const interval = setInterval(() => {
       
//     //   }, 1000);
//     //   return () => clearInterval(interval);
//     // } , []);
  
    
  
//     const getuserdata = async () => {
//       const usersapi = `${baseurl}viewusergroups?mobile=${getmobilenumber}`;
//       try {
//         const response = await fetch(usersapi);
//         const usersjson = await response.json();
//         const jsonres = await JSON.parse(JSON.stringify(usersjson));
//         const usersresult = jsonres.messages.success;
//         setData(usersresult);
//         //console.log(usersresult);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//       }
  
//     };
  
  
  
//     return (
//       <>
//         {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#192a53" /></View>)
//           :
//           (
//             <View style={[styles.container, { flexDirection: "column" }]}>
//               <View style={styles.drawerhomeheader}>
//                 <View style={styles.drawerhometop}>
//                   <View style={{ flexDirection: "row" }}>
//                     <FontAwesome
//                       name="sliders"
//                       color="#fff"
//                       size={30}
//                       style={{ marginHorizontal: 10 }}
//                       onPress={() => {
//                         props.navigation.toggleDrawer();
//                       }}
//                     />
//                   </View>
//                   <View >
//                     <SearchBar
//                       placeholder="Search here"
//                       shadowColor="#282828"
//                       iconColor="#c6c6c6"
//                       cancelIconColor="#fff"
//                       value={searchTerm}
//                       onChangeText={(text) => setSearchTerm(text)}
//                     />
//                   </View>
//                 </View>
  
//                 <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
//                   <Text
//                     style={{
//                       color: "#fff",
//                       fontSize: 12,
//                       width: windowWidth - 10,
//                       textAlign: 'center'
  
//                     }}
//                   >
//                     Today's Balance is 15 grptalk Minutes Trail Expires in 7 days.
//                     Lets , <Text style={styles.register}>Recharge Here </Text>
//                   </Text>
//                 </View>
//               </View>
//               <View style={styles.drawerhomefooter}>
//                 <FlatList
//                   data={data}
//                    //keyExtractor={item => item.group_id}
//                   renderItem={({ item }) => {
//                     if(searchTerm === ""){
//                       return (
//                         <View>
//                         <View style={styles.userslistbox}>
//                           <View>
//                             <Image
//                               style={styles.drawerboardusersimage}
//                               source={require('../../Assets/user.png')}
//                             />
//                           </View>
//                           <View style={{ flexDirection: "column" }}>
//                             <Text style={{ fontWeight: "bold", color: "#000" }}>{item.group_name}</Text>
//                             <Text style={{ fontSize: 14, color: "#000" }}>
//                               Last call on {item.created_on}.
//                             </Text>
//                             <Text>{item.group_name}</Text>
//                           </View>
//                         </View>
//                       </View>
//                       )
//                     }
  
//                     if(item.group_name.toLowerCase().includes(searchTerm.toLowerCase())){
//                       return (
//                         <View>
//                         <View style={styles.userslistbox}>
//                           <View>
//                             <Image
//                               style={styles.drawerboardusersimage}
//                               source={require('../../Assets/user.png')}
//                             />
//                           </View>
//                           <View style={{ flexDirection: "column" }}>
//                             <Text style={{ fontWeight: "bold", color: "#000" }}>{item.group_name}</Text>
//                             <Text style={{ fontSize: 14, color: "#000" }}>
//                               Last call on {item.created_on}.
//                             </Text>
//                             <Text>{item.group_name}</Text>
//                           </View>
//                         </View>
//                       </View>
//                       )
//                     }
                    
//                   }}
//                 />
//               </View>
//               <FloatingButtons style={{ bottom: 80 }} {...props} />
//             </View>
//           )
//         }
//       </>
//     );
//   };
  
//   export default DrawerHome;
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "#192a53",
//     },
//     drawerhomeheader: {
//       flex: 1,
//       flexDirection: "column",
//     },
//     drawerhomefooter: {
//       flex: 4,
//       backgroundColor: "#fff",
//       borderTopRightRadius: 40,
//       borderTopLeftRadius: 40,
//     },
//     drawerhometop: {
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "space-around",
//       paddingVertical: 20,
//     },
//     logocss: {
//       fontWeight: "bold",
//       fontSize: 18,
//       color: "#fff",
//       marginHorizontal: 20,
//     },
//     register: {
//       fontSize: 18,
//       fontWeight: "bold",
//       color: "steelblue",
//       borderBottomWidth: 1,
//       borderColor: "#fff"
//     },
//     drawerboardusersimage: {
//       width: 50,
//       height: 50,
//       marginHorizontal: 10,
//       opacity: 0.77,
//     },
//     userslistbox: {
//       margin: 0,
//       flexDirection: "row",
//       justifyContent: "space-around",
//       borderBottomColor: "grey",
//       borderBottomWidth: 1,
//       paddingVertical: 10,
//     },
//     searchbar: {
//       height: 30,
//       borderWidth: 1,
//       borderColor: "#fff",
//       width: 200,
//       borderRadius: 12,
//       paddingLeft: 12,
//       backgroundColor: "#fff",
//     },
//   });
  
  