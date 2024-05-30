<template>
  <el-card>
    <div class="user-info" style="display: flex;align-items: center;justify-content: left;">
      <div class="name">用户名：{{ user.name }}</div>
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

        </el-card>
        
  </div>

</div>



  </el-card>








  </template>
    

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import request from '@/utils/http'
import { useUserStore } from '@/stores/userStore'
const userSt = useUserStore()

const user = ref({
  name:userSt.userInfo.account ,
  school:userSt.userInfo.school,
  level:userSt.userInfo.level
})

onMounted(() => {
 request({
    url: '/Menu/showRecord',
    method: 'post',
    data: 
      1,
    
}).then((res) => {
    console.log(res)
  })
})


const handleEdit = () => {
  console.log('handleEdit')
  
}

const handleDelete = () => {
  console.log('handleDelete')

}

</script>