export const gasPriceOption = (range) => {
    
    return {
        title: {
            text: 'Temperature Change in the Coming Week'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {},
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: { readOnly: false },
              magicType: { type: ['line', 'bar'] },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: range
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} wei'
            },
          },
          series: [
            {
              name: 'Highest',
              type: 'line',
              data: [],
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' }
                ]
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }]
              }
            }
          ]
    }
 
  };