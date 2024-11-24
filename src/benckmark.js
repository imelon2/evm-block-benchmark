import { gasPriceOption, gasUsedOption, txCountOption, blockSizeOption, blockPerSecondOption } from "./options.js";
import { arb_getBlockByNumber } from "./rpc.js";

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    providerurl: params.get("providerurl"),
    from: Number(params.get("from")),
    to: Number(params.get("to")),
  };
}

async function initChart() {
  try {
    const { providerurl, to, from } = getQueryParams();

    const xFiled = Array.from({ length: from - to + 1 }, (_, i) => to + i);

    const blocks = await Promise.all(
      xFiled.map(async (num) => {
        const numHex = "0x" + (num).toString(16)
        return arb_getBlockByNumber(providerurl,[numHex,false])
      })
    );
    
    const gasPrice = blocks.map((b) => {
        return ethers.formatUnits(b.baseFeePerGas.toString(), 9);
    });
    
    const txCount = blocks.map((b) => {
        return b.transactions.length;
    });
    
    const gasUsed = blocks.map((b) => {
        return parseInt(b.gasUsed, 16);
    });
    
    
    const size = blocks.map((b) => {
      return parseInt(b.size, 16);
    });
    
    const counts = new Map();
    blocks.forEach((b) => {
      if (counts.has(parseInt(b.timestamp, 16))) {
        counts.set(parseInt(b.timestamp, 16), counts.get(parseInt(b.timestamp, 16)) + 1);
      } else {
        counts.set(parseInt(b.timestamp, 16), 1);
      }
    });
    const xFiledSecond = Array.from(counts.keys());
    const blockPerSecondCount = Array.from(counts.values());

    
    const gasPriceOp = gasPriceOption(xFiled);
    gasPriceOp.series[0].data = gasPrice;
    ChartGasPrice.setOption(gasPriceOp);
    
    const txCountOp = txCountOption(xFiled);
    txCountOp.series[0].data = txCount;
    ChartTxCount.setOption(txCountOp);
    
    const gasUsedtOp = gasUsedOption(xFiled);
    gasUsedtOp.series[0].data = gasUsed;
    ChartGasUsed.setOption(gasUsedtOp);
    
    const blockSizeOp = blockSizeOption(xFiled);
    blockSizeOp.series[0].data = size;
    ChartSize.setOption(blockSizeOp);
    
    const blockPerSecondOp = blockPerSecondOption(xFiledSecond);
    blockPerSecondOp.series[0].data = blockPerSecondCount;
    ChartBlockPerCount.setOption(blockPerSecondOp);
    

    let totalFee = 0
    blocks.forEach((b) => {
      totalFee += b.baseFeePerGas * b.gasUsed;
    });
    
    let totalBlockCount = blocks.length
    let elapsed = (blocks[totalBlockCount-1].timestamp - blocks[0].timestamp) || undefined
    let totalTx = txCount.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    new gridjs.Grid({
      columns: ["Total block count","Total tx count", "Total tx fee (eth)","Elapsed time"],
      data: [[totalBlockCount,`${totalTx}`, ethers.formatEther(totalFee.toString()), `${elapsed}s`]],
    }).render(document.getElementById("total"));
    
    let bpt = elapsed/totalBlockCount
    let tps = totalTx/elapsed
    new gridjs.Grid({
      columns: ["Generation time per block","Tx per second(TPS)"],
      data: [[`${bpt.toFixed(2)}s`,tps.toFixed(2)]],
    }).render(document.getElementById("average"));
  } catch (error) {
    console.log(error);
  }
}

const chartGasPriceDom = document.getElementById("chart_gasPrice");
const ChartGasPrice = echarts.init(chartGasPriceDom);
ChartGasPrice.setOption(gasPriceOption([]));

const chartTxCountDom = document.getElementById("chart_txCount");
const ChartTxCount = echarts.init(chartTxCountDom);
ChartTxCount.setOption(txCountOption([]));

const chartGasUsedDom = document.getElementById("chart_gasUsed");
const ChartGasUsed = echarts.init(chartGasUsedDom);
ChartGasUsed.setOption(gasUsedOption([]));

const chartSizeDom = document.getElementById("chart_size");
const ChartSize = echarts.init(chartSizeDom);
ChartSize.setOption(blockSizeOption([]));

const chartBlockPerCountDom = document.getElementById("chartblockpercount");
const ChartBlockPerCount = echarts.init(chartBlockPerCountDom);
ChartBlockPerCount.setOption(blockPerSecondOption([]));

await initChart();