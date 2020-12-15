import axios from "axios";
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@src/utils/public';
const baseURL = '/';
const timeout = 80 * 1000;
const ajax = axios.create({
  baseURL,
  timeout
});

/**
 * 局部请求前钩子 参数校验应该在这里
 * @param config
 * @returns {{axios.config}}
 */
const beforeHook = config => {
  const defaultBeforeHook = config => config;
  config.before = config.before || defaultBeforeHook;
  return config.before(config);
};

/**
 * 局部请求后钩子 响应数据处理应该放在这里
 * @param config
 * @returns {{axios.response}}
 */
const afterHook = res => {
  const defaultAfterHook = res => res;
  res.config.after = res.config.after || defaultAfterHook;
  return res.config.after(res);
};

ajax.interceptors.request.use(
  config => {
    Nprogress.start()
    const token = getToken()
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    } else {
      
    }
    config = beforeHook(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

ajax.interceptors.response.use(res => {
  Nprogress.done()
  let errcode = res.data.errcode
  if (errcode === 10001) {
    sessionStorage.clear();
    return Promise.reject(res)
  }else if (errcode === 10000) {
    return Promise.reject(res)
  }
  res = afterHook(res);
  return res;
},
  error => {
    return Promise.reject(error);
  }
);

export default ajax;
