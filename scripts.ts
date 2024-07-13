import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const url: string | undefined = process.env.WS_URL;

/**
 *  EventType
 *   - "block"
 *   - "poll"
 *   - "didPoll"
 *   - "pending"
 *   - "error"
 *   - "network"
 *   - filter
 *   - topics array
 *   - transaction hash
 */

const PollableEvents = [ "block", "network", "pending", "poll" ];

async function scanning() {
  if (!url) {
    console.log(`Could not find WebSocket-Url.`);
    return;
  }

  console.log(`Start Scanner ....`);
  const provider = new ethers.providers.WebSocketProvider(url);

  /* Event listener for pending transactions that will run each time a new transaction hash is sent from the node. */
  provider.on("block", async(tx: string) => {
    console.log(tx);
    const blokcs = await provider.getBlockWithTransactions(tx)
    console.log(blokcs);
    
    // blokcs.transactions.forEach(txHash => {
    //     const transaction = await provider.getBlockWithTransactions
    // });
    
    /* Getting the whole transaction using the transaction hash */
    // provider.getTransaction(tx).then((transaction) => {
    //   console.log(transaction);
    // });
  });
}

(async () => {
  await scanning();
})();
