<template>
     <!-- 表单:选择单词书和数量 -->
    <el-card>
      <el-form :inline="true" :model="wantedWords" class="demo-form-inline">
    <el-form-item label="背单词数量">
        <el-input-number type="number" v-model="wantedWords.number" placeholder="背单词数量" clearable />
    </el-form-item>
      <el-form-item label="单词书">
        <el-select
          v-model="wantedWords.book"
          placeholder="单词书"
          clearable
        >
          <el-option label="四级词汇" value="CET4" />
          <el-option label="雅思词汇" value="IELTS" />
          <el-option label="六级词汇" value="CET6" />
          <el-option label="托福词汇" value="TOEFL" />
        </el-select>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">开始背单词</el-button>
      </el-form-item>
    </el-form>
    </el-card>
    
    
    <div class="flex flex-wrap gap-4 " style="margin-top: 100px;">
   

    <el-card style="width: 300px;height: 400px;" shadow="hover" class="card" v-if="CiteStore.citeWords.length>0">
        <el-text class="mx-1" size="large" style="font-size: 3rem;">{{currentWord.currentWord[0].english}}</el-text><br>
        <div v-if="judge.show" style="margin-top: 40px;">
          <el-button type="success" @click="ifRemember">记住</el-button>
          <el-button type="info" @click="ifForget">忘记</el-button>
          <el-button type="warning" @click="ifConfuse">困惑</el-button>
        </div>
        <el-text class="mx-1" v-if="judge.showChinese" style="font-size: 1.5rem;">{{ currentWord.currentWord[0].chinese }}</el-text><br>
        <div v-if="judge.showTure" style="margin-top: 40px;">
          <el-button type="success" @click="remember">记对了</el-button>
          <el-button type="info" @click="forget">记错了</el-button>
        </div>
        <el-button type="info" @click="forget" v-if="judge.showNextForget">下一个</el-button>
        <el-button type="warning" @click="confuse" v-if="judge.showNextConfuse">下一个</el-button>
    </el-card>
    <el-text class="mx-1" size="large" v-if="judge.showEnd && CiteStore.citeWords.length==0">！恭喜完成所有单词学习！</el-text>
    </div>
    
    
  </template>


<script lang="ts" setup>
import { reactive } from 'vue'
import { useCiteWordsStore } from '@/stores/wordsStore';
import {watch} from 'vue'
import { useCurrentWordStore } from '@/stores/currentWord';
import axios from 'axios';
import request  from '@/utils/http';
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();
const currentWord = useCurrentWordStore();
const CiteStore = useCiteWordsStore();
const wantedWords = reactive({
  number: 0,
  book: null,
});
watch(CiteStore.citeWords, () => {
  currentWord.removeWord();
  currentWord.setWord();
})


//以下为所有点击事件的逻辑
//点击开始背单词按钮，将wantedWords中的数据传递给store
const onSubmit = () => {
  CiteStore.filterWords(wantedWords.number, wantedWords.book);
  console.log(wantedWords);
  console.log('CiteStore',CiteStore.citeWords);
  judge.showEnd = true;
}
const judge = reactive({
  show:true,
  showChinese:false,
  showTure:false,
  showNextForget:false,
  showNextConfuse:false,
  showEnd:false,
})
const ifRemember = () => {
  console.log('ifRemember被调用');
  judge.show = false;
  judge.showChinese = true;
  judge.showTure = true;
}
const ifForget = () => {
  console.log('forget被调用');
  judge.show = false;
  judge.showChinese = true;
  judge.showNextForget = true;

}
const ifConfuse= () => {
  judge.show = false;
  judge.showChinese = true;
  judge.showNextConfuse = true;
}
//点击记住按钮，将当前单词从待背单词中移除
const remember = () => {
  request({
    method: 'post',
    url: '/Menu/recite',
    data: {
      uid:userStore.userInfo.uid ,
      id:currentWord.currentWord[0].id,
      state:currentWord.currentWord[0].remember,
    }
  }).then(res => {
    console.log(res);
  })
  CiteStore.removeWord(currentWord.currentWord[0]);
  currentWord.currentWord[0].remember = true;
  judge.show = true;
  judge.showChinese = false;
  judge.showTure = false;
}
//点击忘记按钮，新增两个当前单词到列表中
const forget = () => {
  request({
    method: 'post',
    url: '/Menu/recite',
    data: {
      uid:userStore.userInfo.uid ,
      id:currentWord.currentWord[0].id,
      state:currentWord.currentWord[0].remember,
    }
  }).then(res => {
    console.log(res);
  })
  CiteStore.addWord(currentWord.currentWord[0]);
  currentWord.currentWord[0].remember=false;
  judge.show = true; 
  judge.showTure = false;
  judge.showChinese = false;
  judge.showNextForget = false;
}
//点击困惑按钮，新增个当前单词到列表中
const confuse = () => {
  request({
    method: 'post',
    url: '/Menu/recite',
    data: {
      uid:userStore.userInfo.uid ,
      id:currentWord.currentWord[0].id,
      state:currentWord.currentWord[0].remember,
    }
  }).then(res => {
    console.log(res);
  })
  CiteStore.removeWord(currentWord.currentWord[0]);
  CiteStore.addWord(currentWord.currentWord[0]);
  judge.show = true; 
  judge.showChinese = false;
  judge.showNextConfuse = false;
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
