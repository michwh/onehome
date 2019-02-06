<template>
  <div class="main">
    <!-- <v-menu :activeIndex="menuIndex"></v-menu> -->
    <el-input v-model="input" placeholder="请输入内容" class="search">
      <el-button slot="prepend" icon="el-icon-arrow-left" @click="back()"></el-button>
      <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
    </el-input>
    <v-common-lists :lists="searchList"></v-common-lists>
    <div class="block2"></div>
  </div>
</template>

<script>
  import commonLists from '@/components/commonLists'
  import topMenu from '@/components/topMenu'
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name:'search',
    components: {
      'v-menu': topMenu,
      'v-common-lists': commonLists,
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
        this.actionSearch(this.input)
      },
      back() {
        history.back()
      },
    }
  }
</script>

<style scoped>
.block2 {
  height: 50px;
}
</style>