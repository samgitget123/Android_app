import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Qrscanner from './Qrscanner'
import Qrscannerweb from '../../Context/Qrscannerweb'
const Convoxmeet_web_scan = ({ navigation }) => {
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
          <View style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Text>Here we can Access the QR</Text>
            <Image
              source={require('../../Assets/qr.jpg')}
              style={{ width: 300, height: 300 }}
            />
            <Text>Scan Up...</Text>
            {/* <Qrscanner/> */}
         
          </View>
        </View>
      </View>
    </>
  )
}

export default Convoxmeet_web_scan

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
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  arraowimage: {
    width: 30,
    height: 30
  }
})