//axios封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../store/user'

const httpInstance = axios.create({
baseURL: 'http://192.168.149.57:8081/',
  //此处需配置项目基地址
  timeout: 5000
})

//请求拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore()
  const token = userStore.userInfo.data
  if (token) {
    config.headers.Authorization = `${token}`}
    return config
  }, e => Promise.reject(e))
  
  // axios响应式拦截器
  httpInstance.interceptors.response.use(res => res.data, e => {
    // 统一错误提示
    ElMessage({
      type: 'warning',
      message: e.response.msg
    })
    return Promise.reject(e)
  })
  
  
  export default httpInstance