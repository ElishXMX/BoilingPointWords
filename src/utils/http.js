//axios封装
import axios from 'axios'


const httpInstance = axios.create({
  baseURL: 'http://192.168.149.57:8081',
  //此处需配置项目基地址
  timeout: 5000
})

//请求拦截器
httpInstance.interceptors.request.use(config => {
    return config
  }, e => Promise.reject(e))
  
  // axios响应式拦截器
  httpInstance.interceptors.response.use(res => res.data, e => {
    return Promise.reject(e)
  })
  
  
  export default httpInstance