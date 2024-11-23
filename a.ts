// import { ethers } from "ethers";

import axios from "axios";

// const provider = new ethers.WebSocketProvider(providerUrl);
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  
  const postData = {
    id: 1,
    jsonrpc: "2.0",
  };
  
  export const arb_getBlockNumber = async (url:string, params: any[]) => {
    try {
      const {data} = await axios.post(
        url,
        { method: "eth_blockNumber", params,...postData },
        { headers }
      );
      return data.result;
    } catch (error) {
      console.error(error);
    }
  };
  

  (async() => {
    try {
        const a = await arb_getBlockNumber("http://3.35.164.155:3347",[])
        console.log(a);
        
    } catch (error) {
        console.log(error);
        
    }
  })()