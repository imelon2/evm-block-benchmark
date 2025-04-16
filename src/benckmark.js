import {
  gasPriceOption,
  gasUsedOption,
  txCountOption,
  blockSizeOption,
  blockPerSecondOption,
} from "./options.js";
import { arb_getBlockByNumber } from "./rpc.js";

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  
  return {
    providerurl: params.get("providerurl"),
    from: Number(params.get("from")),
    to: Number(params.get("to")),
  };
}

let gasPrice = [];
let txCount = [];
let gasUsed = [];
let size = [];

// const xFiled = []

let totalFee = 0;
let totalBlockCount = 0;
let totalTx = 0;
let elapsed = 0;

let xFiledSecond = [];
let blockPerSecondCount = [];

let grid_total = new gridjs.Grid({
  columns: [
    "Total block count",
    "Total tx count",
    "Total tx fee (eth)",
    "Elapsed time",
  ],
  data: [
    [
      "",
      ``,
      "",
      ``,
    ],
  ],
}).render(document.getElementById("total"));

let grid_average = new gridjs.Grid({
  columns: ["Block per Time", "Tx per second(TPS)"],
  data: [[``, '']],
}).render(document.getElementById("average"));

async function initChart() {
  const { providerurl, to, from } = getQueryParams();

  const xFiled = Array.from({ length: from - to + 1 }, (_, i) => to + i);
  // xFiled.push(..._xFiled)

  const batchSize = 500;

  for (let i = 0; i < xFiled.length; i += batchSize) {
    
    try {
      const batch = xFiled.slice(i, i + batchSize);
      const blocks = await Promise.all(
        batch.map(async (num) => {
          const numHex = "0x" + num.toString(16);
          return arb_getBlockByNumber(providerurl, [numHex, false]);
        })
      );

      const _gasPrice = blocks.map((b) => {
        return ethers.formatUnits(b.baseFeePerGas.toString(), 9);
      });
      gasPrice.push(..._gasPrice);

      const _txCount = blocks.map((b) => {
        return b.transactions.length;
      });
      txCount.push(..._txCount);

      const _gasUsed = blocks.map((b) => {
        return parseInt(b.gasUsed, 16);
      });
      gasUsed.push(..._gasUsed);

      const _size = blocks.map((b) => {
        return parseInt(b.size, 16);
      });
      size.push(..._size);

      const counts = new Map();
      blocks.forEach((b) => {
        if (counts.has(parseInt(b.timestamp, 16))) {
          counts.set(
            parseInt(b.timestamp, 16),
            counts.get(parseInt(b.timestamp, 16)) + 1
          );
        } else {
          counts.set(parseInt(b.timestamp, 16), 1);
        }
      });

      xFiledSecond.push(...Array.from(counts.keys()));
      blockPerSecondCount.push(...Array.from(counts.values()));

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
      
      // let totalFee = 0
      blocks.forEach((b) => {
        totalFee += b.baseFeePerGas * b.gasUsed;
      });
      
      // let totalBlockCount = blocks.length
      totalBlockCount += blocks.length;
      
      elapsed +=
        blocks[blocks.length - 1].timestamp - blocks[0].timestamp ||
        undefined;
      
      totalTx += _txCount.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      
      grid_total.updateConfig({
        data: [
          [
            totalBlockCount,
            `${totalTx} (${totalTx - totalBlockCount})`,
            ethers.formatEther(totalFee.toString()),
            `${elapsed}s`,
          ],
        ]
      }).forceRender();

      let bpt = elapsed / totalBlockCount;
      let tps = (totalTx - totalBlockCount) / elapsed;

      grid_average.updateConfig({
        data: [[`${bpt.toFixed(2)}s`, tps]],
      }).forceRender();
    } catch (error) {
      console.log(error);
    }
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
