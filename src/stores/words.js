//pinia store for words
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getWords } from '@/apis/getWordsAPI'

getWords().then(res => {
  console.log(res)
})
export const useWordsStore = defineStore('words',() => {
  // state
  const wordsList = reactive([{
    id: 1,
    English: 'hello',
    Chinese: '你好',
    book: 'CET4,CET6',
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
    Chinese: '前端',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },
  {
    id:5,
    English: 'axios',
    Chinese: '异步请求',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },
  {
    id:6,
    English: 'vuex',
    Chinese: '状态管理',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },
  {
    id:7,
    English: 'element-plus',
    Chinese: '组件库',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },
  {
    id:8,
    English: 'typescript',
    Chinese: '类型',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },
  {
    id:9,
    English: 'webpack',
    Chinese: '打包工具',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },
  {
    id:10,
    English: 'git',
    Chinese: '版本管理',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },

  {
    id:11,
    English: 'html',
    Chinese: '网页',
    book: 'CET4',
    remember: false,
    testTimes:0,
  },
  {
    id:12,
    English: 'css',
    Chinese: '样式',
    book: 'CET4',
    remember: false,
    testTimes:0,
  },
  {
    id:13,
    English: 'javascript',
    Chinese: '脚本',
    book: 'CET4',
    remember: false,
    testTimes:0,
  },
  {
    id:14,
    English: 'jquery',
    Chinese: '库',
    book: 'CET4',
    remember: false,
    testTimes:0,
  },
  {
    id:15,
    English: 'node.js',
    Chinese: '服务器',
    book: 'CET4',
    remember: false,
    testTimes:0,
  },
  {
    id:16,
    English: 'express',
    Chinese: '框架',
    book: 'CET4',
    remember: false,
    testTimes:0,
  },
  {
    id:17,
    English: 'mongodb',
    Chinese: '数据库',
    book: 'CET4',
    remember: false,
    testTimes:0,
  },
  {
    id:18,
    English: 'linux',
    Chinese: '系统',
    book: 'CET4',
    remember: false,
    testTimes:0,
  },
  {
    id:19,
    English: 'docker',
    Chinese: '容器',
    book: 'CET4',
    remember: false,
    testTimes:0,
  },
  {
    id:20,
    English: 'nginx',
    Chinese: '服务器',
    book: 'CET4',
    remember: false,
    testTimes:0,
  },

  {
    id:21,
    English: 'python',
    Chinese: '编程语言',
    book: 'CET4s',
    remember: false,
    testTimes:0,
  },
  {
    id:22,
    English: 'django',
    Chinese: '框架',
    book: 'CET4s',
    remember: false,
    testTimes:0,
  },
  {
    id:23,
    English: 'flask',
    Chinese: '框架',
    book: 'CET4s',
    remember: false,
    testTimes:0,
  },
  {
    id:24,
    English: 'java',
    Chinese: '编程语言',
    book: 'CET4s',
    remember: false,
    testTimes:0,
  },
  {
    id:25,
    English: 'c++',
    Chinese: '编程语言',
    book: 'CET4s',
    remember: false,
    testTimes:0,
  },
  {
    id:26,
    English: 'c#',
    Chinese: '编程语言',
    book: 'CET4s',
    remember: false,
    testTimes:0,
  },
  {
    id:27,
    English: 'php',
    Chinese: '编程语言',
    book: 'CET4s',
    remember: false,
    testTimes:0,
  },
  {
    id:28,
    English: 'go',
    Chinese: '编程语言',
    book: 'CET4s',
    remember: false,
    testTimes:0,
  },
  {
    id:29,
    English: 'ruby',
    Chinese: '编程语言',
    book: 'CET4s',
    remember: false,
    testTimes:0,
  },
  {
    id:30,
    English: 'rust',
    Chinese: '编程语言',
    book: 'CET4s',
    remember: false,
    testTimes:0,
  },

  {
    id:31,
    English: 'linux',
    Chinese: '系统',
    book: 'CET6',
    remember: false,
    testTimes:0,
  },
  {
    id:32,
    English: 'docker',
    Chinese: '容器',
    book: 'CET6',
    remember: false,
    testTimes:0,
  },
  {
    id:33,
    English: 'nginx',
    Chinese: '服务器',
    book: 'CET6',
    remember: false,
    testTimes:0,
  },
  {
    id:34,
    English: 'kubernetes',
    Chinese: '容器编排',
    book: 'CET6',
    remember: false,
    testTimes:0,
  },
  {
    id:35,
    English: 'jenkins',
    Chinese: '持续集成',
    book: 'CET6',
    remember: false,
    testTimes:0,
  },
  {
    id:36,
    English: 'git',
    Chinese: '版本管理',
    book: 'CET6',
    remember: false,
    testTimes:0,
  },
  {
    id:37,
    English: 'github',
    Chinese: '代码托管',
    book: 'CET6',
    remember: false,
    testTimes:0,
  },
  {
    id:38,
    English: 'vue',
    Chinese: '前端',
    book: 'CET6',
    remember: false,
    testTimes:0,
  },
  {
    id:39,
    English: 'element-plus',
    Chinese: '组件库',
    book: 'CET6',
    remember: false,
    testTimes:0,
  },
  {
    id:40,
    English: 'typescript',
    Chinese: '类型',
    book: 'CET6',
    remember: false,
    testTimes:0,
  },
  {
    id:41,
    English: 'webpack',
    Chinese: '打包工具',
    book: 'CET6',
    remember: false,
    testTimes:0,
  },
  {
    id:42,
    English: 'html',
    Chinese: '网页',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },
  {
    id:43,
    English: 'css',
    Chinese: '样式',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },
  {
    id:44,
    English: 'javascript',
    Chinese: '脚本',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },
  {
    id:45,
    English: 'jquery',
    Chinese: '库',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },
  {
    id:46,
    English: 'node.js',
    Chinese: '服务器',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },
  {
    id:47,
    English: 'express',
    Chinese: '框架',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },
  {
    id:48,
    English:'mongodb',
    Chinese: '数据库',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },
  {
    id:49,
    English: 'python',
    Chinese: '编程语言',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },
  {
    id:50,
    English: 'django',
    Chinese: '框架',
    book: 'CET6s',
    remember: false,
    testTimes:0,
  },
  
])


  // actions
  function addWord(word) {
    wordsList.push(word)
  }

  function removeWord(id) {
    const index = wordsList.findIndex(word => word.id === id)
    if (index !== -1) {
      wordsList.splice(index, 1)
    }
  }
 

  return {
    wordsList,
    addWord,
    removeWord,
  }
})





  
