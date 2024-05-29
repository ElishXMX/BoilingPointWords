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
<el-card class="card">
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
          <template #suffix>/{{ wantedWords.number }}</template>
        </el-statistic>
      </el-col>


      <el-col :span="8" style="width: 200px;display:inline-block">
      <el-countdown title="剩余时间" :value="remainTime" />
      </el-col>



  </el-card>
<!-- 测试卡片 -->

  <el-card class="card" shadow="hover">
    <template #header>
     
      <div class="card-header" >
        <el-text class="mx-1" size="large" style="font-size: 2rem;">{{}}</el-text><br>
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
   v-if="judge!==0"
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
const userStore = useUserStore()



const ifContinueTest=()=>{
  console.log('continueTest')
  getWord()
}

const cancelTest=()=>{
  console.log('cancelTest')
}


const judge=ref(0)

const buttonType = ref('primary')

const wantedWords = reactive({
  number: 0,
  EnglishNumber: 0,
  time: 0,
  book: 'CET4', 
})

const options=ref([])
const question=reactive({
  id:0,
  string: '',
})

// 
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
    judge.value=res.data
  })
}

const getWord = () => { 
  request({
    url: '/Menu/test',
    method: 'get',
  }).then((res) => {
    console.log(res)
    // 显示到测试卡片上
    console.log(res.data.strings)
    options.value=res.data.strings
    question.id=res.data.words.id
    console.log(question.id)
    console.log(options)
  })
}

const deleteWord = () => {
  buttonType.value='primary'
  options.value=[]
  question.id=0
  
}
// 开始测试
const onSubmit = () => {
  generateList()
  getWord()

}

const checkAnswer = (option) => {
  if (option === question.string) {
    buttonType.value = 'success'
    //一秒钟后显示下一题
    setTimeout(() => {
      deleteWord()
      getWord()
    }, 1000)
    
    
  } else {
    buttonType.value = 'danger'
    setTimeout(() => {
      deleteWord()
      getWord()
    }, 1000)
    
  }
}


onMounted(() => {
  continueTest()
  //获取倒计时
})
  
</script>

<style lang="scss">
  
  .el-form {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
  }

  .card {
    width: 600px;
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