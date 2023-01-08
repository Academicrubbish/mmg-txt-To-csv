<template>
  <div id="echart" class="chart"></div>
</template>

<script>
export default {
  name: 'chart',
  props: {
    chartList: {
      type: Array,
      default: function () {
        return []
      }
    },
    fileName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      myChart: null,
      options: {
        title: {
          text: 'title',
          subtext: ''
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: true,
              optionToContent: function (opt) {
                var axisData = opt.xAxis[0].data;
                var series = opt.series;
                var tdHeaders = '<td></td>'; //表头
                series.forEach(function (item) {
                  tdHeaders += '<td style="padding: 10px 10px">' + item.name + '</td>'; //组装表头
                });
                let table = `<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center;width:calc(100% - 20px);"><tbody><tr>${tdHeaders} </tr>`;
                var tdBodys = ''; //数据
                for (let i = 0, l = axisData.length; i < l; i++) {
                  for (let j = 0; j < series.length; j++) {
                    tdBodys += '<td>' + series[j].data[i] + '</td>'; //组装表数据
                  }
                  table += '<tr><td style="padding: 10px 10px;width:200px;">' + axisData[i] + '</td>' + tdBodys + '</tr>';
                  tdBodys = '';
                }
                table += '</tbody></table></div>';
                return table;
              }
            },
            magicType: { show: true, type: ['line', 'bar'] },
            // restore: { show: true },//还原
            saveAsImage: { show: true }
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            show: false,
            type: "category",
            data: [],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "value",
            type: "bar",
            stack: "total",
            emphasis: {
              focus: "series",
            },
            data: [],
          }
        ],
      },
    }
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      let yData = [];
      let xData = [];

      this.chartList.forEach(item => {
        xData.push(item._wavelength)
        yData.push(item._value)
      });
      this.options.xAxis[0].data = xData;
      this.options.series[0].data = yData;
      this.options.title.text = this.fileName;
      this.$nextTick(() => {
        this.initChart("echart", this.options);
      })
    },
    initChart(name, option) {
      var chartDom = document.getElementById(name);
      this.myChart = this.$echarts.init(chartDom);
      this.myChart.setOption(option);
    },
  }
}
</script>

<style scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>
