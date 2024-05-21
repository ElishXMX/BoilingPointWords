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
    
    <el-card style="width: 300px" shadow="hover" class="card" v-if="currentWord">
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



const filterType = ref('');
const filterQuantity = ref(null);
//点击按钮
const onSubmit = () => {
 
  filterQuantity.value = wantedWords.number;
  filterType.value = wantedWords.book;
  console.log('@@@@@@',citeWords.value);
}




//单词列表引入
import { storeToRefs } from 'pinia'
import { useWordsStore} from '@/stores/words'
const wordsStore = useWordsStore()
const { wordsList}=storeToRefs(wordsStore)

//从单词列表中获取所需的单词,并生成一个列表


    // 使用 computed 创建计算属性
 const filteredArray = computed(() => {
   const items = wordsList;
   return items.value.filter(item => {
     // 检查类型是否匹配
     const typeMatches = wantedWords.book === '' || item.book === filterType.value;
     // 检查remembered是否为false
     const remember = item.remember === false;
     return typeMatches && remember;
   });
 })
   

    // 计算属性的 getter 函数，返回当前背诵的单词列表
    const citeWords = computed(() => {
      const items = filteredArray.value;
      const quantity = filterQuantity.value;
      return items.slice(0, quantity);
    });

    

//显示当前单词，从以获取的单词列表中随机获取一个单词
const currentWord = computed(() => {
  if (citeWords.value.length > 0) {
    const index = Math.floor(Math.random() * citeWords.value.length);
    return citeWords.value[index];
  } else {
    return {English: '没有更多单词了', Chinese: '', remember: null}; 
  }
});


//当列表变化时，更新当前单词

watch(citeWords, () => {
  console.log('citeWords changed');
  currentWord.value;
});


//点击记住按钮，将当前单词的remember属性设置为true
const remember = () => {
  currentWord.value.remember = true;
  //将当前单词从列表中移除
  const index = citeWords.value.indexOf(currentWord.value);
  citeWords.value.splice(index, 1);
  console.log('@@@@@@',citeWords.value);
  console.log('currentWord.value',currentWord.value);
};


//点击忘记按钮，将当前单词的remember属性设置为false
const forget = () => {
  currentWord.value.remember = false;
};

//点击困惑按钮，将当前单词的remember属性设置为null
const confuse = () => {
  currentWord.value.remember = null;
};
  
 
  










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
