import axios from 'axios';
import qs from 'qs';

// axios拦截器
axios.interceptors.response.use(
  res => Promise.resolve(res),
  error => {
    // const statusCode = error.response.status;
    return Promise.reject(error.response)
  }
)

/**
 * uni.request封装
 * @param api apiList里面的对象，包括{url,method}属性
 * @param url
 * @param query url拼接参数
 * @param data 请求参数
 * @param requestTimes 第几次请求
 * @returns {Promise<unknown>}
 */
function request({api,url,query,data},requestTimes = 1){
  // 只允许重复请求一次，避免无限循环
  if (requestTimes > 2) {
    throw new Error('request again too many times')
  }

  return new Promise(resolve => {
    // 拼接url
    if(!url) url = api.url;
    const newUrl = query ? url + `?${qs.stringify(query)}` : url;
    const headers = {
      'Content-Type': 'application/json'
    }

    axios({url: newUrl, method: api.method, data, headers })
      .then(res => resolve(res))
      .catch(err => resolve(err))
  })
}

export default request;
