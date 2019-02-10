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
        placeholder="请输入密码" 
        prefix-icon="el-icon-view" 
        v-model="password"
        clearable
        type="password"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-button 
        type="primary" 
        @click="login()" 
        :disabled="!password || !username">登录</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="tips">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <router-link to="/register" >
          <span class="remind">还没有账号？去注册</span>
        </router-link>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
	export default{
		name:'login',
		data(){
			return{
        username: '',
        password: '',
        obj: {}
			}
		},
    computed: {
      ...mapGetters([
        'hasLogin',
        'errorLogin'
      ])
    },
    created() {
      const userinfo = JSON.parse(window.localStorage.getItem('userinfo'))
      if(userinfo) {
        //当前时区时间戳（以秒为单位）
        const nowTime = Date.parse( new Date()) / 1000
        const timeDifference = (nowTime - userinfo.last_login) / (60 * 60)
        if(timeDifference > 0 && timeDifference < 24) {
          this.username = userinfo.username
          this.password = userinfo.password
          this.login()
        }
      }
    },
    methods:{
      ...mapActions([
        'actionLogin',
        'actionNotLogin',
        'actionInitMessagePush'
      ]),
      login: function() {
        this.obj = {
          username: this.username,
          password: this.password
        }
        this.actionNotLogin()
        this.actionLogin(this.obj)             
      }
    },
    watch:{
      hasLogin() {
        if(this.hasLogin) {
          const channel = `ws://127.0.0.1:8000/push/${this.username}/`
          this.actionInitMessagePush(channel)
          this.$router.push('/home');
        }
      },
      errorLogin() {
        if(this.errorLogin) {
          this.$message({
            message: this.errorLogin,
            center: true
          });
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
  /*position: absolute;
  top: 50%;
  transform: translate(0, -50%);*/
  margin-top: 70px;
  width: 100%;
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