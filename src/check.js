async function getField() {
  let providerUrl = document.getElementById("name").value;
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;

  const provider = new ethers.JsonRpcProvider(providerUrl);

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
  // 값 출력
  console.log("Name:", providerUrl);
  console.log("From:", from);
  console.log("Total:", to);
  
  window.location.href = `/benchmark/?providerurl=${providerUrl}&from=${from}&to=${to}`;
}
