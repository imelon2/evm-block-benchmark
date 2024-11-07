import { ethers } from "ethers";

async function main() {
    const provider = new ethers.WebSocketProvider("ws://localhost:8546")
    const currentBlockNumber = await provider.getBlockNumber()
    console.log(`wait block number ${currentBlockNumber+10}`);
    
    provider.on("",() => {
        
    })
    const come = await provider.waitForBlock(currentBlockNumber+10)
    console.log(come);
    
}


(async () => {
    await main();
  })();
  