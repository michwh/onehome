<template>
  <div class="main">
    <v-menu :activeIndex="menuIndex"></v-menu>
    <div class="block"></div>
    <div class="clearfix">
      <img :src="list.avator_url" class="user-head">
      <span class="user-name">{{list.username}}</span>
    </div>
  </div>
</template>

<script>
  import topMenu from '@/components/topMenu'
  export default{
    name:'mine',
    components: {
      'v-menu': topMenu,
    },
    data(){
      return{
        menuIndex: '4',
        list: {
          'avator_url':'/static/testListImages/user2.jpg',
          'username': '测试用的用户名'
        }
      }
    },
  }
</script>

<style scoped>
.block {
  height: 56px;
}
.clearfix {
    height: 50px;
    padding: 10px;
    width: 90%;
    border-bottom: 1px solid #ebeef5;
    /*box-sizing: border-box;*/
    margin: 0 auto;
  }
  .user-head {
    width: 50px;
    height: 50px;
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
</style>