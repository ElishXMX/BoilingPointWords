// 封装所有和用户相关的接口函数
import request from '@/utils/http'

export const loginAPI = ({ account, password }) => {
  return request({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password,
    }
  })
}



export const regisiterAPI = ({ uid, uname, password }) => { 
  return request({
    url: '/register', 
    method: 'POST',
    data: {
      uid,
      uname,
      password,
    }
  })
}

