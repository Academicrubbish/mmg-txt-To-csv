<template>
  <div class="mmg2csv">
    <div style="padding: 30px;">
      <h1>mmg或txt转csv</h1>
    </div>
    <div class="getFile" v-if="fileStatus">
      <div class="getFile_body">
        <img src="../assets/profile.png" alt="">
        <div class="getFile_box"><i class="el-icon-upload" />上传文件</div>
        <div class="getFile_content">或拖动文件到此处</div>
        <input class="inp" type="file" ref="onloadFile" @change="onloadFile($event)">
      </div>
    </div>
    <div class="outFile" v-else>
      <div class="outFile_head">
        <div><i class="el-icon-s-platform" style="color: #f56c6c;" />处理中({{ onloading }})</div>
        <div>
          <el-button type="text" icon="el-icon-circle-plus" style="position: relative;color:#687787;">
            添加更多
            <input class="inp" type="file" ref="onloadFile" @change="onloadFile($event)">
          </el-button>
        </div>
        <div><i class="el-icon-s-opportunity" style="color: #66b1ff;" />已完成({{ allFileData.length }})</div>
      </div>
      <div class="outFile_body">
        <outFile-body v-for="item of allFileData" :fileName="item.fileName" :fileData="item.fileData"
          @drawChart="drawChart" @loadingTime="loadingTime">
        </outFile-body>
      </div>
    </div>
    <!-- 画图 -->
    <div class="fileChart" v-if="chartStatus">
      <h3>图表展示</h3>
      <div>
        <chart :chartList="rowData" :fileName="fileName"></chart>
      </div>
    </div>
  </div>
</template>

<script>
import chart from "../components/chart.vue";
import outFileBody from "../components/outFileBody.vue";
export default {
  name: 'mtCsv',
  components: {
    chart,
    outFileBody
  },
  data() {
    return {
      allFileData: [],
      rowData: {},
      fileName: '',
      chartStatus: false,
      fileStatus: true,
      onloading: 0
    }
  },
  methods: {
    onloadFile(event) {
      this.onloading = this.onloading + 1;
      //只接收txt或mmg格式
      let reg = /(.mmg|.txt)$/m;
      let reader = new FileReader();
      let file = event.target.files[0];
      //test()方法是用于监测一个字符串是否匹配某个模式，匹配为true，不匹配为false
      if (reg.test(file.name)) {
        this.$message.success('文件读取成功');
        // input.files[0]拿到文件
        reader.readAsText(this.$refs.onloadFile.files[0], "utf8");
        //reader.onload是fileReader对象读取文件结束时的回调函数 这个回调函数会有一个参数
        //该参数的target下的result中保存了fileReader对象读取文件后的结果
        reader.onload = (event) => {
          // result为获取结果 为xml字符串，借助x2js.js中的xml2js方法解析为一个对象
          this.allFileData.push({
            fileData: this.$x2js.xml2js(event.target.result),
            fileName: file.name
          })
          this.fileStatus = false;
        };
      } else {
        this.$message.error('文件不是mmg或txt格式');
      }
    },
    //画图
    drawChart(obj) {
      this.chartStatus = false;
      this.rowData = obj.rowData;
      this.fileName = obj.fileName;
      this.$nextTick(() => {
        this.chartStatus = true;
      })
    },
    //确认正在处理的文件数
    loadingTime(val) {
      this.onloading = this.onloading - val;
    }
  }
}
</script>

<style scoped>
.mmg2csv {
  height: 100vh;
  width: 100%;
  background-color: #f4f6fa;
}

.getFile {
  height: 30%;
  width: 70%;
  margin-left: 15%;
  background-color: #206bc4;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
}

.getFile_body {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 2px dashed gray;
  background-color: #1d60b0;
  border-radius: 5px;
  position: relative;
}

.getFile_body>img {
  height: 45px;
  width: 45px;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid gray;
  border-radius: 5px;
  /* border-radius: 50px; */
}

.getFile_body .getFile_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: white;
}

.getFile_body .getFile_content {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 16px;
  color: white;
}

.outFile {
  width: 70%;
  margin-left: 15%;
  background-color: white;
  border-radius: 5px;
}

.outFile .outFile_head {
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e8e9;
  padding: 0 15px;
  display: flex;
  align-items: center;
  text-align: left;
}

.outFile .outFile_head>div {
  flex: 1;
  font-size: 14px;
  font-weight: bold;
}

.outFile .outFile_head i {
  margin-right: 5px;
}

.outFile .outFile_head>div:nth-child(3) {
  text-align: right;
}

.outFile .outFile_body {
  max-height: calc(60vh - 186px);
  overflow: auto;
}

.inp {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 99;
}

.fileChart {
  height: 40%;
  width: 70%;
  margin-left: 15%;
}

.fileChart>h3 {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  text-align: left;
}

.fileChart>div {
  height: calc(100% - 30px);
  width: 100%;
  box-sizing: border-box;
  border: 2px dashed gray;
}
</style>
