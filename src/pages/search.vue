<template>
  <div class="main">
    <!-- <v-menu :activeIndex="menuIndex"></v-menu> -->
    <!-- <div class="block"></div> -->
    <el-input v-model="input" placeholder="请输入内容" class="search">
      <el-button slot="prepend" icon="el-icon-arrow-left" @click="back()"></el-button>
      <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
    </el-input>
    <div class="lists" v-for="(list,index) in searchList">
      <v-list :list="list"></v-list>
    </div>
  </div>
</template>

<script>
  import list from '@/components/list'
  import topMenu from '@/components/topMenu'
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name:'search',
    components: {
      'v-list': list,
      'v-menu': topMenu,
    },
    data(){
      return{
        menuIndex: '2',
        input: '',
      }
    },
    computed: {
      ...mapGetters([
        'searchList',
      ]),
    },
    methods:{
      ...mapActions([
        'actionSearch'
      ]),
      search() {
        //console.log(`关键字是：${this.input}`)
        this.actionSearch(this.input)
        //console.log(`搜索结果：${this.searchList}`)
      },
      back() {
        history.back()
      },
    }
  }
</script>

<style scoped>

</style>