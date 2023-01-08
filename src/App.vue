<template>
  <div id="app">
    <mt-csv></mt-csv>
  </div>
</template>

<script>
import mtCsv from "./view/mtCsv.vue";

export default {
  name: 'App',
  components: {
    mtCsv,
  }
}
</script>

<style>
@import "./assets/basic.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* 优化滚动条效果 */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #ebeef5;
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #ccc;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  background: rgba(255, 255, 255, 1);
}
</style>
