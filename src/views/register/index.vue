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
       <el-container class="main-container">
        
        
        <!-- 页面主体区   -->
        <el-form
          ref="formRef"
         
          :model="form"
          status-icon
          :rules="rules"
          label-width="auto"
          class="Form"
        >
        <el-text class="mx-1" style="font-size: 30px;font-weight: bold;margin-bottom: 20px;">注册账户</el-text>
          <el-form-item label="创建账户" prop="account">
            <el-input v-model="form.account" />
          </el-form-item>
          <el-form-item label="设置密码" prop="password">
            <el-input v-model="form.password"  placeholder="密码为6-14位字符"/>
          </el-form-item>
          <el-form-item label="年级" prop="email">
            <el-input v-model="form.email"/>
          </el-form-item>
          <el-form-item label="学校" prop="address">
            <el-input v-model="form.address"/>
          </el-form-item>
          <el-form-item prop="agree" label-width="22px">
          <el-checkbox v-model="form.agree" size="large">
            我已同意隐私条款和服务条款
          </el-checkbox>
        </el-form-item>
          <el-form-item>
            <el-button type="success" @click="doRegister">
              点击创建账户
            </el-button>
          </el-form-item>
         
        </el-form>
      
      
      </el-container>
             
   </el-container>

  
    

</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const form = ref({
  account: '',
  password: '',
  agree: true,
  email: '',
  address: '',
})




// 2. 准备规则对象
const rules = {
  account: [
    { required: true, message: '用户名不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur' },
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        console.log(value)
        // 自定义校验逻辑
        // 勾选就通过 不勾选就不通过
        if (value) {
          callback()
        } else {
          callback(new Error('请勾选协议'))
        }
      }
    }
  ]
}

const formRef = ref(null)
const router = useRouter()
const doRegister = () => {
  const { account, password } = form.value
  // 调用实例方法
  formRef.value.validate(async (valid) => {
    // valid: 所有表单都通过校验  才为true
    console.log(valid)
    // 以valid做为判断条件 如果通过校验才执行登录逻辑
    if (valid) {
      // TODO LOGIN
      const res = await userStore.regisiterUser({ account, password })
      console.log(res)
      console.log(res.data)
      if (res.msg=== 'user')   {
      // 1. 提示用户
      ElMessage.success('注册成功，请登录')
      router.replace({ path: '/login' })
          }else{
       ElMessage.error('注册失败') }
     
    }
  })
}
</script>



<style scoped lang="scss">
.main-container{
    background-color: $mainBody-color;
    height: 100%;
    min-height: 100vh;
    //居中
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(-45deg, #ee7752, #e7acc3, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;
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

  .el-form{
    height:400px;
    width:400px;
    background-color:rgba(255,255,255,0.7);
    padding: 20px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  
  }
  
 
  .el-main{
    background-color: $mainBody-color;
  }
 
</style>