import {gasPriceOption} from "./options.js"

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        providerurl: params.get('providerurl'),
        from: params.get('from'),
        to: params.get('to')
    };
}

async function initGasPriceChart(gasPriceData) {
    const provider = new ethers.JsonRpcProvider("https://ethereum-mainnet.g.allthatnode.com/full/evm/5da65013a9004d8da1983f17cae83366")
    // const provider = new ethers.JsonRpcProvider("https://arbitrum-sepolia.g.allthatnode.com/full/evm/5da65013a9004d8da1983f17cae83366")
    // const provider = new ethers.JsonRpcProvider("https://arbitrum-one.g.allthatnode.com/full/evm/5da65013a9004d8da1983f17cae83366")
    // const provider = new ethers.JsonRpcProvider("http://localhost:3347")
    
    const to = await provider.getBlockNumber()
    const from = to - 2500

    const xFiled = Array.from({ length: to - from + 1 }, (_, i) => from + i);

    const re = await Promise.all(
        xFiled.map(async (num) => {
            return provider.getBlock(num);
        })
    );

    const gasPrice = re.map((b) => {
        return ethers.formatUnits(b.baseFeePerGas.toString(),9)
    })

    const gasPriceOp = gasPriceOption(xFiled)
    gasPriceOp.series[0].data = gasPrice
    myChart.setOption(gasPriceOp);
}


const queryParams = getQueryParams();
console.log(queryParams);

const chartDom = document.getElementById('chart');
const myChart = echarts.init(chartDom);

// myChart.setOption(gasPriceOp);

document.getElementById('provider').textContent = `Provider: ${queryParams.provider || 'Not provided'}`;
document.getElementById('ws').textContent = `WebSocket: ${queryParams.to || 'Not provided'}`;


await initGasPriceChart()
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


// 테스트용으로 2초마다 데이터 업데이트
// setInterval(async() => {
//     const provider = new ethers.ethers.JsonRpcProvider("http://localhost:8545")
//     const b = await provider.getBlock()
//     const newValue = Math.floor(Math.random() * b.number);
//     updateChart(newValue);
// }, 2000);
