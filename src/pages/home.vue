<template>
  <div class="main">
    <v-menu :activeIndex="menuIndex"></v-menu>
    <!-- <div class="block"></div> -->
    <div class="lists" v-for="(list,index) in productList">
      <v-list :list="list"></v-list>
    </div>
    <el-button 
    class="add" 
    icon="el-icon-plus" 
    type="primary" 
    circle 
    @click="publish()"></el-button>
    <div class="block2" @click="loadMore">
      <p v-if="loadState === 2"><i class="el-icon-loading"></i></p>
      <p v-if="loadState === 1">点击加载更多</p>
      <p v-if="loadState === -1">加载失败</p>
      <p v-if="loadState === 0">到底啦</p>
    </div>
  </div>
</template>

<script>
  import list from '@/components/list'
  import topMenu from '@/components/topMenu'
  import { mapGetters, mapActions } from 'vuex';

  export default{
    name:'home',
    components: {
      'v-list': list,
      'v-menu': topMenu,
    },
    data(){
      return{
        menuIndex: '1',
        page: 1,
      }
    },
    created(){
      window.addEventListener('beforeunload', e => {
        window.localStorage.removeItem('productList');
      });
      if(!window.localStorage.productList) {
        this.actionGetList(this.page)
      }
    },
    computed: {
      ...mapGetters([
        'productList',
        'userinfo',
        'loadState'
      ]),
    },
    methods:{
      ...mapActions([
        'actionGetList'
      ]),
      publish: function() {
        this.$router.push('/publish');
      },
      loadMore: function() {
        this.page++
        this.actionGetList(this.page)
      },
      // onScroll: function() {
      //   window.onscroll = () => {
      //     //包括滑动部分界面的高度
      //     let offsetHeight = document.documentElement.offsetHeight
      //     //向下滑动的距离
      //     let scrollTop = document.documentElement.scrollTop
      //     //界面高度
      //     let innerHeight = window.innerHeight
      //     console.log(`${offsetHeight} ${scrollTop} ${innerHeight}`)
      //     if(offsetHeight - scrollTop - innerHeight <= 100 && this.loadState == 1) {
      //         console.log('启动')
      //         this.page++
      //         this.actionGetList(this.page)
      //     }
      //   }
      // }
    },
    // mounted() {
    //   this.onScroll()
    // }
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
.block2 {
  height: 50px;
}
.block2 i {
  text-align: center;
}
</style>