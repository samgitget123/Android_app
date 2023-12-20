// import React, { useState, useEffect } from 'react';
// import { Alert, StyleSheet, Text, View , Linking } from 'react-native';
// import {useCameraDevices , Camera} from 'react-native-vision-camera';
// // import {Camera} from 'react-native-vision-camera';
// import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
// const Qrscanner = () => {
//   const [hasPermission, setHasPermission] = React.useState(false);
//   const devices = useCameraDevices();
//   const device = devices.back;
//   // Here is where useScanBarcodes() hook is called.
//   // Specify your barcode format inside.
//   // Detected barcodes are assigned into the 'barcodes' variable.
//   const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
//     checkInverted: true,
//   });

//   // Permissions added here.
//   React.useEffect(() => {
//     (async () => {
//       const status = await Camera.requestCameraPermission();
//       setHasPermission(status === 'authorized');
//     })();
//   }, []);
// //function for qr link
// const qrlink = (urllink) => {
//   if (urllink && urllink.startsWith('http')) {
//     Linking.openURL(urllink);
//     console.log('helllllllllllllllllllllo')
//     const apiurl = `https://convoxmeet.deepijatel.in/convoxmeet/api`;
//    const mobile = '9848851443';
//    fetch(`${apiurl}/generateotp?mobile=${mobile}&deviceid=123456789000000000000000000000000000000`)
//    .then((res)=>{
//     if(res.ok){
//       return res.json();
//     }else{
//       throw new Error('Error fetching data from the API');
//     }
//    }).then((data)=>{
//     console.log(data);
//    })
//   }
// }
//   return (
//     device != null &&
//     hasPermission && (
//       <>
//         <Camera
//           style={StyleSheet.absoluteFill}
//           device={device}
//           isActive={true}
//           frameProcessor={frameProcessor}
//           frameProcessorFps={5}
//         />
//         {barcodes.map((barcode, idx) => (
//           <View key={idx} style={{padding: 50}}>
//             <Text style={styles.barcodeTextURL}>{barcode.displayValue}</Text>
//             {qrlink(barcode.displayValue)}
//           </View>
//         ))}
//       </>
//     )
//   );
// };
// export default  Qrscanner;
// const styles = StyleSheet.create({
//   barcodeTextURL: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: 'bold',
//     backgroundColor: 'red',
//     borderColor: 'yellow',
//     borderWidth:1,
//   },
// });


