<template>
  <el-table :data="wordsList" style="width: 100% " :row-class-name="ifRemember">
    <el-table-column prop="english" label="English" width="300" />
    <el-table-column prop="chinese" label="中文" width="300" />
    <el-table-column
     prop="book" 
     label="单词书" 
     width="100" 
     :filters="[
      { text: 'CET4', value: 'CET4' },
       { text: 'CET6', value: 'CET6' }, 
       { text: '雅思词汇', value: 'IELTS' }, 
       { text: '托福词汇', value: 'TOEFL' }]"
       :filter-method="filterBook"
     />

    <el-table-column 
    prop="remember" 
    label="是否记住"
     width="120"
     :filters="[
      { text: '记住', value: true },
      { text: '没记住', value: false }]"
      :filter-method="filterRemember"
    />
   
  </el-table>

  </template>

<script lang="ts" setup>
import  { TableColumnCtx, TableInstance } from 'element-plus'
import { onMounted, ref, } from 'vue'
import { getWordsAPI } from '@/apis/getWordsAPI';

//单词列表引入
import { useWordsStore} from '@/stores/words'
const wordsStore = useWordsStore()
//挂载组件时使用axios请求数据




const { wordsList}=storeToRefs(wordsStore)
console.log(wordsList)








// 表格行样式


const filterBook = (value: string, row: User, column: TableColumnCtx<User>, filterParams: any) => {
  const book = row.book
  return book.includes(value)
}
const filterRemember = (value: boolean, row: User, column: TableColumnCtx<User>, filterParams: any) => {
  const remember = row.remember
  return remember == value
}


</script>

<style>
.el-table {
  max-height: 690px;
  overflow: auto; 

}
.el-table .warning-row {
  background-color: red;
}
.el-table .success-row {
  background-color: green;
}
</style>