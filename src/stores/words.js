//pinia store for words
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getWordsAPI } from '@/apis/getWordsAPI'




export const useWordsStore = defineStore('words',() => {
 
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
 

  return {
    wordsList,
    removeWord,
    getWordsList
  }
}, {
  // 4. 开启持久化
  persist: true
})





  
