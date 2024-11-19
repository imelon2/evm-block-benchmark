import { ethers } from "ethers";

async function main() {
    // const provider = new ethers.WebSocketProvider("ws://localhost:8546")
    // const currentBlockNumber = await provider.getBlockNumber()
    // console.log(`wait block number ${currentBlockNumber+10}`);
    
    // provider.on("",() => {
        
    // })
    // const come = await provider.waitForBlock(currentBlockNumber+10)
    // console.log(come);
    

    const provider = new ethers.JsonRpcProvider("https://arbitrum-one.g.allthatnode.com/full/evm/5da65013a9004d8da1983f17cae83366")
    const to = await provider.getBlockNumber()
    const from = to - 10

    const xFiled = Array.from({ length: to - from + 1 }, (_, i) => from + i);

    const blocks = await Promise.all(
        xFiled.map(async (num) => {
            return provider.getBlock(num);
        })
    );


    let totalFee = BigInt(0)
    blocks.forEach((b) => {
        if(!b?.baseFeePerGas) {
            return
        }
        totalFee = b.baseFeePerGas * b.gasUsed
    })

    console.log(ethers.formatEther);
    
}


(async () => {
    await main();
  })();
  