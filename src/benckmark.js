import {gasPriceOption, gasUsedOption, txCountOption} from "./options.js"

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        providerurl: params.get('providerurl'),
        from: Number(params.get('from')),
        to: Number(params.get('to'))
    };
}

async function initChart() {
    const {providerurl, to, from} = getQueryParams()
    const provider = new ethers.JsonRpcProvider(providerurl)
    const xFiled = Array.from({ length: from - to + 1 }, (_, i) => to + i);

    const blocks = await Promise.all(
        xFiled.map(async (num) => {
            return provider.getBlock(num);
        })
    );

    const gasPrice = blocks.map((b) => {
        return ethers.formatUnits(b.baseFeePerGas.toString(),9)
    })

    const txCount = blocks.map((b) => {
        return b.transactions.length
    })

    const gasUsed = blocks.map((b) => {
        return b.gasUsed
    })
    
    const gasPriceOp = gasPriceOption(xFiled)
    gasPriceOp.series[0].data = gasPrice
    ChartGasPrice.setOption(gasPriceOp);
    
    const txCountOp = txCountOption(xFiled)
    txCountOp.series[0].data = txCount
    ChartTxCount.setOption(txCountOp);
    
    const gasUsedtOp = gasUsedOption(xFiled)
    gasUsedtOp.series[0].data = gasUsed
    ChartGasUsed.setOption(gasUsedtOp);
}

const chartGasPriceDom = document.getElementById('chart_gasPrice');
const ChartGasPrice = echarts.init(chartGasPriceDom);
ChartGasPrice.setOption(gasPriceOption([]))

const chartTxCountDom = document.getElementById('chart_txCount');
const ChartTxCount = echarts.init(chartTxCountDom);
ChartTxCount.setOption(txCountOption([]))

const chartGasUsedDom = document.getElementById('chart_gasUsed');
const ChartGasUsed = echarts.init(chartGasUsedDom);
ChartGasUsed.setOption(gasUsedOption([]))

await initChart()


new gridjs.Grid({
    columns: [],
    data: [
    ]
  }).render(document.getElementById("wrapper"));

// new gridjs.Grid({
//     columns: ["Name", "Email", "Phone Number"],
//     data: [
//       ["John", "john@example.com", "(353) 01 222 3333"],
//       ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
//       ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
//       ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
//       ["Afshin", "afshin@mail.com", "(353) 22 87 8356"]
//     ]
//   }).render(document.getElementById("wrapper"));