// import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { createContext, useState } from "react";


// export const AuthContext = createContext();

// export const Authprovider = ({children}) => {
//     const [userInfo , setUserInfo] = useState({});
//     const [isLoading , setIsLoading] = useState(false);
//     const [splashLoading , setSplashLoading] = useState(false);

//     //Login Authentication
//   const  logincheck = async()=>{
//     let checktoken = await AsyncStorage.getItem('usertoken');
//     if(checktoken){
//         console.log('user token exits');
//     }
//   }
//     return (
//        <AuthContext.Provider
//        value={{ 
//         logincheck
//        }}>
//         {children}
//        </AuthContext.Provider>
//     );
// }