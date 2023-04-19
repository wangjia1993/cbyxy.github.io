<template>
  <div class="pie">
    <canvas id="myChart2" :width="domWidth" height="300"></canvas>
  </div>
</template>

<script setup>
  import * as echarts from 'echarts';
  import { defineExpose, ref } from 'vue';
  const domWidth = ref(window.innerWidth - 30);

  const initChart = (data_w, data_e, data_c) => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('myChart2'));
    // 绘制图表
    myChart.setOption({
      legend: {
        top: '0',
        bottom: '10%',
        right: '0',
      },
      title: [
        {
          text: '用能占比',
          left: '0',
        },
        {
          subtext: '水',
          left: '16.67%',
          top: '75%',
          textAlign: 'center',
        },
        {
          subtext: '电',
          left: '50%',
          top: '75%',
          textAlign: 'center',
        },
        {
          subtext: '煤',
          left: '83.33%',
          top: '75%',
          textAlign: 'center',
        },
      ],
      series: [
        {
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
          data: data_w,
          label: {
            position: 'inner',
            fontSize: 12,
            formatter: '{c}',
          },
          left: 0,
          right: '66.6667%',
          top: 0,
          bottom: 0,
        },
        {
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
          data: data_e,
          label: {
            position: 'inner',
            fontSize: 12,
            formatter: '{c}',
          },
          left: '33.3333%',
          right: '33.3333%',
          top: 0,
          bottom: 0,
        },
        {
          type: 'pie',
          radius: '90%',
          center: ['50%', '50%'],
          data: data_c,
          label: {
            position: 'inner',
            fontSize: 12,
            formatter: '{c}',
          },
          left: '66.6667%',
          right: 0,
          top: 0,
          bottom: 0,
        },
      ],
    });
  };

  defineExpose({
    initChart,
  });
</script>
<style lang="scss" scoped>
  .pie {
    width: 100%;
    margin-top: 100px;
  }
</style>
