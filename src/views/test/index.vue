<template>
  <!-- 表单:选择单词书和数量 -->
  <el-form :inline="true" :model="Words" class="demo-form-inline">
    <el-form-item label="测试数量">
        <el-input v-model="Words.number" placeholder="测试数量" clearable />
    </el-form-item>
      <el-form-item label="单词书">
        <el-select
          v-model="Words.book"
          placeholder="单词书"
          clearable
        >
          <el-option label="四级词汇" value="CET4" />
          <el-option label="四级精选" value="CET4s" />
          <el-option label="六级词汇" value="CET6" />
          <el-option label="六级精选" value="CET6s" />
        </el-select>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">开始测试</el-button>
      </el-form-item>
    </el-form>


<!-- 测试卡片 -->

  <el-card class="card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>CurrentlyWord</span>
      </div>
    </template>
    <p v-for="o in 4" :key="o" class="text item"><el-button  size="large">{{o}}</el-button></p>
    
  </el-card>




</template>


<script lang="ts" setup>
import { reactive } from 'vue'

const Words = reactive({
  number: '',
  book: '',
 
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style lang="scss">
  .card {
    display: flex;
    position: relative;
    /* 居中 */
    top: 50%;
    left: 50%;
    margin-top:25% ;
    transform: translate(-50%, -50%);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 450px;
    width: 400px;
    padding: 20px;
    font-size: 24px;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 4px;
    
    /* 文字大小 */
    text-align: center;
    line-height: 2;
    /* 文字阴影 */
    text-shadow: 1px 1px 1px #ccc;
    el-button {
      margin-right: 10px;
      margin-bottom: 10px;  
      min-width: 200px;
  }
  }
</style>