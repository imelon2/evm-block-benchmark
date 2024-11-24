export const gasPriceOption = (range) => {
  return {
    title: {
      text: "Block per gas price",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar","stack"] },
        restore: {},
        saveAsImage: {},
      },
    },
    grid: {
      top:"20%",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: range,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} wei",
      },
    },
    series: [
      {
        name: "Highest",
        type: "line",
        data: [],
        markPoint: {
          data: [
            { type: "max", name: "Max" },
            { type: "min", name: "Min" },
          ],
        },
        markLine: {
          data: [
            { type: "average", name: "Avg" }
          ],
        },
      },
    ],
  };
};

export const txCountOption = (range) => {
  return {
    title: {
      text: "Block per transaction count",
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    grid: {
      top:"20%",
    },
    xAxis: [
      {
        type: 'category',
        data: range,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'tx count',
        type: 'bar',
        barWidth: '50%',
        data: [],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ],
        }
      }
    ]
  };
}

export const gasUsedOption = (range) => {
  return {
    title: {
      text: "Block per gas used",
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top:"20%",
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: [
      {
        type: 'category',
        data: range,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'gas used',
        type: 'bar',
        barWidth: '50%',
        data: [],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ],
        }
      }
    ]
  };
}

export const blockSizeOption = (range) => {
  return {
    title: {
      text: "Block per size",
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top:"20%",
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: [
      {
        type: 'category',
        data: range,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'gas used',
        type: 'bar',
        barWidth: '50%',
        data: [],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ],
        }
      }
    ]
  };
}

export const blockPerSecondOption = (range) => {
  return {
    title: {
      text: "Blocks created per timestamp",
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top:"20%",
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        dataView: { readOnly: false },
        magicType: { type: ["line", "bar"] },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: [
      {
        type: 'category',
        data: range,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'gas used',
        type: 'bar',
        barWidth: '50%',
        data: [],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ],
        },
        markLine: {
          data: [
            { type: "average", name: "Avg" }
          ],
        },
      }
    ]
  };
}