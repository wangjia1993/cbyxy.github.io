import useAxiosApi from '/@/utils/useAxiosApi';

/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function loginPassword() {
  return useAxiosApi(`/cwe/queryCwePie/0/2023-3-20`, {
    method: 'GET',
    data: {},
    paramas: {},
  });
}
