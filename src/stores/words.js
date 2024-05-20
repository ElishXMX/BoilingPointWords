//pinia store for words
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getWordsAPI } from '@/axiosApis/getWordsAPI'


export const useWordsStore = defineStore('words',() => {
  // state
  const words = ref({
    id: 1,
    English: 'hello',
    Chinese: '你好',
    book: 'CET4',
    remember: false,
    testTimes:0,
  } ,
  {
    id:2,
    English: 'world',
    Chinese: '世界',
    book: 'CET4s',
    remember: false,
    testTimes:0,
  },
  {
    id:3,
    English: 'test',
    Chinese: '测试',
    book: 'CET6',
    remember: false,
    testTimes:0,
  },

  {
    id:4,
    English: 'vue',
    Chinese: 'Vue',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },
)

  // getters
  const getWords = async () => {
    const response = await getWordsAPI()
    words.value = response.data
  }


  return {
    words,
    getWords
  }
})

