<script setup>
  import layoutAside from '@/views/layout/components/layoutAside.vue'
  import { useUserStore } from '@/stores/userStore'
  import { useWordsStore } from '@/stores/words'
  const wordsStore = useWordsStore()
  import { onMounted } from 'vue'


  const userStore = useUserStore()
  onMounted(async () => {
  await wordsStore.getWordsList()
})

</script>
  


  <template>
  
  <el-container class="home-container">
       <!--头部  -->
       <el-header>
        <div>
          
          <span >沸点单词</span>
        </div>
        <el-button type="danger" v-if="userStore.userInfo.data" @click="userStore.clearUserInfo()">退出登录</el-button>
        
       </el-header>


       <!-- 页面主体区  嵌套容器  包裹 Aside与Main -->
       <el-container>
        
        <!-- 侧边栏  -->
        <el-aside width="200px" class="aside">
          <layoutAside></layoutAside>
        </el-aside>
        
        <!-- 页面主体区   -->
        <el-main>
          <div class="mainTitle">
            <router-view>
            </router-view>
          </div>
        </el-main>
      
      
      </el-container>
             
   </el-container>
  
</template>

  
<style scoped lang="scss">
.el-header{
     background-color: $background-color;
     display: flex;
     justify-content: space-between;
     padding-left: 0px;
    //  居中
     align-items:center;
    //  文本颜色
    color:#fff;
    // 文字大小
    font-size: 20px;
 
    // 给header中嵌套的div进行样式改造
    // 子代选择器
    div{
      display:flex;
    //   纵向居中
      align-items:center;
 
    //   在给div中的span改造样式
       span{
        margin-left: 20px;
       }
    }
  }


  
  .el-main{
    background: linear-gradient(-45deg, #faf4c5, #e8d7dd, #cbe9f4, #eae4e4);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
  height: 736px;
  }
  @keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
 
  .el-main{
    background-color: $mainBody-color;
  }
  
 
</style>



  
  