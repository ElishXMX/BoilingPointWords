<template>
     <!-- 表单:选择单词书和数量 -->
    <el-form :inline="true" :model="Words" class="demo-form-inline">
    <el-form-item label="背单词数量">
        <el-input v-model="Words.number" placeholder="背单词数量" clearable />
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
    
    
    <div class="flex flex-wrap gap-4 ">
    
    <el-card style="width: 300px" shadow="hover" class="card">
        <el-text class="mx-1" size="large">Word</el-text><br>
        <el-text class="mx-1">单词</el-text><br>
        <el-button type="success" @click="remember">记住</el-button>
        <el-button type="info" @click="forget">忘记</el-button>
        <el-button type="warning" @click="confuse">困惑</el-button>

    </el-card>
    
    </div>
    
    
  </template>


<script lang="ts" setup>
import { reactive } from 'vue'
import { ref, computed,watch } from 'vue';
const Words = reactive({
  number: '',
  book: '',
 
})

const onSubmit = () => {
  console.log('submit!')
}



// 假设有一个单词列表
const words = ref([
      { word: 'apple', translation: '苹果', status: 'new' },
      { word: 'banana', translation: '香蕉', status: 'new' },
      // 更多单词...
    ]);

    // 当前单词
    const currentWord = ref();

    // 根据用户记忆状态过滤单词
    const filteredWords = computed(() => words.value.filter(word => word.status !== 'remembered'));

    // 显示下一个单词
    const showNextWord = () => {
      if (filteredWords.value.length > 0) {
        currentWord.value = filteredWords.value[0];
      }
    };

    // 单词记忆状态
    const remember = () => {
      if (currentWord.value) {
        currentWord.value.status = 'remembered';
        currentWord.value = null; // 重置当前单词
        showNextWord();
      }
    };

    const forget = () => {
      if (currentWord.value) {
        currentWord.value.status = 'forgotten';
        currentWord.value.count = (currentWord.value.count || 0) + 1;
        currentWord.value = null;
        showNextWord();
      }
    };

    const confuse = () => {
      if (currentWord.value) {
        currentWord.value.status = 'confused';
        currentWord.value.count = (currentWord.value.count || 0) + 1;
        currentWord.value = null;
        showNextWord();
      }
    };

    // 组件挂载时显示第一个单词
    watch(() => filteredWords.value, (newVal) => {
      if (newVal.length > 0 && !currentWord.value) {
        showNextWord();
      }
    });

</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}

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
  height: 250px;
  padding: 20px;
  font-size: 24px;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  /* 文字大小 */
  text-align: center;
  line-height: 2;
  /* 文字阴影 */
}
</style>
