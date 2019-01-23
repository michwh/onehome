<template>
  <div>
    <v-header :headerMsg="headerMsg"></v-header>
    <div class="contain">
      <el-input v-model="firstPassword" placeholder="请输入新密码"></el-input>
      <el-input v-model="secondPassword" placeholder="请再次输入新密码"></el-input>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'changePassword',
    components: {
      'v-header': myHeader,
    },
    data() {
      return {
        headerMsg: {
          centerWord: '修改密码',
          //这种绑定的图片只能放在static文件夹下
          leftImg: '/static/images/back.png',
          rightImg: '/static/images/check.png',
        },
        firstPassword:'',
        secondPassword:'',
      }
    },
    methods: {
      ...mapActions([
        'actionChangePassword'
      ]),
      headerLeft() {
        history.back()
      },
      checkMessage() {
        if(this.firstPassword != this.secondPassword) {
          this.$message.error('两次密码不一致');
          return 0
        } else {
          return 1
        }
      },
      headerRight() {
        if(this.checkMessage()) {
          let obj = {
            password: this.firstPassword
          }
          this.actionChangePassword(obj)
          this.$message({
            message: '操作成功，3秒后返回登录界面',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/');
          },3000)
        }
      }
    },
  }
</script>

<style scoped>
  .contain {
    width: 85%;
    margin:0 auto;
  }
  .el-input {
    margin-top: 40px;
  }
</style>