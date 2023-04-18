import useAxiosApi from '/@/utils/useAxiosApi';

/**
 * 水 0顺庆 1高坪
 * @returns UseAxiosReturn
 */
export function queryWaterByCondition(campus, time) {
  return useAxiosApi(`/cwe/queryWaterByCondition/${campus}/${time}`, {
    method: 'GET',
  });
}

/**
 * 电 0顺庆 1高坪
 * @returns UseAxiosReturn
 */
export function queryElectricByCondition(campus, time) {
  return useAxiosApi(`/cwe/queryElectricByCondition/${campus}/${time}`, {
    method: 'GET',
  });
}

/**
 * 煤 0顺庆 1高坪
 * @returns UseAxiosReturn
 */
export function queryCoalByCondition(campus, time) {
  return useAxiosApi(`/cwe/queryCoalByCondition/${campus}/${time}`, {
    method: 'GET',
  });
}

/**
 * 折线图
 * @returns UseAxiosReturn
 */
export function queryCweLine(campus) {
  return useAxiosApi(`/cwe/queryCweLine/${campus}`, {
    method: 'GET',
  });
}

/**
 * 饼状图
 * @returns UseAxiosReturn
 */
export function queryCwePie(campus, date) {
  return useAxiosApi(`/cwe/queryCwePie/${campus}/${date}`, {
    method: 'GET',
  });
}
