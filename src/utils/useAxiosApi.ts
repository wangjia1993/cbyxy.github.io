// import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { showToast } from 'vant';
import 'vant/es/toast/style';

// create an axios instance
const instance = axios.create({
  withCredentials: false,
  timeout: 5000,
});

// request interceptor
instance.interceptors.request.use(
  (config) => {
    console.log('config', config);
    config.url = `http://112.74.188.176:8080/${config.url}`;
    // do something before request is sent
    // const token = store.state.user.token;

    // if (token) {
    //   // let each request carry token
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${token}`
    //   };
    // }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    return response.data;
    // if the custom code is not 200, it is judged as an error.
    // if (res.code !== 200) {
    //   showToast(res.msg);
    //   // 412: Token expired;
    //   if (res.code === 412) {
    //     // store.dispatch('user/userLogout');
    //   }
    //   return Promise.reject(res.msg || 'Error');
    // } else {
    //   return res;
    // }
  },
  (error) => {
    console.log('err' + error);
    showToast(error.message);
    return Promise.reject(error.message);
  },
);

/**
 * reactive useFetchApi
 */

export default function useAxiosApi(url: string, config: any) {
  return instance(url, config);
}
