<template>
  <div class="main">
    <div class="left" @click="left()">
      <img :src="headerMsg.leftImg">
      <span>{{headerMsg.leftWord}}</span>
    </div>
    <div class="center">
      <span>{{headerMsg.centerWord}}</span>
    </div>
    <div class="right">
      <span>{{headerMsg.rightWord}}</span>
      <img :src="headerMsg.rightImg" @click="right()">
    </div>
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

      }
    },
    methods: {
      left: function() {
        this.$parent.headerLeft()
      },
      right: function() {
        this.$parent.headerRight()
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
  width: 33.3%;
  height: 100%;
  float: left;
  text-align: right;
}
.center {
  width: 33.3%;
  height: 100%;
  float: left;
}
.right {
  width: 33.3%;
  height: 100%;
  float: right;
  text-align: left;
}
.left > img {
  float: left;
  margin-top: 13px;
  margin-left: 20px;
}
.right > img {
  float: right;
  margin-top: 13px;
  margin-right: 20px;
}

</style>