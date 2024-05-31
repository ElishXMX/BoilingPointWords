<template>
  <!-- <el-card>
    <div class="user-info" style="display: flex;align-items: center;justify-content: left;">
      <div class="name">用户名：{{ userSt.userInfo.username }}</div>
    </div>
  </el-card> -->

  <el-card style="margin-top: 20px;width: 50%;">
    <!-- 历史答题记录 -->
<div class="history-records">
            <div class="title">历史答题记录</div>
    <div class="records">
     
          <el-table :data="records" style="width: 100%">
            <el-table-column prop="word" label="词汇" />
            <el-table-column prop="tof" label="对错记录" />
           
          </el-table>

        
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


const records = ref()
onMounted(() => {
 request({
    url: '/Menu/showRecord',
    method: 'post',
   data: {
     num: userSt.userInfo.uid
    }
}).then((res) => {
    console.log('记录',res)
    records.value = res.data
  })
})




</script>