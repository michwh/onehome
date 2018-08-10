<template>
  <div class="main">
    <el-menu 
    mode="horizontal" 
    @select="handleMenu" 
    text-color="#66757f" 
    active-text-color="#409EFF"
    :default-active="activeIndex">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">搜索</el-menu-item>
      <el-menu-item index="3">消息</el-menu-item>
      <el-menu-item index="4">我的</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default{
    name:'home',
    data(){
      return{
        activeIndex: '1'
      }
    },
    methods:{
      handleMenu(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style scoped>
  
</style>