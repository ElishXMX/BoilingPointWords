<template>
  <el-table :data="tableData" style="width: 100%" :row-class-name="ifRemember">
    <el-table-column prop="English" label="English" width="300" />
    <el-table-column prop="Chinese" label="中文" width="300" />
    <el-table-column
     prop="book" 
     label="单词书" 
     width="100" 
     :filters="[
      { text: 'CET4', value: 'CET4' },
       { text: 'CET4s', value: 'CET4s' }, 
       { text: 'CET6', value: 'CET6' }, 
       { text: 'CET6s', value: 'CET6s' }]"
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
    <el-table-column prop="testTimes" label="测试次数" width="120"/>
  </el-table>
</template>

<script lang="ts" setup>
import  { TableColumnCtx, TableInstance } from 'element-plus'
interface User {
  id: number
  English: string
  Chinese: string
  book: string
  remember: boolean
  testTimes: number
}
const tableData: User[] = [
{
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
    remember: true,
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
]


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
.el-table .warning-row {
  background-color: red;
}
.el-table .success-row {
  background-color: green;
}
</style>