import { defineStore } from 'pinia'
import { useCiteWordsStore } from './wordsStore'
import { reactive } from 'vue'



export const useCurrentWordStore = defineStore('currentWord', ()=> {
  
    const currentWord = reactive([{English: '没有', Chinese: '更多单词哦'}])

  function setWord() {
    const citeWords = useCiteWordsStore()
    //将获取的单词添加到currentWord数组中
    currentWord.push(citeWords.randomWord())
    
  }
  function removeWord() {
    //将数组中的最后一个单词移除
    currentWord.pop()
  }

  return {
    currentWord,
    setWord,
    removeWord
  }
})