<script setup>
  import layoutAside from '@/views/layout/components/layoutAside.vue'
 
</script>
  


  <template>
  
  <el-container class="home-container">
       <!--头部  -->
       <el-header>
        <div>
          <img src="" alt="">
          <span>沸点单词</span>
        </div>
        
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
   background-image:url(../../assets/picture/20110328231118.jpg) ;
    background-size: cover;
    background-position: center;
    background-color:rgba(255,255,255,0.8);
    height: 100%;
    overflow: hidden;
  }
 
  .el-main{
    background-color: $mainBody-color;
  }
  .el-container{
    height: 100%;
   
  }
 
</style>



  
  