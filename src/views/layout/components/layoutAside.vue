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
        <el-sub-menu index="/books">
          <template #title>
            <el-icon><IEpReading /></el-icon>
            <span>单词书</span>
          </template>
          
          <el-menu-item-group title="四级">
            <el-menu-item index="/4s"><el-icon><IEpTickets /></el-icon>四级精选</el-menu-item>
            <el-menu-item index="/4"><el-icon><IEpTickets /></el-icon>四级全收集</el-menu-item>
          </el-menu-item-group>
          
          <el-menu-item-group title="六级">
            <el-menu-item index="/6s"><el-icon><IEpTickets /></el-icon>六级精选</el-menu-item>
            <el-menu-item index="/6"><el-icon><IEpTickets /></el-icon>六级全收集</el-menu-item>
          </el-menu-item-group>
          
        </el-sub-menu>
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