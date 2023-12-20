import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'


const RechargeScreen = ({ navigation }) => {
  const [contactDetails, setcontactDetails] = useState([]);
  useEffect(() => {
    (async () => {
      const get_contcat_details = '${baseurl}contactus';
      console.log(get_contcat_details, "Adrress");
      try {
        const response = await fetch(get_contcat_details);
        console.log(response, 'RESPONSE');
        const usersjson = await response.json();
        const jsonres = JSON.parse(JSON.stringify(usersjson));
        console.log(jsonres, 'JSONRES');
        const conmessage = jsonres.messages;
        console.log(conmessage, 'Usermesssage');
        const getdata = JSON.parse(conmessage.data);
        console.log(getdata, 'Data----------------')
        setcontactDetails(getdata);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
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
          <View style={{backgroundColor:"#192a53" , padding:15 , borderRadius:22 , }}>
            <View>
                <View style={{justifyContent:"center" , alignItems:"center"}}><Text style={styles.textcardheader}>{contactDetails.companyname}</Text></View>
                <View style={{flexDirection:"row" , justifyContent:"space-evenly" , marginTop:10}}>
                  <View>
                      <Text style={styles.textcard}>Company</Text>
                      <Text style={styles.textcard}>Address</Text>
                      <Text style={styles.textcard}>Email</Text>
                      <Text style={styles.textcard}>Phone</Text>
                  </View>
                  <View>
                      <Text style={styles.textcards}>{contactDetails.companyname}</Text>
                      <Text style={styles.textcards}>{contactDetails.address}</Text>
                      <Text style={styles.textcards}>{contactDetails.email_id}</Text>
                      <Text style={styles.textcards}>{contactDetails.contacts}</Text>
                  </View>
                </View>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default RechargeScreen

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
    flex: 6,
    backgroundColor: "#fff",
    padding: 20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  arraowimage: {
    width: 30,
    height: 30
  },
  textcardheader:{
    color:"#fff",
    fontSize:22,
    fontWeight:"500"
  },
  textcard:{
    color:"#fff",
    fontSize:16,
    fontWeight:"300",
    marginVertical:5
  },
  textcards:{
    color:"#fff",
    fontSize:16,
    fontWeight:"100",
    marginVertical:5
  }


})