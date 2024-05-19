//axios封装
import axios from 'axios'


const httpInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,//此处需配置项目基地址
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