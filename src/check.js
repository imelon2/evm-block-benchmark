async function getField() {
  let providerUrl = document.getElementById("name").value;
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;

  const provider = new ethers.WebSocketProvider(providerUrl);
  // const provider = new ethers.JsonRpcProvider(providerUrl);

  if (providerUrl == "") {
    NullFieldAlert("provider url")
    return
  }

  if (from == "") {
    NullFieldAlert("`From` field")
    return
  }

  if (to == "") {
    NullFieldAlert("`To` field")
    return
  }

  // verify Provider
  try {
    await provider.getNetwork();
  } catch (error) {
    InvaildProviderAlert(error);
    return;
  }

  // get latest block number
  if (from == "latest") {
    from = await provider.getBlockNumber();
  }

  // verify `from` block number
  try {
      const block = await provider.getBlock(Number(from));
      if(block == null) {
          const latest = await provider.getBlockNumber();
          NullBlockAlert(from,latest);
          return
      }
  } catch (error) {
    GetBlockErrorAlert(error)
    return
  }

if(to > from) {
    OutBlockRangeAlert(from,to)
    return
}
  
  window.location.href = `/benchmark/?providerurl=${providerUrl}&from=${from}&to=${to}`;
}
