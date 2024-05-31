<template>
  <!-- 表单:选择单词书和数量 -->
  <el-card>
    <el-form :inline="true" :model="wantedWords" class="demo-form-inline">
    <el-form-item label="知中选英数量">
        <el-input-number type="number" v-model="wantedWords.number" placeholder="背单词数量" clearable maxlength="100px" />
    </el-form-item>
    <el-form-item label="知英选中数量">
        <el-input-number type="number" v-model="wantedWords.EnglishNumber" placeholder="知英选中数量" clearable />
    </el-form-item>
    <el-form-item label="测试时间/分钟">
        <el-input-number type="number" v-model="wantedWords.time" placeholder="时间" clearable />
    </el-form-item>
      <el-form-item label="单词书">
        <el-select
          v-model="wantedWords.book"
          placeholder="单词书"
          clearable
        >
          <el-option label="四级词汇" value="CET4" />
          <el-option label="六级词汇" value="CET6" />
          <el-option label="雅思词汇" value="IELTS" />
          <el-option label="托福词汇" value="TOEFL"/>
        </el-select>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">开始背单词</el-button>
      </el-form-item>
    </el-form>
  </el-card>

<!-- 统计测试得分 -->
<el-card class="card" v-if="judge!=100">
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
          <template #suffix>/{{ wantedWords.number+wantedWords.EnglishNumber }}</template>
        </el-statistic>
      </el-col>


      <el-col :span="8" style="width: 200px;display:inline-block">
      <el-countdown title="剩余时间" :value="remainTime" />
      </el-col>



  </el-card>
<!-- 测试卡片 -->

  <el-card class="card" shadow="hover" v-if="judge2==1">
    <template #header>
     
      <div class="card-header" >
        <el-text class="mx-1" size="large" style="font-size: 2rem;">{{question.string}}</el-text><br>
      </div>
      
    </template>

    <!-- 从Chineses数组中随机选择四个中文作为测试卡片内容 -->
    <div>
    <div v-for="(option, index) in options" :key="index" class="card-content" >
      <el-button :type="buttonType"  plain @click="checkAnswer(option)" style="width: 100px;">
        {{option}}
      </el-button>
    </div>
  </div>
    

    <!--  -->
    
    
  </el-card>
  <el-card  shadow="hover" 
   v-if="judge==100"
   >
    检测到您有未完成的测试，是否继续？
    <el-button type="primary" @click="ifContinueTest">CONTINUE</el-button>
    <el-button type="danger" @click="cancelTest">CANCEL</el-button>
  </el-card>



</template>


<script setup>
import request from '@/utils/http'
import { reactive, ref } from 'vue'
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useWordsStore } from '@/stores/words';


const wordsStore = useWordsStore()


const userStore = useUserStore()

const numberUsed = ref(0)

const ifContinueTest=()=>{
  console.log('continueTest')
  judge.value=0
  getWord()
}

const cancelTest=()=>{
  console.log('cancelTest')
  request({
    url: '/Menu/nocontinue',
    method: 'get',
}).then((res) => {
  console.log('cancelTest',res)
  judge.value=0
})
}


const judge=ref(0)

const buttonType = ref('primary')

const wantedWords = reactive({
  number: 0,
  EnglishNumber: 0,
  time: 0,
  book: 'CET4', 
})
const remainTime = ref(0)

const options=ref([])
const question=reactive({
  id:0,
  string: '',
  answer: '',
  trueORfalse: false,
})

// 
// 开始测试
const onSubmit = () => {
  remainTime.value = Date.now() + wantedWords.time * 60 * 1000
  request({
    url: '/Menu/testStart',
    method: 'post',

    data: {
      uid: userStore.userInfo.uid,
      time: wantedWords.time,
      sessionId:"0",
    }}).then((res) => {
    console.log('这是开始测试',res)
    userStore.userInfo.sessionId=res.sessionId
   
  })
  
      
  generateList()
  setTimeout(() => {
  getWord()}, 500)

}
//发送axios请求
const generateList = () => {
   request({
    url: '/Menu/generateList',
    method: 'post',
    data: {
      c:wantedWords.number,
      e:wantedWords.EnglishNumber,
      book:wantedWords.book,
    }
  }).then((res) => {
    console.log('这是生成列表',res)
  })
}

const continueTest = () => {
  request({
    url: '/Menu/continue',
    method: 'post',
    data: {
      uid: userStore.userInfo.uid,
      time: 1,
      sessionId:userStore.userInfo.sessionId ,
    }
  }).then((res) => {
    console.log('这是是否继续测试',res)
    judge.value=res.code
  })
}
const judge2=ref(0)
//获取单词
const getWord = () => { 
  request({
    url: '/Menu/test',
    method: 'get',
  }).then((res) => {
    if(res.code==1 || res.code==0){judge2.value=1}else{judge2.value=0}
    console.log('这是获取单词',res)
    console.log(judge2.value)
    options.value=res.data.strings
    question.id=res.data.words.id
   
    if(res.code==1){
      //将单词的英文加入到options数组中
      options.value.push(res.data.words.english)
      //数组打乱
      
      options.value.sort(() => Math.random() - 0.5)
      question.string=res.data.words.chinese
      question.answer=res.data.words.english
     
      
  }else if(res.code==0){
    options.value.push(res.data.words.chinese)
    options.value.sort(() => Math.random() - 0.5)
    question.string=res.data.words.english
    question.answer=res.data.words.chinese
    
  }
 
  })
}

const deleteWord = () => {
  buttonType.value='primary'
  options.value=[]
  question.id=0
  
}


const checkAnswer = (option) => {
  numberUsed.value += 1
  if (option === question.answer) {
    buttonType.value = 'success'
    //一秒钟后显示下一题
    setTimeout(() => {
      deleteWord()
      getWord()
    }, 100)
    question.trueORfalse=true
    wordsStore.addRecord(question)
    
    
  } else {
    buttonType.value = 'danger'
    setTimeout(() => {
      deleteWord()
      getWord()
    }, 1000)
    wordsStore.addRecord(question)
    
  }
}

const getTime = () => {
  request({
    url: '/Menu/time',
    method: 'post',

    data: {
      uid: userStore.userInfo.uid,
      time: wantedWords.time,
      sessionId:userStore.userInfo.sessionId ,
    }
  }).then((res) => {
    console.log('这是倒计时',res)
    
  })
}

onMounted(() => {
  continueTest()
  //获取倒计时
  getTime()
})
  
</script>

<style lang="scss">
  
  .el-form {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
  }

  .card {
    width: 500px;
    text-align: center;
    //左右居中，卡片不重叠
    margin: 0 auto;
    margin-top: 20px;
    // 卡片阴影
    //行高
    line-height: 3;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);

   


    
   
  }
</style>