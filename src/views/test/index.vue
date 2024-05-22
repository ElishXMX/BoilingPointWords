<template>
  <!-- 表单:选择单词书和数量 -->
  <el-form :inline="true" :model="wantedWords" class="demo-form-inline">
    <el-form-item label="背单词数量">
        <el-input type="number" v-model="wantedWords.number" placeholder="背单词数量" clearable maxlength="100px" />
    </el-form-item>
    <el-form-item label="知英选中数量">
        <el-input type="number" v-model="wantedWords.EnglishNumber" placeholder="知英选中数量" clearable />
       
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


<!-- 测试卡片 -->

  <el-card class="card" shadow="hover">
    <template #header>
      <div class="card-header">
        <el-text class="mx-1" size="large">{{currentWord[0].Chinese}}</el-text><br>
      </div>
    </template>

    <!-- 从Chineses数组中随机选择四个中文作为测试卡片内容 -->

    <div v-for="(Chinese, index) in Chinese" :key="index" class="card-content">
      <el-text>{{Chinese}}</el-text>
    </div>
    
    <!-- 从English数组中随机选择四个英文作为测试卡片内容 -->

    <div v-for="(English, index) in English" :key="index" class="card-content">
      <el-text>{{English}}</el-text>
    </div>
    
    
  </el-card>




</template>


<script lang="ts" setup>
import { reactive } from 'vue'
// import { useCiteWordsStore } from '@/stores/wordsStore';
import {watch} from 'vue'
import {useWordsStore} from '@/stores/words';
import { el } from 'element-plus/es/locale';


const citeWords = reactive([]); // 当前背诵的单词列表
    // 筛选单词列表
    function filterWords(number=0 , book) {
        const wordsStore = useWordsStore();
        const words = wordsStore.wordsList.filter(word => word.book === book && word.remember === false);
        // 随机选择number个单词添加到citeWords
        for (let i = 0; i < number; i++) {
            const index = Math.floor(Math.random() * words.length);
            citeWords.push(words[index]);
            words.splice(index, 1);
}}
    // 移除单词
    function removeWordcite(word) {
        citeWords.splice(citeWords.indexOf(word), 1);

    }
    function addWord(word) {
        citeWords.push(word);
    }
// 随机选择一个单词
function randomWord() {
        const index = Math.floor(Math.random() * citeWords.length);
        return citeWords[index];
    }




// import { useCurrentWordStore } from '@/stores/currentWord';
// const currentWord = useCurrentWordStore();
const currentWord = reactive([{English: '没有', Chinese: '更多单词哦',remember: false}])

  function setWord() {
 
    //将获取的单词添加到currentWord数组中
    currentWord.push(randomWord())
    
  }
  
  function removeWord() {
    //将数组中的最后一个单词移除
    currentWord.pop()
  }


const wantedWords = reactive({
  number: 0,
  book: null,
  EnglishNumber: 0,
});

watch(citeWords, () => {
  removeWord();
  setWord();
  updateEnglish();
})

//点击开始背单词按钮，将wantedWords中的数据传递给store
const onSubmit = () => {
  filterWords(wantedWords.number, wantedWords.book);
  console.log(wantedWords);
  console.log(Chinese);
  

}


const Chinese=reactive([])
const updateChinese = ()=> {
//从wordsStore中获取四个不相同的单词中文作为测试卡片内容，并将其添加到Chinese数组中，其中有一个中文与currentWord数组中的中文相同
Chinese.push(currentWord[0].Chinese)
const wordsStore = useWordsStore();
const words = wordsStore.wordsList;
console.log(words);
for (let i = 0; i < 3; i++) {
  const index = Math.floor(Math.random() * words.length);
  //如果中文已经存在，则重新选择
  if (Chinese.includes(words[index].Chinese)) {
    i--;
  } else {
    Chinese.push(words[index].Chinese);
  }
  
}}

//从wordsStore中获取四个不相同的单词英文作为测试卡片内容，并将其添加到English数组中，其中有一个中文与currentWord数组中的英文相同
const English=reactive([])
const updateEnglish = ()=> {
//从wordsStore中获取四个不相同的单词英文作为测试卡片内容，并将其添加到English数组中，其中有一个中文与currentWord数组中的英文相同
English.push(currentWord[0].English)
const wordsStore = useWordsStore();
const words = wordsStore.wordsList;
console.log(words);
for (let i = 0; i < 3; i++) {
  const index = Math.floor(Math.random() * words.length);
  //如果英文已经存在，则重新选择
  if (English.includes(words[index].English)) {
    i--;
  } else {
    English.push(words[index].English);
  }
  
}}

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