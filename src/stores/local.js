import { defineStore } from 'pinia'
import { reactive,ref } from 'vue'
import { useWordsStore } from './words'
export const useLocalStore = defineStore('local',()=> {


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
//清除本地存储





const numberUsed = ref(0) // 已使用单词数量
const remainTime = ref(Date.now() + 1000 * 60 * 60 * 7)

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
    function randomWord() {
        const index = Math.floor(Math.random() * citeWords.length);
        return citeWords[index];
    }



    const currentWord = reactive([{english: '没有', chinese: '更多单词哦',remember: false,testTimes: 0}])

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


const Chinese=reactive([])
const updateChinese = ()=> {
//从wordsStore中获取四个不相同的单词中文作为测试卡片内容，并将其添加到Chinese数组中，其中有一个中文与currentWord数组中的中文相同
         if (citeWords.length > 0) {
          console.log('这是当前的中文',currentWord[0].chinese);
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
function cleanEnglish() {English.splice(0,English.length)}


const buttonType = ref('primary')


//判断对错
function ifChineseRight(Chinese){
    //延时0.5秒，
    
    numberUsed.value++
    if (Chinese === currentWord[0].chinese) {
      console.log('对');
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
      buttonType.value='danger'
      setTimeout(() => {
        buttonType.value='primary'
      currentWord[0].remember = false;
      currentWord[0].remember = false;
      removeWordcite(currentWord[0]);
      }, 450);
      
    }
  }
  function clearLocal() {
    localStorage.removeItem('local')
  }
  return {
    clearLocal,
    judges,
    getJudges,
    nextJudge,
    index,
    judgesNumber,
    numberUsed,
    remainTime,
    citeWords,
    filterWords,
    removeWordcite,
    randomWord,
    currentWord,
    wantedWords,
    Chinese,
    updateChinese,
    cleanChinese,
    English,
    updateEnglish,
    cleanEnglish,
    buttonType,
    ifChineseRight,
    ifEnglishRight,
    setWord,
    removeWord
  }
},{
    persist: true,

})
  