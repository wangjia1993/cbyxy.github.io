<template>
  <div class="table">
    <vxe-table :data="tableData" :loading="loadingTable">
      <vxe-column type="seq" title="" width="30" />
      <vxe-column :width="getColumnWidth(item)" :field="item" :title="getColumn(item)" v-for="(item, ind) in keys" :key="ind" />
    </vxe-table>
  </div>
</template>

<script setup>
  import { defineProps, toRefs, computed } from 'vue';

  const props = defineProps({
    tableData: {
      type: Array,
      default: () => [],
    },
    loadingTable: {
      type: Boolean,
      default: false,
    },
  });

  const { tableData, loadingTable } = toRefs(props);
  const keys = computed(() => Object.keys(tableData.value[0] || []).filter((item) => !['areacode', '_X_ROW_KEY'].includes(item)));

  const getColumnWidth = (key) => {
    const keys = {
      level: 50,
      areaname: 110,
      currentMonthData: 100,
      currentYearData: 100,
      date: 110,

      data: 70,
    };
    return keys[key];
  };

  const getColumn = (key) => {
    const keys = {
      level: '等级',
      areaname: '计量区域',
      currentMonthData: '本月总用量',
      currentYearData: '本年总用量',
      date: '日期',

      data: '当日用量',
    };
    return keys[key];
  };

  // const tableData = ref([
  //   { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', address: 'Shenzhen' },
  //   { id: 10002, name: 'Test2', role: 'Test', sex: 'Man', address: 'Guangzhou' },
  //   { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', address: 'Shanghai' },
  //   { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', address: 'Shanghai' },
  // ])
</script>
<style lang="scss" scoped>
  .table {
    margin-top: 20px;
  }
</style>
