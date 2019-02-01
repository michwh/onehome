<template>
  <div>
    <v-header :headerMsg="headerMsg"></v-header>
    <div class="contain">
      <el-input 
      v-model="firstPassword" 
      placeholder="请输入新密码"
      type="password"></el-input>
      <el-input 
      v-model="secondPassword" 
      placeholder="请再次输入新密码"
      type="password"></el-input>
    </div>
    <v-loading :successMsg="modifySuccessMsg" :errorMsg="modifyErrorMsg"></v-loading>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import myLoading from '@/components/loading'
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  export default {
    name: 'changePassword',
    components: {
      'v-header': myHeader,
      'v-loading': myLoading
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
        modifySuccessMsg:'修改成功，请重新登录',
        modifyErrorMsg:'修改失败',
      }
    },
    methods: {
      ...mapMutations([
        'notPublish',
        'publishing'
      ]),
      ...mapActions([
        'actionChangePassword',
        'actionCloseMessagePush',
      ]),
      headerLeft() {
        history.back()
      },
      //加载成功以后执行的操作，配合loading组件使用
      afterLoading() {
        //将发布状态设为未发布状态
        this.notPublish()
        this.actionCloseMessagePush()
        window.localStorage.clear();
        this.$router.push('/');
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
          //将发布状态设为发布中，开启加载界面
          this.publishing()
          let obj = {
            password: this.firstPassword
          }
          this.actionChangePassword(obj)
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