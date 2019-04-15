<template>
<div>
  <div class="main">
    <div class="left" @click="left()">
      <img :src="headerMsg.leftImg">
      <span class="left-word">{{headerMsg.centerWord}}</span>
    </div>
    <div class="right">
      <img :src="headerMsg.rightImg" @click="right()">
    </div>
    <div class="center">
      <img :src="headerMsg.centerImg" @click="center()">
    </div>
  </div>
  <div class="block"></div>
</div>
</template>

<script>
  export default {
    name: 'myHeader',
    props:{
      headerMsg: Object
    },
    data() {
      return {
        startx:'',
        starty:'',

      }
    },
    created() {
      
    },
    methods: {
      left: function() {
        this.$parent.headerLeft()
      },
      right: function() {
        this.$parent.headerRight()
      },
      center() {
        this.$parent.headerCenter()
      }
    }
  }
</script>

<style scoped>
.main {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e5e5e5;
  position: fixed;
  z-index: 10;
  top: 0;
  font-size: 18px;
  line-height: 45px;
  background: #ffffff;
}
.left {
  width: 70%;
  height: 100%;
  float: left;
  text-align: left;
}
.left-word {
  margin-left: 10px;
}
.right, .center {
  width: 15%;
  height: 100%;
  float: right;
  text-align: left;
}
.left > img {
  float: left;
  margin-top: 13px;
  margin-left: 10px;
  max-width: 18px;
  max-height: 18px;
}

.right > img, .center > img {
  float: right;
  margin-top: 13px;
  margin-right: 20px;
  max-width: 18px;
  max-height: 18px;
}
.block {
  height: 50px;
}

</style>