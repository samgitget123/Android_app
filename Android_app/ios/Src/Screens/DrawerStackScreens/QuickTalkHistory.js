import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, loading, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from '../../Context/Severcontext';
import Antdesign from 'react-native-vector-icons/AntDesign';
const QuickTalkHistory = ({ navigation }, props) => {
  const [quickdata, setQuickdata] = useState({});
  const [quickinfo, setquickinfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const { baseurl } = useContext(MyContext);
  const [refreshing, setRefreshing] = useState(false);
  const [useridnum, useridnumber] = useState('');
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  useEffect(() => {
    (async () => {
      const userid = await AsyncStorage.getItem('USERIDNUMBER');
      useridnumber(userid);
      await fetchdata();
    })();
  }, []);
  //fetch quick history
  const fetchdata = async () => {
    try {
      const userid = await AsyncStorage.getItem('USERIDNUMBER');
      console.log(userid, 'USER ID IN QUICK TALK HISTORY!!!!');
      // const quickidlist = seriallist[0];
      // console.log(quickidlist, 'quick id=========hello===>>>>>')
      // const quickid = quickidlist.id;
      // console.log(quickid, 'quickid');
     //const quicklist = `${baseurl}viewsingleusers?uid=${useridnum}&quickid=13`
      const quicklist = `${baseurl}viewquicklist?uid=${useridnum}`
      console.log(quicklist, 'QUICK LIST');
      const response = await fetch(quicklist);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      console.log(jsonres, 'JSON RES');
      const quickdata = jsonres.messages.success;
      setquickinfo(quickdata);
      console.log(quickinfo, 'quick information')
    } catch (error) {
      console.log(error);
    }
  }
  const EmptyListMessage = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
         <View><Text style={{ fontSize: 22, color: "grey", fontWeight: "300" }}>Scroll Down for Refresh....</Text></View>
        <View><Text style={{ fontSize: 22, color: "#192a53", fontWeight: "500" }}>Empty Quickcalls</Text></View>
        <Image source={require('../../Assets/Emptyboard.jpg')} style={styles.imagesize} />
        <View><Text style={{ fontSize: 22, color: "#192a53", fontWeight: "500" }}>No quick calls yet</Text></View>
      </View>
    );
  };
  //delete single user calls
  const deleteparticipatenumber = async (SingleUserNumbers) => {
    const userid = await AsyncStorage.getItem('USERIDNUMBER');
    insertnumurl = `${baseurl}deletesingleuser?phone_number=${SingleUserNumbers}&uid=${useridnum}`;
    console.log(insertnumurl, 'deleted url');

    try {
      const response = await fetch(
        insertnumurl
      );
      const res = await response.json();
      console.log(res, 'RES')
      const obj = JSON.parse(JSON.stringify(res));
      console.log(obj.messages.success, '----obj');
      const Result = obj.messages.success;
      await fetchdata();
    } catch (error) {
      console.error(error);
    }

  }
  //delete all single quick contacts
  const deleteallquicnumbers = async () => {
    const userid = await AsyncStorage.getItem('USERIDNUMBER');
    const deleteallurl = `${baseurl}deleteallsingleuser?&uid=${useridnum}`;
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
      await fetchdata();
    } catch (error) {
      console.error(error);
    }

  }
  //refresh
  // const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 1000);
  // }, []);
  return (
    <>
      <View style={[styles.container, { flexDirection: "column" }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.maincontainer}>
          <View style={styles.topcontainer}>
            <View style={{ padding: 30 }}>
              <TouchableOpacity onPress={() => {
                navigation.goBack();
              }}>
                <Image
                  source={require('../../Assets/arrow.png')}
                  style={styles.arraowimage}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomcontainer}>
            <View style={styles.viewbox}>
              <Text style={{ fontWeight: "500", marginBottom: 10, color: "#192a53", textAlign: "center" }}>Quictalks Lists</Text>
              <TouchableOpacity onPress={() => {
                deleteallquicnumbers();
              }}>
                <Text style={{ color: "red" }}>Delete All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={quickinfo}
              ListEmptyComponent={EmptyListMessage}
              keyExtractor={(item) => item.id}
              onRefresh={() => { fetchdata() }}
              refreshing={loading}
              renderItem={({ item, index }) => {
                return (
                  <>
                    <View>

                      <View >
                        <View style={styles.bottomViewbox}>
                         <View>
                         <Text style={{ fontWeight: "500", marginBottom: 10, color: "#192a53" }}>{item.contact_display_name?.slice(0, 15)}</Text>
                          <Text>{item.phone_number}</Text>
                         </View>
                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                deleteparticipatenumber(item.phone_number);
                              }}
                            >
                              <Antdesign
                                name="delete"
                                color="#000"
                                size={22}
                                style={{ marginLeft: 20 }}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>

                    </View>
                  </>
                )
              }}
            />
          </View>
        </View>
      </View>
    </>
  )
}

export default QuickTalkHistory;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#192a53',
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#192a53",
  },
  topcontainer: {
    flex: 1,
    backgroundColor: "#192a53",
  },
  bottomcontainer: {
    flex: 6,
    backgroundColor: "#E7E9EB",
    padding: 20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  viewbox: {
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    marginTop: 20
  },
  bottomViewbox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 12,
    marginTop: 2
  },
  arraowimage: {
    width: 30,
    height: 30
  },
  imagesize: {
    width: 300,
    height: 300
  },
})