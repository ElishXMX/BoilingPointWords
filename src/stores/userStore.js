// 管理用户数据相关

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { regisiterAPI } from '@/apis/user'

export const useUserStore = defineStore('user', () => {
  

  const userInfo = ref({})
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    console.log('这是登录接口的返回值',res)
    userInfo.value = res
    console.log('这是登录成功后的用户信息', userInfo.value)
    return userInfo.value
   
  }
  const regisiterUser = async ({account,password}) => {
    const res = await regisiterAPI({account,password})
    console.log('这是注册接口的返回值',res)
    return res}

  // 退出时清除用户信息
  const clearUserInfo = () => {
    //清除本地储存
    userInfo.value = {}
    location.reload();
    // localStorage.removeItem('userInfo')
  
    console.log('用户信息已清除')
  }
  // 3. 以对象的格式把state和action return
  return {
    userInfo,
    getUserInfo,
    clearUserInfo,
    regisiterUser,
  }
}, {
  // 4. 开启持久化
  persist: true
})