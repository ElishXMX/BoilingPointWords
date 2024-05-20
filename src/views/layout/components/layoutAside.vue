<template>
 <el-row class="tac">
    <el-col :span="24">
     
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :router="true"
      >
      <!-- 单词书 -->
        <el-menu-item index="/books">
         
            <el-icon><IEpReading /></el-icon>
            <span>单词书</span>

        </el-menu-item>

        <el-menu-item index="/cite">
          <el-icon><IEpPostcard /></el-icon>
          <span>背单词</span>
        </el-menu-item>
        
        <el-menu-item index="/test">
          <el-icon><IEpChecked /></el-icon>
          <span>词汇自测</span>
        </el-menu-item>
        
      </el-menu>
    </el-col>
    
  </el-row>
                 
</template>

<style lang="scss">
 
  

</style>

<script  lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


</script>

<style lang="scss">
 

</style>