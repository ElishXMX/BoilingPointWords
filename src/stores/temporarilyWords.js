import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useWordsStore} from '@/stores/words'
const wordsStore = useWordsStore()
const { wordsList}=storeToRefs(wordsStore)


export const useTemporarilyWordsStore = defineStore('words',() => {
  // state
  const temporarilyWordsList = reactive([ ])

  // 将传递的参数进行筛选列表
  function getTemporarilyWordsList(book,number) {
    const temporarilyWords = wordsList.value.filter(item => item.book === book)
    // 随机选取number个词
    const randomlySelectedWords = temporarilyWords.sort(() => 0.5 - Math.random()).slice(0,number)
    return randomlySelectedWords
  }

  return {
    temporarilyWordsList,
    getTemporarilyWordsList
  }
 })