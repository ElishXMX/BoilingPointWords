<template>
  <el-card>
    <div class="user-info" style="display: flex;align-items: center;justify-content: left;">
    
  
      <div class="name">姓名：{{ user.name }}</div>
      <div class="email">邮箱：{{ user.email }}</div>
      <div class="phone">电话：{{ user.phone }}</div>
      <div class="address">地址：{{ user.address }}</div>
    </div>
  </el-card>

  <el-card style="margin-top: 20px;">
    <!-- 历史答题记录 -->
<div class="history-records">
            <div class="title">历史答题记录</div>
    <div class="records">
        <el-card class="record" style="margin-top: 20px;">
          <div class="date">2022-01-01</div>
          <div class="score">80</div>
          <div class="actions">
            <el-button type="text" @click="handleEdit">编辑</el-button>
            <el-button type="text" @click="handleDelete">删除</el-button>
          </div>
        </el-card>
        <el-card class="record" style="margin-top: 20px;">
          <div class="date">2022-01-01</div>
          <div class="score">80</div>
          <div class="actions">
            <el-button type="text" @click="handleEdit">编辑</el-button>
            <el-button type="text" @click="handleDelete">删除</el-button>
          </div>
        </el-card>




  </div>

</div>



  </el-card>








  </template>
    

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
const userSt = useUserStore()

const user = ref({
  name:userSt.userInfo.account ,
  email: '',
  phone: '',
  address: '',
})

const handleEdit = () => {
  console.log('handleEdit')
  
}

const handleDelete = () => {
  console.log('handleDelete')

}

</script>