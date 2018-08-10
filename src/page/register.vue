<template>
  <div class="top">
  <div class="main">
    <span class="title">华农一屋</span>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-input placeholder="请输入用户名" prefix-icon="el-icon-service" v-model="username"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-input placeholder="请输入邮箱" prefix-icon="el-icon-message" type="email" v-model="email"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-input placeholder="请输入密码" prefix-icon="el-icon-view" type="password" v-model="password1"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-input placeholder="请再次输入密码" prefix-icon="el-icon-view" type="password" v-model="password2"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-button type="primary" @click="register()">注册</el-button>
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
    methods: {
      //登录前检查用户填写的信息
      checkMessage: function() {
        if(this.password1 != this.password2) {
          console.log("两次密码不一致");
          return false
        }
        if(this.password1 == "") { 
          console.log("密码不能为空");
          return false
        }
        if(this.password2 == '') {
          console.log("请输入您的账号");
          return false
        }
        if(this.email === '') {
          console.log('请输入邮箱');
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
          password1: this.password1,
          password2: this.password2
        }
        const result = this.$http.post('/users/register/', obj)
        result.then((res) => {
           console.log(res);
        }, (err) => {
          console.log(err)
        })
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
  margin-top: 100px;
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