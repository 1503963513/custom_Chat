import axios from 'axios'
import { Toast } from '@douyinfe/semi-ui';

const service = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: 'http://192.168.202.1:8527/public',
  timeout: 10000,
})

service.interceptors.request.use((config) => {
  console.log('这里加token');
  return config
})

service.interceptors.response.use((response) => {
  if (response.status >= 200 || response.status <= 300) {

    let { message, code } = response.data
    if (code === 401) {
      Toast.error(message)
      return '....'
    }

    if (code === 200) {
      return response.data
    }

    // 错误提示
    Toast.info(message)
    const err = new Error('异常：' + message)
    return Promise.reject(err);
  }
}, function(err) {
  return Promise.reject(err);
})

export default service
