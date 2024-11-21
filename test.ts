import { ArbitrumProvider } from "@arbitrum/sdk";
import { ethers } from "ethers";

async function main() {

    console.log('6af88a83051659b8846bf6a42d0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000066fe4a000000000000000000000000000000000000000000000000000000000000002c0000000000000000000000000000000000000000000000000000000000000001'.length);
    
    // const provider = new ethers.WebSocketProvider("ws://localhost:8546")
    // const currentBlockNumber = await provider.getBlockNumber()
    // console.log(`wait block number ${currentBlockNumber+10}`);
    
    // provider.on("",() => {
        
    // })
    // const come = await provider.waitForBlock(currentBlockNumber+10)
    // console.log(come);
    

    // const provider = new ethers.providers.JsonRpcProvider("http://3.35.164.155:3347")

    // const arbPro = new ArbitrumProvider(provider)
    // const num = await arbPro.getBlockNumber()
    // const b = await arbPro.getBlock(num).
    // console.log(b);
    
    // const to = 1
    // const from = 15
    // // const to = await provider.getBlockNumber()
    // // const from = to - 10

    // const xFiled = Array.from({ length: from - to + 1 }, (_, i) => to + i);

    // console.log(xFiled);
    

    // const blocks = await Promise.all(
    //     xFiled.map(async (num) => {
    //         return provider.getBlock(num);
    //     })
    // );

    // // let elapsed = blocks[blocks.length-1]!.timestamp - blocks[0]!.timestamp
    // blocks.map(b => console.log(b))
    
}


(async () => {
    await main();
  })();
  