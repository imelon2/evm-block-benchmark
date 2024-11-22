import axios from "axios";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const postData = {
  id: 1,
  jsonrpc: "2.0",
};

export const arb_getBlockByNumber = async (url: string = "http://3.35.164.155:3347", params: any[]) => {
  try {
    const {data} = await axios.post(
      url,
      { method: "eth_getBlockByNumber", params,...postData },
      { headers }
    );
    console.log(data.result);
    
    return data.result;
  } catch (error) {
    console.error(error);
  }
};

(async () => {
    const numHex = "0x" + (100).toString(16)
    console.log(numHex);
    
    await arb_getBlockByNumber(undefined,[numHex,false]);
  })();
  