<template>
  <div class="echart" :id="chartId" style="width:100%; height: 500px;"></div>
</template>

<script>
import * as echarts from "echarts";
import  DataService from "@/Service/dataservice";
export default {
  props: {
    chartId: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      upcolor: "#FF0000", //增长颜色
      upBorderColor: "#8A0000",
      downColor: "#008000", // 下跌颜色
      downBorderColor: "#008F28",
      klineData: [] ,//k线图数据
      data:[]
    };
  },
  async mounted() {
    await this.getData();
    this.initData();
    this.initEcharts();

  },
  methods: {
    async getData(){
      //获取原始数据
      this.data=await DataService.getindexkline(this.code)
    },

    initData() {
      this.klineData = this.splitData(this.data);
    },
    initEcharts() {
      const option = {
        title: {
          text: this.name,
          left: 0
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        legend: {
          data: ["日K", "MA5", "MA10", "MA20", "MA30"]
        },
        grid: {
          left: "10%",
          right: "10%",
          bottom: "15%"
        },
        xAxis: {
          type: "category",
          data: this.klineData.categoryData,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: "dataMin",
          max: "dataMax"
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          }
        },
        dataZoom: [
          {
            type: "inside",
            start: 50,
            end: 100
          },
          {
            show: true,
            type: "slider",
            top: "90%",
            start: 50,
            end: 100
          }
        ],
        series: [
          {
            name: "日K",
            type: "candlestick",
            data: this.klineData.values,
            itemStyle: {
              color: this.upColor,
              color0: this.downColor,
              borderColor: this.upBorderColor,
              borderColor0: this.downBorderColor
            },
            markPoint: {
              label: {
                formatter: function(param) {
                  return param != null ? Math.round(param.value) + "" : "";
                }
              },
          
              tooltip: {
                formatter: function(param) {
                  return param.name + "<br>" + (param.data.coord || "");
                }
              }
            },
            markLine: {
              symbol: ["none", "none"],
              data: [
                [
                  {
                    name: "from lowest to highest",
                    type: "min",
                    valueDim: "lowest",
                    symbol: "circle",
                    symbolSize: 10,
                    label: {
                      show: false
                    },
                    emphasis: {
                      label: {
                        show: false
                      }
                    }
                  },
                  {
                    type: "max",
                    valueDim: "highest",
                    symbol: "circle",
                    symbolSize: 10,
                    label: {
                      show: false
                    },
                    emphasis: {
                      label: {
                        show: false
                      }
                    }
                  }
                ],
                {
                  name: "min line on close",
                  type: "min",
                  valueDim: "close"
                },
                {
                  name: "max line on close",
                  type: "max",
                  valueDim: "close"
                }
              ]
            }
          },
          {
            name: "MA5",
            type: "line",
            data: this.calculateMA(5),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
              opacity: 0.8
            }
          },
          {
            name: "MA10",
            type: "line",
            data: this.calculateMA(10),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
              opacity: 0.8
            }
          },
          {
            name: "MA20",
            type: "line",
            data: this.calculateMA(20),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
              opacity: 0.8
            }
          },
          {
            name: "MA30",
            type: "line",
            data: this.calculateMA(30),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
              opacity: 0.8
            }
          }
        ]
      };
      const myChart = echarts.init(document.getElementById(this.chartId));
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },


    // 数据计算以及拆分
    splitData(rawData) {
      const categoryData = [];
      const values = [];
      for (let i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
      }
      return {
        categoryData: categoryData,
        values: values
      };
    },
    // 均值计算
    calculateMA(dayCount) {
      const result = [];
      for (let i = 0, len = this.klineData.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push("-");
          continue;
        }
        let sum = 0;
        for (let j = 0; j < dayCount; j++) {
          sum += +this.klineData.values[i - j][1];
        }
        // 保留两位小数
        result.push((sum / dayCount).toFixed(2));
      }
      return result;
    }
  }
};
</script>

