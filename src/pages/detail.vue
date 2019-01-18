<template>
<div class="main">
  <v-header :headerMsg="headerMsg"></v-header>
  <div class="block"></div>
  <div class="box-card">
    <div class="clearfix">
      <img :src="list.avator_url" class="user-head">
      <div class="tao">
        <div class="user-name">{{list.username}}</div>
        <div class="time">{{list.time}}</div>
      </div>
      <span class="price">￥{{list.goods_price}}</span>
    </div>
    <div class="description">{{list.description}}</div>
    <div class="images">
      <img v-for="(img,index) in list.goods_img_url" :src="img" >
    </div>
  </div>
  <div class="block"></div>
  <div class="bar">
    <div class="chat">
      <i class="el-icon-phone"></i>
      <i>聊天</i>
    </div>
    <div class="collect" v-if="list.collect_state">
      <i class="el-icon-star-on"></i>
      <i>取消收藏</i>
    </div>
    <div class="collect" v-else>
      <i class="el-icon-star-off"></i>
      <i>收藏</i>
    </div>
  </div>
</div>
</template>

<script>
  import myHeader from '@/components/header'
  export default{
    name:'list',
    components: {
      'v-header': myHeader,
    },
    data(){
      return{
        list:{},
        headerMsg: {
          centerWord: '详情',
          //这种绑定的图片只能放在static文件夹下
          leftImg: '/static/images/back.png',
        }
      }
    },
    created() {
      this.list = JSON.parse(window.localStorage.getItem('detail'))
    },
    methods:{
      //返回
      headerLeft: function() {
        window.localStorage.removeItem('detail');
        history.back()
      },
    }
  }
</script>

<style scoped>
.block {
  height: 50px;
}
.bar {
  position: fixed;
  z-index: 10;
  background: #ffffff;
  width: 100%;
  bottom: 0;
  height: 40px;
}
.chat, .collect {
  width: 50%;
  float: left;
  text-align: center;
  height: 100%;
}
.chat i, .collect i {
  line-height: 40px;
}
.description {
  padding: 10px;
  text-align: left;
}
  .box-card {
    margin-top: 3px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border: 1px solid #ebeef5;
    background-color: #fff;
    border-radius: 4px;
    /*overflow: hidden;*/
  }
  .clearfix {
    height: 40px;
    padding: 10px;
    border-bottom: 1px solid #ebeef5;
    /*box-sizing: border-box;*/
  }
  .user-head {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    float: left;
  }
  .user-name {
    /*float: left;
    margin-left: 10px;*/
    text-align: left;
    /*font-weight: bold;*/
    text-overflow:ellipsis;
    width: 100%;
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
  }
  .price {
    float: right;
    font-weight: bold;
    color: #ff0000;
    font-size: 17px;
  }
  .tao {
    float: left;
    margin-left: 10px;
    height: 100%;
    width: 50%;
  }
  .images {
    /*width: 100%;*/
    /*height: auto;*/
    /*white-space: nowrap;*/
    /*display: inline-flex;*/
    padding: 10px;
  }
  .images img{
    /*float: left;*/
    width: 100%;
    height: auto;
  }
  /*.title {
    text-align: left;
    padding: 0px 10px 10px 10px;
    font-weight: bold;
  }*/
  /*.operation {
    height: 30px;
    border-top: 1px solid #ebeef5;
  }*/
  .time {
    text-align: left;
    /*margin-right: 40px;*/
    font-size: 15px;
    width: 100%;
  }
</style>