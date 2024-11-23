const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  
  const postData = {
    id: 1,
    jsonrpc: "2.0",
  };
  
  export const arb_getBlockByNumber = async (url, params) => {
    try {
      const {data} = await axios.post(
        url,
        { method: "eth_getBlockByNumber", params,...postData },
        { headers }
      );
      return data.result;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const arb_getBlockNumber = async (url, params) => {
    try {
      const {data} = await axios.post(
        url,
        { method: "eth_getBlockNumber", params,...postData },
        { headers }
      );
      return data.result;
    } catch (error) {
      console.error(error);
    }
  };

  export const eth_chainId = async (url) => {
    try {
      const { data } = await axios.post(
        url,
        {
          jsonrpc: "2.0",
          method: "eth_chainId",
          params: [],
          id: 1,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      return data.result;
    } catch (error) {
      console.error(error);
    }
  };