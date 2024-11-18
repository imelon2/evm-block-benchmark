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

// 차트 옵션을 설정합니다.
// const option = {
//     title: {
//         text: 'Sample Line Chart'
//     },
//     tooltip: {},
//     xAxis: {
//         type: 'category',
//         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//     },
//     yAxis: {
//         type: 'value'
//     },
//     series: [{
//         data: [120, 200, 150, 80, 70, 110, 130],
//         type: 'line'
//     }]
// };

// 옵션을 차트에 적용하고 렌더링합니다.
