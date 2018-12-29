<template>
  <div class="top">
  <div class="main">
    <span class="title">华农一屋</span>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-input 
        placeholder="请输入用户名" 
        prefix-icon="el-icon-service" 
        v-model="username"
        clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-input 
        placeholder="请输入邮箱" 
        prefix-icon="el-icon-message" 
        type="email" 
        v-model="email"
        clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-input 
        placeholder="请输入密码" 
        prefix-icon="el-icon-view" 
        v-model="password1"
        type="password"
        clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-input 
        placeholder="请再次输入密码" 
        prefix-icon="el-icon-view" 
        v-model="password2"
        type="password"
        clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-button 
        type="primary" 
        @click="register()"
        :disabled="!password1 || !username || !password2 || !email">注册</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="tips">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <router-link to="/" >
          <span class="remind">已有账号，去登录</span>
        </router-link>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default{
    name:'register',
    data(){
      return{
        username: '',
        password1:'',
        password2:'',
        email:''
      }
    },
    computed: {
      ...mapGetters([
        'errorRegister',
        'hasRegister'
      ])
    },
    methods: {
      ...mapActions([
        'actionRegister'
      ]),
      //登录前检查用户填写的信息
      checkMessage: function() {
        if(this.password1 != this.password2) {
          this.$message({
            message: '两次密码不一致',
            center: true
          });
          return false
        }
        return true
      },

      //注册
      register: function() {
        if (!this.checkMessage()) return
        let obj = {
          username: this.username,
          email: this.email,
          password: this.password1
        }
        this.actionRegister(obj)
      }
    },
    watch: {
      errorRegister() {
        if(this.errorRegister) {
          this.$message({
            message: this.errorRegister,
            center: true
          });
        }
      },
      hasRegister() {
        if(this.hasRegister) {
          this.$message({
            message: `注册成功，3秒后返回登录界面`,
            center: true
          });
          setTimeout(() => {
            this.$router.push('/');
          },3000)
        }
      }
    }
  };
</script>

<style scoped>
  .top {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  background-size: cover;
  background-image: url('../assets/images/background5.jpg');
}
.main {
  /*margin:0 auto;*/
  margin-top: 120px;
  /*width: 90%;*/
  /*background-image: url('../assets/images/background2.jpg');*/
}
.el-row {
  margin-top: 30px;
}
.title {
  color: #409EFF;
  font-size: 40px;
}
.el-button {
  width: 100%;
}
.remind {
  font-size: 15px;
  float: left;
 /* margin-top: 20px;*/
 color:#b22222;
}
.tips {
  margin-top: 20px
}
</style>