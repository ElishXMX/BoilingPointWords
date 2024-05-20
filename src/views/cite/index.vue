<template>
     <!-- 表单:选择单词书和数量 -->
    <el-form :inline="true" :model="wantedWords" class="demo-form-inline">
    <el-form-item label="背单词数量">
        <el-input v-model="wantedWords.number" placeholder="背单词数量" clearable />
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
    
    <el-card style="width: 300px" shadow="hover" class="card"v-if="currentWord">
        <el-text class="mx-1" size="large">{{currentWord.English}}</el-text><br>
        
        <el-text class="mx-1">{{ currentWord.Chinese }}</el-text><br>
        
        <el-button type="success" @click="remember">记住</el-button>
        <el-button type="info" @click="forget">忘记</el-button>
        <el-button type="warning" @click="confuse">困惑</el-button>

    </el-card>
    
    </div>
    
    
  </template>


<script lang="ts" setup>
import { reactive } from 'vue'
import { ref, computed,watch } from 'vue';


const wantedWords = reactive({
  number:null ,
  book: '',
 
})

const wantWords = reactive({
  number:null ,
  book: '',
 
}) 

const onSubmit = () => {
  wantWords.number = Number(wantedWords.number);
  wantWords.book = wantedWords.book.trim();
}


//单词列表引入
import { storeToRefs } from 'pinia'
import { useWordsStore} from '@/stores/words'
const wordsStore = useWordsStore()
const { wordsList}=storeToRefs(wordsStore)

//从单词列表中随机获取单词
const citeWords = computed(() => {
  const book = wantWords.book;
  const number = Number(wantWords.number);
  const filteredWords = wordsList.value.filter(word => word.book === book);
  return filteredWords.slice(0, number);
});

//显示当前单词，从以获取的单词列表中随机获取一个单词
const currentWord = computed(() => {
  const words = citeWords.value;
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
});

//按键事件绑定





//remember方法，将当前单词添加到已背单词列表
const remember = () => {
  wordsStore.addWord(currentWord.value);
}

//forget方法，将当前单词从已背单词列表中移除
const forget = () => {
  wordsStore.removeWord(currentWord.value);
}

//confuse方法，将当前单词标记为疑问词
const confuse = () => {
  wordsStore.confuseWord(currentWord.value);
}

//watch监听，当单词列表更新时，重新获取当前单词






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
