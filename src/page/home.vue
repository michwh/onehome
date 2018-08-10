<template>
  <div class="main">
        <el-menu 
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
        <el-button class="add" icon="el-icon-plus" type="primary" circle></el-button>
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
.add {
  height: 50px;
  width: 50px;
}
.add {
  position: fixed;
  bottom: 30px;
  right: 20px;
}
</style>