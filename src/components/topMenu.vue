<template>
  <el-menu 
    class="menu"
    mode="horizontal" 
    @select="handleMenu" 
    text-color="#66757f" 
    active-text-color="#409EFF"
    :default-active="activeIndex">
      <el-col :span="6"><el-menu-item index="1">首页</el-menu-item></el-col>
      <el-col :span="6"><el-menu-item index="2">搜索</el-menu-item></el-col>
      <el-col :span="6"><el-menu-item index="3">消息</el-menu-item></el-col>
      <el-col :span="6"><el-menu-item index="4">我的</el-menu-item></el-col>
  </el-menu>
</template>

<script>
  export default{
    name:'topMenu',
    props:{
      activeIndex: String
    },
    data(){
      return{
      }
    },
    methods:{
      handleMenu(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .menu {
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    z-index: 10;
    border-bottom: solid 1px #e6e6e6;
  }
  .is-active {
    border-bottom: 1px solid rgb(64, 158, 255);
  }
</style>