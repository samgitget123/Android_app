import React, { createContext, useState } from 'react';
export const MyContext = createContext();

// const servers = [
//    "172.16.12.138",
//    "172.16.12.74"
// ];

const base_url = `https://convoxmeet.deepijatel.ai/convoxmeet/api/`;
  export const Servercontext = ({children}) => {
    // const [devserver , setDevserver] = useState(servers[1]); 
    // const [proserver , setProserver] = useState(servers[0]);
   const [baseurl , setBaseurl] = useState(base_url);
   const [customerurl , setConstumerurl] = useState(base_url);
    //base url
    // const baseurl_dev = `https://${devserver}/convoxmeet/api/`;   //for dev server
    // const baseurl_pro = `https://${proserver}/convoxmeet/api/`;   //for pro server
    // const baseurl = `https://${proserver}/convoxmeet/api/`;   //for base url
    // const usermobile='9848851443';
    
    return (
      <MyContext.Provider
        value={{
          baseurl,
          setBaseurl,
          customerurl,
          setConstumerurl
        }}
      >
        {children}
      </MyContext.Provider>
    );
  };
  