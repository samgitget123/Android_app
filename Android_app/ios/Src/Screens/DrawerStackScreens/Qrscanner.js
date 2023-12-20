// import { StyleSheet, Text, View , ActivityIndicator } from 'react-native'
// import React from 'react'
// // import { useCameraDevices } from 'react-native-vision-camera';
// import { useFrameProcessor } from 'react-native-vision-camera';
// const Qrscanner = () => {
//     const [cameraPermission, setCameraPermission] = useState();
//     useEffect(() => {
//         (async () => {
//           const cameraPermissionStatus = await Camera.requestCameraPermission();
//           setCameraPermission(cameraPermissionStatus);
//         })();
//       }, []);
//       console.log(`Camera permission status: ${cameraPermission}`);

//     //   const devices = useCameraDevices();
//     //   const cameraDevice = devices.back;

//       const renderDetectorContent = () => {
//         if (cameraDevice && cameraPermission === 'authorized') {
//           return (
//             <Camera
//               style={styles.camera}
//               device={cameraDevice}
//               isActive={true}
//             />
//           );
//         }
//         return <ActivityIndicator size="large" color="#1C6758" />;
//       };

//       //frame
//       const detectorResult = useSharedValue('');

//         const frameProcessor = useFrameProcessor(frame => {
//         'worklet';
//         const imageLabels = labelImage(frame);

//         console.log('Image labels:', imageLabels);
//         detectorResult.value = imageLabels[0]?.label;
//     }, []);
    
//   return (
//     <View style={styles.screen}>
//       <SafeAreaView style={styles.saveArea}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}>React Native Image Detector</Text>
//         </View>
//       </SafeAreaView>

//       <View style={styles.caption}>
//         <Text style={styles.captionText}>
//           Welcome To React-Native-Vision-Camera Tutorial
//         </Text>
//       </View>

//       {renderDetectorContent()}
//     </View>
//   )
// }

// export default Qrscanner

// const styles = StyleSheet.create({})