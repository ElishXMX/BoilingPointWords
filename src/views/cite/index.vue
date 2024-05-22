<template>
     <!-- 表单:选择单词书和数量 -->
    <el-form :inline="true" :model="wantedWords" class="demo-form-inline">
    <el-form-item label="背单词数量">
        <el-input type="number" v-model="wantedWords.number" placeholder="背单词数量" clearable />
    </el-form-item>
      <el-form-item label="单词书">
        <el-select
          v-model="wantedWords.book"
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
    
    <el-card style="width: 300px" shadow="hover" class="card" v-if="CiteStore.citeWords.length>0">
        <el-text class="mx-1" size="large">{{currentWord.currentWord[0].English}}</el-text><br>
        
        <el-text class="mx-1">{{ currentWord.currentWord[0].Chinese }}</el-text><br>
        
        <el-button type="success" @click="remember">记住</el-button>
        <el-button type="info" @click="forget">忘记</el-button>
        <el-button type="warning" @click="confuse">困惑</el-button>

    </el-card>
    
    </div>
    
    
  </template>


<script lang="ts" setup>
import { reactive } from 'vue'
import { useCiteWordsStore } from '@/stores/wordsStore';
import {watch} from 'vue'
import { useCurrentWordStore } from '@/stores/currentWord';

const currentWord = useCurrentWordStore();

const CiteStore = useCiteWordsStore();

const wantedWords = reactive({
  number: 0,
  book: null,
});

//组件挂载后，获取当前单词

//点击开始背单词按钮，将wantedWords中的数据传递给store
const onSubmit = () => {
  CiteStore.filterWords(wantedWords.number, wantedWords.book);
  console.log(wantedWords);
  console.log('CiteStore',CiteStore.citeWords);
  
}


watch(CiteStore.citeWords, () => {
  currentWord.removeWord();
  currentWord.setWord();
  

})

//点击记住按钮，将当前单词从待背单词中移除
const remember = () => {
  CiteStore.removeWord(currentWord.currentWord[0]);
  console.log('removeWord被调用');
  currentWord.currentWord[0].remember = true;
}

</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}


</style>
