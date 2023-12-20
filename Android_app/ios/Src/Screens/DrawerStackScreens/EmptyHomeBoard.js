import { StyleSheet, Text, View, Image , Dimensions , RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
/////Dimensions//////
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const EmptyHomeBoard = () => {
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
             <View><Text style={{ fontSize: 22, color: "#192a53", fontWeight: "500" }}>Welcome To ConvoxMeet</Text></View>
            <Image source={require('../../Assets/Emptyboard.jpg')} style={styles.imagesize} />
            <View><Text style={{ fontSize: 22, color: "#192a53", fontWeight: "500" }}>Your Board is Empty</Text></View>
            <View><Text style={{
                fontSize: 16, color: "#000", fontWeight: "300", textAlign: 'center',  width: windowWidth - 10,
                justifyContent: 'center',
                alignItems: 'center' , marginTop: 10,
            }}>Create a Group and Schedule Your Conference Call Now.</Text></View>
        </View>
    )
}

export default EmptyHomeBoard

const styles = StyleSheet.create({
    imagesize: {
        width: 300,
        height: 300
    }
})