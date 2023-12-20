import { StyleSheet, Text, View , TouchableOpacity,Image } from 'react-native'
import React from 'react'

const RequestCallback = ({navigation}) => {
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

      </View>
    </View>
  </>
  )
}

export default RequestCallback

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
  arraowimage:{
    width:30,
    height:30
  }
})