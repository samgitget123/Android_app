// import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator, FlatList } from 'react-native'
// import React, { useEffect, useState, useContext } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { CallsContext } from '../../../Context/CallsContext';
// const Quickcallgroup = () => {
//     // const { HangupGroup } = useContext(CallsContext);
//     // const {fetchlivegroupmembers} = useContext(CallsContext);
//     const {groupmembers} = useContext(CallsContext);
//     const {loading} = useContext(CallsContext);
//     const{Hangupsinglecall}  = useContext(CallsContext);
//     //states
//     const [usercount, setUserCount] = useState(0);
//     const [groupname , setGroupname] = useState('');
   
//     useEffect(()=>{
//        (async()=>{
//         try {
//             await fetchlivegroupmembers();
//                 const usergroupname = await AsyncStorage.getItem('GROUP_NAME'); //GROUP_NAME
//                 setGroupname(usergroupname)
//             } catch (error) {
//                 console.log(error);
//             }
//        })()
//     });

   
//     return (
//         <View >
//             <View>
//                 <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 20 }}>

//                     {loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#192a53" /></View>)
//                         :
//                         (
//                             <FlatList
//                                 data={groupmembers}
//                                 refreshing={loading}
//                                 renderItem={({ item }) => {
//                                     return (
//                                         <TouchableOpacity>
//                                             <View style={{
//                                                 flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 10,borderBottomColor:"grey",borderBottomWidth:0.3,paddingBottom:10

//                                             }}>
//                                                 <Image
//                                                     style={{
//                                                         width: 40,
//                                                         height: 40,
//                                                         borderRadius: 20,

//                                                     }}
//                                                     source={require('../../../Assets/avatar.png')}
//                                                 />
//                                                 <View style={{ marginHorizontal: 30 }}>
//                                                     <Text>Contact Number</Text>
//                                                     <Text style={{ fontWeight: "500", color: "#000" }}>{item.phone_number}</Text>
//                                                 </View>
//                                                 <View>
//                                                     <TouchableOpacity
//                                                         onPress={() => {
//                                                             Hangupsinglecall();
//                                                         }}
//                                                     >
//                                                         <Image
//                                                             source={require('../../../Assets/hangup.png')}
//                                                             style={{ width: 40, height: 40, borderRadius: 20 }}
//                                                         />
//                                                     </TouchableOpacity>
//                                                 </View>
//                                             </View>
//                                         </TouchableOpacity>
//                                     );
//                                 }
//                                 }
//                             />
//                         )
//                     }


//                 </View>
//             </View>
//         </View>
//     )
// }

// export default Quickcallgroup