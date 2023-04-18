<template>
  <div class="wrap">
    <section class="head">
      <div>
        <van-tabs class="area" v-model:active="areaActive" type="card" shrink>
          <van-tab title="顺庆校区" />
          <van-tab title="高坪校区" />
        </van-tabs>
      </div>
      <div class="time" @click="handleTime"> <van-icon size="20" name="clock-o" />{{ currentDate.join('-') }} </div>
    </section>

    <van-tabs v-model:active="energyActive" class="energy">
      <van-tab title="用水数据" />
      <van-tab title="用电数据" />
      <van-tab title="标煤数据" />
    </van-tabs>

    <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '30%' }">
      <van-date-picker
        v-model="currentDate"
        title="选择日期"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmTime"
        @cancel="cancelTime"
      />
    </van-popup>

    <!-- <canvas id="container" width="400" height="260"></canvas> -->
    <!-- <Line /> -->
    <TableVxe :tableData="tableData" :loadingTable="loadingTable" />
    <!-- <Line /> -->
    <Line ref="lineRef" />
    <Pie ref="pieRef" />
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  // import { Canvas, Chart, Interval, jsx, Legend } from '@antv/f2';
  // import Line from './components/Line.vue';
  // import legendPage from './components/LegendPage.js';
  import TableVxe from './components/table.vue';
  import Line from './components/Line.vue';
  import Pie from './components/Pie.vue';

  import { queryWaterByCondition, queryElectricByCondition, queryCoalByCondition, queryCweLine, queryCwePie } from './api';

  const areaActive = ref('高坪校区');
  const energyActive = ref('用水数据');
  const currentDate = ref(['2023', '03', '20']);
  const minDate = new Date(2023, 1, 1);
  const maxDate = new Date(2025, 5, 1);
  const showBottom = ref(false);
  const tableData = ref([]);
  const lineData = ref([]);
  const pieData = ref([]);
  const lineRef = ref(null);
  const pieRef = ref(null);
  const loadingTable = ref(false);

  const handleTime = () => {
    showBottom.value = true;
  };
  const confirmTime = () => {
    showBottom.value = false;
    getTableData();
  };
  const cancelTime = () => {
    showBottom.value = false;
  };

  const getTableData = async () => {
    loadingTable.value = true;
    try {
      console.log(energyActive.value, areaActive.value);
      const campus = areaActive.value;
      const time = currentDate.value.join('-');
      let meth = '';
      switch (energyActive.value) {
        case 0:
          meth = queryWaterByCondition;
          break;
        case 1:
          meth = queryElectricByCondition;
          break;
        case 2:
          meth = queryCoalByCondition;
          break;
      }
      tableData.value = await meth(campus, time);
      getLineData();
      getPieData();
      loadingTable.value = false;
    } catch (error) {
      loadingTable.value = false;
    }
  };

  const getLineData = async () => {
    const campus = areaActive.value;
    lineData.value = await queryCweLine(campus);
    const data = [];
    const series = [
      {
        name: '水',
        type: 'line',
        stack: 'Total',
        // data: [120, 132, 101, 134, 90, 230, 210]
        data: [],
      },
      {
        name: '电',
        type: 'line',
        stack: 'Total',
        data: [],
        // data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '煤',
        type: 'line',
        stack: 'Total',
        data: [],
        // data: [220, 182, 191, 234, 290, 330, 310]
      },
    ];
    lineData.value.forEach((item) => {
      if (!data.includes(item.date)) {
        data.push(item.date);
      }
      if (item.type === 'w') {
        series[0].data.push(item.data);
      } else if (item.type === 'e') {
        series[1].data.push(item.data);
      } else {
        series[2].data.push(item.data);
      }
    });
    lineRef.value.initChart(series, data);
  };

  const getPieData = async () => {
    const campus = areaActive.value;
    const time = currentDate.value.join('-');
    pieData.value = await queryCwePie(campus, time);

    const datas = [[], [], []];

    pieData.value.forEach((item) => {
      const { type, businessData, liveData, teachData } = item;
      if (type === 'w') {
        datas[0] = [
          { name: '教学区域', value: teachData },
          { name: '生活区域', value: liveData },
          { name: '商业区域', value: businessData },
        ];
      } else if (type === 'e') {
        datas[1] = [
          { name: '教学区域', value: teachData },
          { name: '生活区域', value: liveData },
          { name: '商业区域', value: businessData },
        ];
      } else {
        datas[2] = [
          { name: '教学区域', value: teachData },
          { name: '生活区域', value: liveData },
          { name: '商业区域', value: businessData },
        ];
      }
    });

    pieRef.value.initChart(datas);
  };

  watch(
    () => energyActive.value,
    () => {
      getTableData();
    },
  );

  watch(
    () => areaActive.value,
    () => {
      getTableData();
    },
  );
</script>

<style lang="scss" scoped>
  :deep(.van-tabs__nav) {
    margin: 0;
  }
  .head {
    overflow: hidden;
    display: flex;
    align-items: center;
    margin-top: 20px;
    & > div {
      display: inline-block;
      width: 50%;
      float: left;
    }
    .time {
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: right;

      & > div {
        width: 50%;
      }
      .van-icon {
        margin-right: 10px;
      }
    }
  }

  .nut-card {
    padding: 15px;
    border-bottom: 1px solid #e5e5e5;
  }
  .area {
    margin-top: 10px;
  }
  .energy {
    margin-top: 50px;
  }
  .wrap {
    padding-bottom: 50px;
  }
</style>
