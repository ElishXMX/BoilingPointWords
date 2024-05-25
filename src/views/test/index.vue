<template>
  <!-- 表单:选择单词书和数量 -->
  <el-card>
    <el-form :inline="true" :model="wantedWords" class="demo-form-inline">
    <el-form-item label="背单词数量">
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
<el-card class="card" v-show="citeWords.length!=0" >
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

  <el-card class="card" shadow="hover" v-if="citeWords.length!=0">
    <template #header>
      <div class="card-header" v-if="judgesNumber.number%2===1">
        <el-text class="mx-1" size="large" style="font-size: 2rem;">{{currentWord[0].english}}</el-text><br>
      </div>
      <div class="card-header" v-else>
        <el-text class="mx-1" size="large" style="font-size: 2rem;">{{currentWord[0].chinese}}</el-text><br>
      </div>
    </template>

    <!-- 从Chineses数组中随机选择四个中文作为测试卡片内容 -->
    <div v-if="judgesNumber.number %2===1">
    <div v-for="(Chinese, index) in Chinese" :key="index" class="card-content" >
      <el-button :type="buttonType"  plain @click="ifChineseRight(Chinese)" style="width: 100px;">
        {{Chinese}}
      </el-button>
    </div>
  </div>
    <!-- 从English数组中随机选择四个英文作为测试卡片内容 -->
    <div v-else>
      <div v-for="(English, index) in English" :key="index" class="card-content">
      <el-button :type="buttonType"  plain  @click="ifEnglishRight(English)" style="width: 100px;">{{English}}</el-button>
    </div>
    </div>

    <!--  -->
    
    
  </el-card>
  <el-card  shadow="hover">
    检测到您有未完成的测试，是否继续？
    <el-button type="primary" @click="continueTest">CONTINUE</el-button>
    <el-button type="danger" @click="cancelTest">CANCEL</el-button>
  </el-card>



</template>


<script lang="ts" setup>
import { reactive,ref } from 'vue'
// import { useCiteWordsStore } from '@/stores/wordsStore';
import {watch} from 'vue'
import {useWordsStore} from '@/stores/words';
import { onMounted } from 'vue';
import request from '@/utils/http';


function continueTest() {
  console.log('继续测试');
  request({
    url: '/Menu/returnCopy',
    method: 'get',

}).then(res => {
  res.data.forEach(item => {
    console.log(res);
      console.log('看这里',item);
     citeWords.push(item);
    });
  
});

}

function cancelTest() {
  console.log('取消测试');
  request({
    url: '/Menu/noreturnCopy',
    method: 'get',
}).then(res => {
  console.log(res);
  //刷新页面
  userStore.userInfo.sessionId='nihao'
  window.location.reload();
});
}

const show=ref(false);

onMounted(() => {
  request({
    url: '/Menu/continue',
    method: 'post',
    data: {
      uid:userStore.userInfo.uid,
      time:1,
      sessionId:userStore.userInfo.sessionId,
    },
  }).then(res => {
    console.log('请看这里',res);
    

    if (res.data==1) {
      console.log('有未完成的测试');
      show.value=true;
    }else{
      console.log('没有未完成的测试');
      show.value=false;
    }

  });
});
  


//     res.data.forEach(item => {
//       console.log(item);
//      citeWords.push(item);
//     });
//     console.log('检验是否有考试未完成');
//   });
// });

//获取wantedWords.Number个数字，其中有wantedWords.EnglishNumber个奇数,将其放入judges数组中，并将其随机排序
const judges=reactive([])
const getJudges = ()=> {
  for (let i = 0; i <= wantedWords.EnglishNumber; i++) {
    if (i % 2 === 0) {
      judges.push(i + 1);
    }
  }
  //jugde数组长度小于wantedWords.number时，用偶数补足剩下的数字
  while (judges.length < wantedWords.number) {
    //获取偶数
    const even = Math.floor(Math.random() * (wantedWords.number - judges.length)) * 2;
    judges.push(even);
  }
    
  judges.sort(() => Math.random() - 0.5);
}

