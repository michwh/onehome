<template>
  <div class="main">
    <v-menu :activeIndex="menuIndex"></v-menu>
    <div class="tao">
      <div class="tao-left">
        <div class="lists" v-for="(list,index) in productList" v-if="index % 2 === 0">
          <v-new-list :list="list"></v-new-list>
        </div>
      </div>
      <div class="tao-right">
        <div class="lists" v-for="(list,index) in productList" v-if="index % 2 !== 0">
          <v-new-list :list="list"></v-new-list>
        </div>
      </div>
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
  import newList from '@/components/newList'
  import topMenu from '@/components/topMenu'
  import { mapGetters, mapActions } from 'vuex';

  export default{
    name:'home',
    components: {
      'v-menu': topMenu,
      'v-new-list': newList,
    },
    data(){
      return{
        menuIndex: '1',
        page: 1,
        startx: 0,
        starty: 0,
        endx: 0,
        endy: 0,
      }
    },
    created(){
      window.addEventListener('beforeunload', e => {
        window.localStorage.removeItem('productList');
      });
      if(!window.localStorage.productList) {
        this.actionGetList(this.page)
      }
      document.addEventListener("touchstart", e => {
        //console.log(`开始：${e.touches[0].pageY}`)
        this.startx = e.touches[0].pageX
        this.starty = e.touches[0].pageY
      })
      document.addEventListener("touchmove", e => {
        //console.log(`进行中：${e.changedTouches[0].pageY}`)
        this.endx = e.changedTouches[0].pageX
        this.endy = e.changedTouches[0].pageY
        const direction = this.getDirection(this.startx, this.starty, this.endx, this.endy);
        const add = document.querySelector(".add")
        switch(direction) {
          case 1:
            //add.style.display = "none"
            add.style.opacity = 0
            add.style.width = "0px"
            add.style.height = "0px"
            break
          case 2:
            add.style.opacity = 1
            add.style.width = "50px"
            add.style.height = "50px"
            break
        }
      })
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
      //根据起点终点返回方向 1向上 2向下 0未滑动
      getDirection(startx, starty, endx, endy) {
        const angx = endx - startx
        const angy = endy - starty
        let result = 0
        //如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }
        const angle = Math.atan2(angy, angx) * 180 / Math.PI
        if (angle >= -135 && angle <= -45) {
            result = 1
        } else if (angle > 45 && angle < 135) {
            result = 2
        }
        return result
      }
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
.tao {
  width: 96%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.tao-right, .tao-left {
  width: 49%;
  display: flex;
  flex-direction: column;
}
.add {
  height: 50px;
  width: 50px;
  opacity: 1;
  transition: opacity .5s, width .5s, height .5s;
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