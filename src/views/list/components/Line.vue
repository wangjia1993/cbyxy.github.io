<template>
  <div class="line">
    <canvas id="myChart" :width="domWidth" height="300"></canvas>
  </div>
</template>

<script setup>
  import * as echarts from 'echarts';
  import { defineExpose, ref } from 'vue';
  const domWidth = ref(window.innerWidth - 30);

  const initChart = (series, data) => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('myChart'));
    // 绘制图表
    myChart.setOption({
      title: {
        text: '用能分析',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['水', '电', '煤'],
        right: 0,
      },
      grid: {
        left: '0%',
        right: '1%',
        bottom: '0',
        containLabel: true,
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data,
      },
      yAxis: {
        type: 'value',
      },
      series,
    });
  };

  defineExpose({
    initChart,
  });
</script>
<style lang="scss" scoped>
  .line {
    width: 100%;
    margin-top: 100px;
  }
</style>
