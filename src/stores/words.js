//pinia store for words
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getWordsAPI } from '@/axiosApis/getWordsAPI'

export const useWordsStore = defineStore('words',() => {
  // state
  const words = ref([])

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

