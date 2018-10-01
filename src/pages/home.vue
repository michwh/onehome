<template>
  <div class="main">
    <v-menu :activeIndex="menuIndex"></v-menu>
    <div class="block"></div>
    <div class="lists" v-for="(list,index) in lists">
      <v-list :list="list"></v-list>
    </div>
    <el-button class="add" icon="el-icon-plus" type="primary" circle></el-button>
  </div>
</template>

<script>
  import list from '@/components/list'
  import topMenu from '@/components/topMenu'

  export default{
    name:'home',
    components: {
      'v-list': list,
      'v-menu': topMenu,
    },
    data(){
      return{
        menuIndex: '1',
        lists: []
      }
    },
    created(){
      const this_=this;
      this.$http.get('http://localhost:8082/static/testListJSON.json').then(
        function(response) {
          this_.lists = response.data.lists;
        },
        function(response) {
          console.log("连接json文件失败");
        });            
    },
    methods:{
      
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
.block {
  height: 56px;
}
</style>