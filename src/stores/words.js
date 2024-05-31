//pinia store for words
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getWordsAPI } from '@/apis/getWordsAPI'
import request from '@/utils/http'
import { useUserStore } from './userStore'





export const useWordsStore = defineStore('words',() => {
  const userStore = useUserStore()
  
 
  const wordsList = reactive([
   
])

  
 //axios get words
  const getWordsList = async () => {
   const res= await getWordsAPI()
   console.log(res)
   wordsList.push(...res.data)
   console.log(wordsList)

  }


  function removeWord(id) {
    const index = wordsList.findIndex(word => word.id === id)
    if (index !== -1) {
      wordsList.splice(index, 1)
    }
  }

  function addRecord(question) {
    request({
      url: '/Menu/record',
      method: 'post',
      data: {
        id: question.id,
        uid:userStore.userInfo.id,
        trueORfalse: question.trueORfalse,
      }
    }).then(res => {
      console.log(res)})
  }
 

  return {
    wordsList,
    removeWord,
    getWordsList,
    addRecord
  }
}, {
  // 4. 开启持久化
  persist: true
})





  
