import { defineStore } from 'pinia'
import { useWordsStore } from './words';
import { reactive } from 'vue';

export const useCiteWordsStore = defineStore('wordsStore',() => {
    const citeWords = reactive([]); // 当前背诵的单词列表
   const continueWord = reactive( ); // 是否继续阅读zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz

    // 筛选单词列表
    function filterWords(number=0 , book) {
        const wordsStore = useWordsStore();
        const words = wordsStore.wordsList.filter(word => word.book === book && word.remember === false);
        // 随机选择number个单词添加到citeWords
        for (let i = 0; i < number; i++) {
            const index = Math.floor(Math.random() * words.length);
            citeWords.push(words[index]);
            words.splice(index, 1);
        }
    
    }

    // 移除单词
    function removeWord(word) {
        citeWords.splice(citeWords.indexOf(word), 1);

    }
    function addWord(word) {
        citeWords.push(word);
    }



    // 随机选择一个单词
    function randomWord() {
        const index = Math.floor(Math.random() * citeWords.length);
        return citeWords[index];
    }

    return {
        citeWords,
        filterWords,
        removeWord,
        randomWord,
        addWord
    }


});

