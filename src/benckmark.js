import { gasPriceOption, gasUsedOption, txCountOption } from "./options.js";

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
    const provider = new ethers.JsonRpcProvider(providerurl);

    const xFiled = Array.from({ length: from - to + 1 }, (_, i) => to + i);

    const blocks = await Promise.all(
      xFiled.map(async (num) => {
        return provider.getBlock(num);
      })
    );
    
    const gasPrice = blocks.map((b) => {
        return ethers.formatUnits(b.baseFeePerGas.toString(), 9);
    });
    
    const txCount = blocks.map((b) => {
        return b.transactions.length;
    });
    
    const gasUsed = blocks.map((b) => {
        return b.gasUsed;
    });
    
    const size = blocks.map((b) => {
        return b.gasUsed;
    });
    
    const gasPriceOp = gasPriceOption(xFiled);
    gasPriceOp.series[0].data = gasPrice;
    ChartGasPrice.setOption(gasPriceOp);
    
    const txCountOp = txCountOption(xFiled);
    txCountOp.series[0].data = txCount;
    ChartTxCount.setOption(txCountOp);
    
    const gasUsedtOp = gasUsedOption(xFiled);
    gasUsedtOp.series[0].data = gasUsed;
    ChartGasUsed.setOption(gasUsedtOp);
    
    // const blockSizeOp = blockSizeOption(xFiled);
    // blockSizeOp.series[0].data = gasUsed;
    // ChartGasUsed.setOption(gasUsedtOp);
    
    const totalTx = txCount.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    );
    
    let totalFee = BigInt(0);
    blocks.forEach((b) => {
        totalFee += b.baseFeePerGas * b.gasUsed;
    });
    
    
    let elapsed = (blocks[blocks.length-1].timestamp - blocks[0].timestamp) || undefined

    new gridjs.Grid({
      columns: ["Total block count","Total tx count", "Total tx fee (eth)","Elapsed time"],
      data: [[blocks.length,`${totalTx} (${totalTx -blocks.length})`, ethers.formatEther(totalFee), `${elapsed}s`]],
    }).render(document.getElementById("total"));

    let bpt = elapsed/blocks.length
    let tps = (totalTx -blocks.length)/elapsed
    new gridjs.Grid({
      columns: ["Block per Time","Tx per second(TPS)"],
      data: [[`${bpt.toFixed(2)}s`,tps]],
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

// const chartSizeDom = document.getElementById("chart_size");
// const ChartSize = echarts.init(chartSizeDom);
// ChartSize.setOption(blockSizeOption([]));

await initChart();