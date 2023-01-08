<template>
  <div>
    <div class="outFile_body">
      <div>
        <img src="../assets/others.png" alt="">
        {{ fileName }}
      </div>
      <div>
        <img src="../assets/arrow.png" alt="">
      </div>
      <div>
        <img src="../assets/csv.png" alt="">
        {{ fileFirstName }}.csv
      </div>
      <div>
        <el-button @click="download" :disabled="disabled" type="text" icon="el-icon-circle-check"
          :style="disabled ? 'color:#c0c4cc' : 'color:#aadf59;'">
          立即下载</el-button>
        <el-button @click="drawChart" :disabled="disabled" type="text" icon="el-icon-data-analysis">
          绘制图像</el-button>
      </div>
    </div>
    <el-progress :show-text="false" :stroke-width="5" :percentage="percentage"></el-progress>
  </div>
</template>

<script>
export default {
  name: 'outFileBody',
  props: {
    fileData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    fileName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileFirstName: '',
      percentage: 0,
      disabled: true
    }
  },
  mounted() {
    this.fileFirstName = this.fileName.split('.')[0];

    var timeId = setInterval(() => { //周期性定时器
      if (this.percentage == 100) {
        //关停计时器
        clearInterval(timeId)
        this.disabled = false;
        this.$emit('loadingTime', 1);
      } else {
        this.percentage = this.percentage + 10
      }
    }, 100)
  },
  methods: {
    download() {
      let measurement = this.fileData.measurement_group.measurement
      this.jsonToExcel(
        ['_wavelength', '_value'],
        measurement.data.row,
        `${this.fileFirstName + '-data.csv'}`);
      this.jsonToExcel(
        ['_name', '_caption', '__text'],
        measurement.results.parameter,
        `${this.fileFirstName + '-results.csv'}`);
      this.jsonToExcel(
        ['_name', '_caption', '__text'],
        measurement.status.parameter,
        `${this.fileFirstName + '-status.csv'}`);
    },
    jsonToExcel(tableHead, data, csvName) {
      // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
      let str = `${tableHead.join() + '\n'}`;
      // 增加\t为了不让表格显示科学计数法或者其他格式
      for (let i = 0; i < data.length; i++) {
        tableHead.forEach(item => {
          str += `${data[i][item] + "\t"},`
        });
        str += "\n";
      }
      // 通过创建a标签实现
      const link = document.createElement("a");
      // encodeURIComponent解决中文乱码
      link.href = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str);
      // 对下载的文件命名
      link.download = csvName;
      link.click();
    },
    drawChart() {
      this.$emit('drawChart', {
        rowData: this.fileData.measurement_group.measurement.data.row,
        fileName: this.fileFirstName
      });
    }
  }
}
</script>

<style scoped>
.outFile {
  width: 70%;
  margin-left: 15%;
  background-color: white;
  border-radius: 5px;
}

.outFile .outFile_body {
  height: 80px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.outFile .outFile_body>div {
  flex: 1;
  text-align: left;
  font-size: 14px;
  color: #276dc4;
}

.outFile .outFile_body>div:nth-child(2) {
  text-align: center;
}

.outFile .outFile_body>div:nth-child(4) {
  text-align: right;
}

.outFile .outFile_body img {
  height: 40px;
  vertical-align: middle;
  margin-right: 5px;
}
</style>
