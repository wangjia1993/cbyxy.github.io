<template>
  <div class="pie">
    <canvas id="myChart2" :width="domWidth" height="600"></canvas>
  </div>
</template>

<script setup>
  import * as echarts from 'echarts';
  import { defineExpose, ref } from 'vue';
  const domWidth = ref(window.innerWidth - 30);

  const initChart = (datas) => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('myChart2'));
    // 绘制图表
    myChart.setOption({
      title: {
        text: '用能占比',
        left: 'center',
        textStyle: {
          color: '#333',
          fontWeight: 'bold',
          fontSize: 18,
        },
      },
      series: datas.map(function (data, idx) {
        var top = idx * 33.3;
        return {
          type: 'pie',
          radius: [20, 60],
          top: top + '%',
          height: '33.33%',
          left: 'center',
          width: 400,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
          },
          label: {
            alignTo: 'edge',
            formatter: '{name|{b}}\n{time|{c} 小时}',
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            rich: {
              time: {
                fontSize: 10,
                color: '#999',
              },
            },
          },
          labelLine: {
            length: 15,
            length2: 0,
            maxSurfaceAngle: 80,
          },
          labelLayout: function (params) {
            const isLeft = params.labelRect.x < myChart.getWidth() / 2;
            const points = params.labelLinePoints;
            // Update the end point.
            points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width;
            return {
              labelLinePoints: points,
            };
          },
          data: data,
        };
      }),
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
