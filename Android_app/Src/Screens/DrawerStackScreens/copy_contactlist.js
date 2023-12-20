import { StyleSheet, Text, View , PermissionsAndroid ,  } from 'react-native'
import React , {useEffect} from 'react'

const ContactList = () => {
    useEffect( () => {
        (async () => {
        try {
          const androidContactPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: "Contacts Permission",
              message:
                "This app would like to view your contacts.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (androidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Contacts Permission granted");
            Contacts.getAll((andoidContactPermission, contacts) => {
              
            });
          } else {
            console.log("Contacts permission denied");
          }
        } catch (err) {
          console.log(err);
    }
    })();
    
        // return () => {
        //   second
        // }
      }, []);
  return (
    <View>
      <Text>Hello</Text>
    </View>
  )
}

export default ContactList

const styles = StyleSheet.create({})