
// 차트를 표시할 DOM 요소를 가져옵니다.
const chartDom = document.getElementById('chart');
const myChart = echarts.init(chartDom);

// 차트 옵션을 설정합니다.
const option = {
    title: {
        text: 'Sample Line Chart'
    },
    tooltip: {},
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line'
    }]
};

// 옵션을 차트에 적용하고 렌더링합니다.
myChart.setOption(option);

// 실시간 데이터 업데이트 예시
function updateChart(newData) {
    option.series[0].data.push(newData);
    if (option.series[0].data.length > 7) {
        option.series[0].data.shift(); // 오래된 데이터 제거
    }
    myChart.setOption(option);
}

// 테스트용으로 2초마다 데이터 업데이트
setInterval(async() => {
    const provider = new ethers.ethers.JsonRpcProvider("http://localhost:8545")
    const b = await provider.getBlock()
    const newValue = Math.floor(Math.random() * b.number);
    updateChart(newValue);
}, 2000);