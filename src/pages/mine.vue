<template>
  <div class="main">
    <v-menu :activeIndex="menuIndex"></v-menu>
    <div class="block"></div>
    <div class="clearfix">
      <img :src="userinfo.user_image_url" class="user-head" @click="changeAvatar()">
      <span class="user-name">{{userinfo.username}}</span>
    </div>
    <div class="select my-collection">
      <span class="left">我的收藏</span>
      <i class="el-icon-star-on right"></i>
      <!-- <i class="el-icon-arrow-right right"></i> -->
    </div>
    <div class="select my-publish">
      <span class="left">我的发布</span>
      <i class="el-icon-edit-outline right"></i>
      <!-- <i class="el-icon-arrow-right"></i> -->
    </div>
    <div class="select change-password" @click="changePassword()">
      <span class="left">修改密码</span>
      <i class="el-icon-setting right"></i>
      <!-- <i class="el-icon-arrow-right"></i> -->
    </div>
  </div>
</template>

<script>
  import topMenu from '@/components/topMenu'
  import imgUpload from '@/components/imgUpload'
  export default{
    name:'mine',
    components: {
      'v-menu': topMenu,
      'v-upload': imgUpload,
    },
    data(){
      return{
        menuIndex: '4',
        userinfo:{},
      }
    },
    created() {
      this.userinfo = JSON.parse(window.localStorage.getItem('userinfo'))
    },
    methods: {
      changeAvatar() {
        this.$router.push('/changeAvatar');
      },
      changePassword() {
        this.$router.push('/changePassword');
      }
    },
  }
</script>

<style scoped>
.block {
  height: 56px;
}
.clearfix {
    height: 60px;
    padding: 10px;
    width: 90%;
    /*border-bottom: 1px solid #ebeef5;*/
    /*box-sizing: border-box;*/
    margin: 0 auto;
    margin-top: 5px;
  }
  .user-head {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    float: left;
  }
  .user-name {
    float: left;
    margin-left: 10px;
    text-align: left;
    /*font-weight: bold;*/
    text-overflow:ellipsis;
    width: 50%;
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    font-size: 17px;
    font-weight: bold;
  }
  .select {
    width: 90%;
    margin: 0 auto;
    border-bottom: 1px solid #ebeef5;
    height: 50px;
    font-size: 15px;
  }
  .left {
    float: left;
    padding-top: 20px;
  }
  .right {
    float: right;
    padding-top: 20px;
  }
</style>