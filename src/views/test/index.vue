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
        <el-button type="primary" @click="onSubmit">开始背单词</el-button>
      </el-form-item>
    </el-form>

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