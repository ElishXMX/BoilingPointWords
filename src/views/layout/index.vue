<script setup>
  import layoutAside from '@/views/layout/components/layoutAside.vue'
</script>
  


  <template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <layoutAside />
        <p>我是一级插槽</p>
      </el-aside>
      <el-main>
         <router-view />我是二级插槽
      </el-main>
    </el-container>
  </div>
</template>

  
<style scoped lang="scss">
.common-layout {
  height: 100%;
  p {
    background-color:gray;
    height: 100%;
  }
}

</style>



  
  