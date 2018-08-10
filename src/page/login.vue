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
        <el-input placeholder="请输入密码" prefix-icon="el-icon-view" v-model="password"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-button type="primary" @click="login()">登录</el-button>
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
	export default{
		name:'login',
		data(){
			return{
        username: '',
        password:''
			}
		},
    methods:{
      login: function() {
        this.$router.push('/home');
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
  margin-top: 150px;
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