const index = ref(-1)
const judgesNumber = reactive({number:0})
function nextJudge() {
  index.value++
  judgesNumber.number= judges[index.value]
}

const numberUsed = ref(0) // 已使用单词数量
const remainTime = ref(0) // 剩余时间

const updateTime = ()=> {
  request({
    url: '/Menu/test',
    method: 'post',
    data: {
      uid:userStore.userInfo.uid,
      time:1,
      sessionId:userStore.userInfo.sessionId,
    },
  }).then(res => {
    remainTime.value = res.data.time;
    

  });

}


const citeWords = reactive([]); // 当前背诵的单词列表
    // 筛选单词列表
    function filterWords(number=0 , book) {
        const wordsStore = useWordsStore();
        const words = wordsStore.wordsList.filter(word => word.book === book );
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
// 随机选择一个单词
    function selectWord() {
        const index = ref(-1)
        index.value++
        return citeWords[index.value];
    }




// import { useCurrentWordStore } from '@/stores/currentWord';
// const currentWord = useCurrentWordStore();
const currentWord = reactive([{english: '没有', chinese: '更多单词哦',remember: false,testTimes: 0}])

  function setWord() {
 
    //将获取的单词添加到currentWord数组中
    currentWord.push(selectWord())
   
  }
  
  function removeWord() {
    //将数组中的最后一个单词移除
    currentWord.pop()
  }


const wantedWords = reactive({
  number: 0,
  book: null,
  EnglishNumber: 0,
  time: 0,
});

watch(citeWords, () => {
  updateTime();
  //使用axios请求
  request({
    url: '/Menu/test',
    method: 'post',
    data: {
      uid:userStore.userInfo.uid,
      time:1,
      sessionId:userStore.userInfo.sessionId,
    },
  }).then(res => {
    
    console.log('修改列表');
  });
  console.log('citeWords',citeWords);
  console.log('currentWord',currentWord);
  removeWord();
  setWord();
  cleanChinese();
  cleanEnglish();
  
  nextJudge();
 
  if (citeWords.length === 0) {
    console.log('没有单词了');
    wantedWords.number = 0;
  }else{
  updateChinese();
  updateEnglish();
  }
  
 
})
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
//点击开始背单词按钮，将wantedWords中的数据传递给store
const onSubmit = () => {

      request({
        url: '/Menu/testStart',
        method: 'post',
        data: {
          uid:userStore.userInfo.uid,
          time:1,
          sessionId:'0',
        },
      }).then(res => {
        console.log(res);
        userStore.userInfo.sessionId =  res.sessionId;
        console.log('提交成功');
      });
      
      {
        // 执行开始背单词的逻辑
        filterWords(wantedWords.number, wantedWords.book);
        getJudges();
      }
      request({
        url: '/Menu/copyList',
        method: 'post',
        data: {
         numbers:citeWords,
        },
      }).then(res => {
        console.log(res);
      });
    }



const Chinese=reactive([])
const updateChinese = ()=> {
//从wordsStore中获取四个不相同的单词中文作为测试卡片内容，并将其添加到Chinese数组中，其中有一个中文与currentWord数组中的中文相同
         if (citeWords.length > 0) {
          console.log(currentWord[0].chinese);
          Chinese.push(currentWord[0].chinese)
            const wordsStore = useWordsStore();
            const words = wordsStore.wordsList;
            for (let i = 0; i < 3; i++) {
              const index = Math.floor(Math.random() * words.length);
              //如果中文已经存在，则重新选择
              if (Chinese.includes(words[index].chinese)) {
                i--;
              } else {
                Chinese.push(words[index].chinese);
              }
            }
            //将Chinese数组的顺序随机打乱
            Chinese.sort(() => Math.random() - 0.5);
            
        } else {
            Chinese.push({english: '没有', chinese: '更多单词哦',remember: false,testTimes: 0} )
        }
      }


function cleanChinese() {Chinese.splice(0,Chinese.length)}

//从wordsStore中获取四个不相同的单词英文作为测试卡片内容，并将其添加到English数组中，其中有一个中文与currentWord数组中的英文相同
const English=reactive([])
const updateEnglish = ()=> {
//从wordsStore中获取四个不相同的单词英文作为测试卡片内容，并将其添加到English数组中，其中有一个中文与currentWord数组中的英文相同
English.push(currentWord[0].english)
const wordsStore = useWordsStore();
const words = wordsStore.wordsList;
for (let i = 0; i < 3; i++) {
  const index = Math.floor(Math.random() * words.length);
  //如果英文已经存在，则重新选择
  if (English.includes(words[index].english)) {
    i--;
  } else {
    English.push(words[index].english);
  }
  
}}


const buttonType = ref('primary')
function cleanEnglish() {English.splice(0,English.length)}
//判断对错
function ifChineseRight(Chinese){
  //延时0.5秒，
  
  numberUsed.value++
  if (Chinese === currentWord[0].chinese) {
    console.log('对');
    request({
      url: '/Menu/ifTimeOut',
      method: 'get',
    }).then(res => {
      
      console.log('检验是否超时',res);
    });
    request({
      url: '/Menu/test',
      method: 'post',
      data: {
        uid:userStore.userInfo.uid,
        time:1,
        sessionId:userStore.userInfo.sessionId,
      },
    }).then(res => {
      console.log(res);
      console.log('修改列表');
    });
    //将button的type属性改为success
    buttonType.value='success'
    setTimeout(() => {
      //将button的type属性改为primary
      buttonType.value='primary'
      //移除当前测试的单词
    currentWord[0].remember = true;
    currentWord[0].testTimes +1
    console.log(currentWord[0].chinese);
    removeWordcite(currentWord[0]);}, 450);
   
  } else {
    request({
      url: '/Menu/ifTimeOut',
      method: 'get',
    }).then(res => {
      console.log(res);
      console.log('是否超时');
    });
    request({
      url: '/Menu/test',
      method: 'post',
      data: {
        uid:userStore.userInfo.uid,
        time:1,
        sessionId:userStore.userInfo.sessionId,
      },
    }).then(res => {
      console.log(res);
      console.log('修改列表');
    });
    buttonType.value='danger'
    console.log('错');
    setTimeout(() => {
      buttonType.value='primary'
    currentWord[0].remember = false;
    removeWordcite(currentWord[0]);}, 450);
    
  }
}

function ifEnglishRight(English){
  numberUsed.value++
  if (English === currentWord[0].english) {
    console.log('对');
    request({
      url: '/Menu/ifTimeOut',
      method: 'get',
    }).then(res => {
      console.log(res);
      console.log('是否超时');
    });
    request({
      url: '/Menu/test',
      method: 'post',
      data: {
        uid:userStore.userInfo.uid,
        time:1,
        sessionId:userStore.userInfo.sessionId,
      },
    }).then(res => {
      console.log(res);
      console.log('修改列表');
    });
    //将button的type属性改为success
    buttonType.value='success'
    setTimeout(() => {
      //将button的type属性改为primary
      buttonType.value='primary'
      //移除当前测试的单词
    currentWord[0].remember = true;
    currentWord[0].testTimes +1
    console.log(currentWord[0].english);
    removeWordcite(currentWord[0]);
    }, 450);
   
  } else {
    console.log('错');
    request({
      url: '/Menu/ifTimeOut',
      method: 'get',
    }).then(res => {
      console.log(res);
      console.log('是否超时');
    });
      
    request({
      url: '/Menu/test',
      method: 'post',
      data: {
        uid:userStore.userInfo.uid,
        time:1,
        sessionId:userStore.userInfo.sessionId,
      },
    }).then(res => {
      console.log(res);
      console.log('修改列表');
    });
    buttonType.value='danger'
    setTimeout(() => {
      buttonType.value='primary'
    currentWord[0].remember = false;
    currentWord[0].remember = false;
    removeWordcite(currentWord[0]);
    }, 450);
    
  }
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