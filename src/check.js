async function getField() {
  let providerUrl = document.getElementById("name").value;
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;

  const provider = new ethers.JsonRpcProvider(providerUrl);

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

const basePath = window.location.pathname.split('/')[1]; // 첫 번째 디렉토리 추출
const repositoryName = basePath ? `/${basePath}` : '';   // 루트에 있을 경우 빈 문자열

  // 이동할 경로 설정
  window.location.href = `${repositoryName}/benchmark/?providerurl=${providerUrl}&from=${from}&to=${to}`;
  // window.location.href = `./benchmark/?providerurl=${providerUrl}&from=${from}&to=${to}`;
}