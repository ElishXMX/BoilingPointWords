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


<!-- 测试卡片 -->

  <el-card class="card" shadow="hover">
    <template #header>
      <div class="card-header">
        <el-text class="mx-1" size="large">{{currentWord.currentWord[0].English}}</el-text><br>
      </div>
    </template>
    <!-- 从wordsStore中获取四个单词的中文作为测试卡片内容 -->

    <!-- <p v-for="o in 4" :key="o" class="text item"><el-button  size="large">{{o}}</el-button></p>
     -->
  </el-card>




</template>


<script lang="ts" setup>
import { reactive } from 'vue'
import { useCiteWordsStoreCopy } from '@/stores/wordsStorecopy';
import {watch} from 'vue'
import {useWordsStore} from '@/stores/words';
import { useCurrentWordStoreCopy } from '@/stores/currentWordcopy';
const currentWord = useCurrentWordStoreCopy();
const CiteStore = useCiteWordsStoreCopy();
const wantedWords = reactive({
  number: 0,
  book: null,
});
const wordsStore = useWordsStore();
watch(CiteStore.citeWords, () => {
  currentWord.removeWord();
  currentWord.setWord();
})

//点击开始背单词按钮，将wantedWords中的数据传递给store
const onSubmit = () => {
  CiteStore.filterWords(wantedWords.number, wantedWords.book);
  console.log(wantedWords);
  console.log('CiteStore',CiteStore.citeWords);
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