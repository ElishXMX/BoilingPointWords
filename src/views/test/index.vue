<template>
  <!-- 表单:选择单词书和数量 -->
  <el-card>
    <el-form :inline="true" :model="local.wantedWords" class="demo-form-inline">
    <el-form-item label="背单词数量">
        <el-input-number type="number" v-model="local.wantedWords.number" placeholder="背单词数量" clearable maxlength="100px" />
    </el-form-item>
    <el-form-item label="知英选中数量">
        <el-input-number type="number" v-model="local.wantedWords.EnglishNumber" placeholder="知英选中数量" clearable />
       
    </el-form-item>
      <el-form-item label="单词书">
        <el-select
          v-model="local.wantedWords.book"
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
  </el-card>

<!-- 统计测试得分 -->
<el-card class="card" v-show="local.citeWords.length!=0" >
      <el-col :span="6" style="width: 200px;display:inline-block">
        <el-statistic :value="numberUsed">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              单词计数
              <el-icon style="margin-left: 4px" :size="12">
                <Male />
              </el-icon>
            </div>
          </template>
          <template #suffix>/{{ local.wantedWords.number }}</template>
        </el-statistic>
      </el-col>


      <el-col :span="8" style="width: 200px;display:inline-block">
      <el-countdown title="Start to grab" :value="remainTime" />
      </el-col>



  </el-card>







<!-- 测试卡片 -->

  <el-card class="card" shadow="hover" v-if="local.citeWords.length!=0">
    <template #header>
      <div class="card-header" v-if="local.judgesNumber.number%2===1">
        <el-text class="mx-1" size="large" style="font-size: 2rem;">{{local.currentWord[0].english}}</el-text><br>
      </div>
      <div class="card-header" v-else>
        <el-text class="mx-1" size="large" style="font-size: 2rem;">{{local.currentWord[0].chinese}}</el-text><br>
      </div>
    </template>

    <!-- 从Chineses数组中随机选择四个中文作为测试卡片内容 -->
    <div v-if="local.judgesNumber.number %2===1">
    <div v-for="(Chinese, index) in local.Chinese" :key="index" class="card-content" >
      <el-button :type='local.buttonType'  plain @click="local.ifChineseRight(Chinese)" style="width: 100px;">
        {{Chinese}}
      </el-button>
    </div>
  </div>
    <!-- 从English数组中随机选择四个英文作为测试卡片内容 -->
    <div v-else>
      <div v-for="(English, index) in local.English" :key="index" class="card-content">
      <el-button :type="local.buttonType"  plain  @click="local.ifEnglishRight(English)" style="width: 100px;">{{English}}</el-button>
    </div>
    </div>

    <!--  -->
    
    
  </el-card>




</template>


<script lang="ts" setup>

// import { useCiteWordsStore } from '@/stores/wordsStore';
import {watch} from 'vue'

import {useLocalStore} from '@/stores/local'
const local = useLocalStore();

//获取wantedWords.Number个数字，其中有wantedWords.EnglishNumber个奇数,将其放入judges数组中，并将其随机排序


// import { useCurrentWordStore } from '@/stores/currentWord';
// const currentWord = useCurrentWordStore();


watch(local.citeWords, () => {
  console.log('citeWords',local.citeWords);
  console.log('currentWord',local.currentWord);
 local. removeWord();
  local.setWord();
  local.cleanChinese();
  local.cleanEnglish();
  
  local.nextJudge();
 
  console.log(local.judges);
  console.log(' 开始背单词',local.judgesNumber.number);
  if (local.citeWords.length == 0) {
    console.log('没有单词了');
    local.clearLocal();
  }else{
  local.updateChinese();
  local.updateEnglish();
  }
  
 
})

//点击开始背单词按钮，将wantedWords中的数据传递给store
const onSubmit = () => {
  
        // 执行开始背单词的逻辑
        local.filterWords(local.wantedWords.number, local.wantedWords.book);
        local.getJudges();
      }













</script>

<style lang="scss">
  // .card {
  //   display: flex;
  //   position: relative;
  //   /* 居中 */
  //   top: 50%;
  //   left: 50%;
  //   margin-top:25% ;
  //   transform: translate(-50%, -50%);
  //   flex-direction: column;
  //   align-items: center;
  //   justify-content: center;
  //   height: 450px;
  //   width: 400px;
  //   padding: 20px;
  //   font-size: 24px;
  //   color: #333;
  //   border: 1px solid #ccc;
  //   border-radius: 4px;
    
  //   /* 文字大小 */
  //   text-align: center;
  //   line-height: 2;
  //   /* 文字阴影 */
  //   text-shadow: 1px 1px 1px #ccc;
  //   el-button {
  //     margin-right: 10px;
  //     margin-bottom: 10px;  
  //     min-width: 200px;
  // }
  // }
  .el-form {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
  }

  .card {
    max-width: 400px;
    text-align: center;
    //左右居中，卡片不重叠
    margin: 0 auto;
    margin-top: 20px;
    // 卡片阴影
    //行高
    line-height: 3.5;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);

   


    
   
  }
</style>