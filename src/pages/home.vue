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
    <div class="block2">
      <p v-if="loadState === 2"><i class="el-icon-loading"></i></p>
      <!-- <p v-if="loadState === 1">加载更多</p> -->
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
        count1: 0,
        count2: 0
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
        this.startx = e.touches[0].pageX
        this.starty = e.touches[0].pageY
      })
      document.addEventListener("touchmove", e => {
        this.endx = e.changedTouches[0].pageX
        this.endy = e.changedTouches[0].pageY
        const direction = this.getDirection(this.startx, this.starty, this.endx, this.endy);
        const add = document.querySelector(".add")
        const elIconPlus = document.querySelector(".el-icon-plus")
        switch(direction) {
          case 1:
            add.style.opacity = 0
            add.style.width = "0px"
            add.style.height = "0px"
            elIconPlus.style.opacity = 0
            elIconPlus.style.width = "0px"
            elIconPlus.style.height = "0px"
            break
          case 2:
            add.style.opacity = 1
            add.style.width = "50px"
            add.style.height = "50px"
            elIconPlus.style.opacity = 1
            elIconPlus.style.width = "14px"
            elIconPlus.style.height = "14px"
            break
        }
      })
      //document.addEventListener('scroll',this.debounce(this.lazyLoad(),500))
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
      },
      // debounce (fn, delay) {
      //   // 持久化一个定时器 timer
      //   let timer = null
      //   // 闭包函数可以访问 timer
      //   return function () {
      //     // 通过 'this' 和 'arguments'
      //     // 获得函数的作用域和参数
      //     let context = this
      //     let args = Array.prototype.slice.call(arguments)
      //     // 如果事件被触发，清除 timer 并重新开始计时
      //     clearTimeout(timer)
      //     timer = setTimeout(function () {
      //       fn.apply(context, args)
      //     }, delay)
      //   }
      // },
      throttle (fun, delay, time) {
        let timeout

        let startTime = new Date()

        return function () {
          let context = this

          let args = Array.prototype.slice.call(arguments)

          let curTime = new Date()

          clearTimeout(timeout)
          if (curTime - startTime >= time) {
            // 如果达到了规定的触发时间间隔，触发 handler
            fun.apply(context, args)
            startTime = curTime
          } else {
            // 没达到触发间隔，重新设定定时器
            timeout = setTimeout(function () {
              fun.apply(context, args)
            }, delay)
          }
        }
      },
      lazyLoad() {
        //可见区域高度
        const seeHeight = document.documentElement.clientHeight
        //滚动条距离顶部高度
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

        //加载更多
        const block2 = document.querySelector('.block2')
        if(block2.offsetTop < seeHeight + scrollTop + 100 && this.loadState !== 0) {
          this.loadMore()
        }

        const images1 = Array.from(document.querySelectorAll('.tao-left .image'))
        const images2 = Array.from(document.querySelectorAll('.tao-right .image'))
        for (let i = this.count1; i < images1.length; i++) {
          if (images1[i].offsetTop < seeHeight + scrollTop) {
            this.count1++
            images1[i].src = images1[i].getAttribute("data-src")
            //images1[i].setAttribute("data-hasLoad", "true")
          }
        }
        for (let i = this.count2; i < images2.length; i++) {
          if (images2[i].offsetTop < seeHeight + scrollTop) {
            this.count2++
            images2[i].src = images2[i].getAttribute("data-src")
            //images2[i].setAttribute("data-hasLoad", "true")
          }
        }
      }
    },
    mounted() {
      setTimeout(() => {
        const seeHeight = document.documentElement.clientHeight
        const images1 = Array.from(document.querySelectorAll('.tao-left .image'))
        const images2 = Array.from(document.querySelectorAll('.tao-right .image'))
        for (let i = this.count1; i < images1.length; i++) {
          if (images1[i].offsetTop < seeHeight) {
            this.count1++
            images1[i].src = images1[i].getAttribute("data-src")
            //images1[i].setAttribute("data-hasLoad", "true")
          }
        }
        for (let i = this.count2; i < images2.length; i++) {
          if (images2[i].offsetTop < seeHeight) {
            this.count2++
            images2[i].src = images2[i].getAttribute("data-src")
            //images2[i].setAttribute("data-hasLoad", "true")
          }
        }
      },1000)
      //this.onScroll()
      document.addEventListener('scroll',this.throttle(this.lazyLoad,500,1000))
    }
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
.el-icon-plus {
  height: 14px;
  width: 14px;
  opacity: 1;
  transition: opacity .5s, width .5s, height .5s;
}
.block2 {
  height: 50px;
}
.el-icon-loading {
  text-align: center;
}

</style>