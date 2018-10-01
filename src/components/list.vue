<template>
  <div class="box-card">
    <div class="clearfix">
      <img :src="list.user_image_URL" class="user-head">
      <span class="user-name">{{list.user_name}}</span>
      <span class="price">￥{{list.goods_price}}</span>
    </div>
    <div class="tao">
      <div class="images">
        <img v-for="(img,index) in list.goods_image_URL" :src="img" >
      </div>
    </div>
    <div class="title">
      {{list.title}}
    </div>
  </div>
</template>

<script>
  export default{
    name:'list',
    props:{
      list: Object
    },
    data(){
      return{
      }
    },
    methods:{
      
    }
  }
</script>

<style scoped>
  .box-card {
    margin-top: 5px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border: 1px solid #ebeef5;
    background-color: #fff;
    border-radius: 4px;
    /*overflow: hidden;*/
  }
  .clearfix {
    height: 30px;
    padding: 10px;
    border-bottom: 1px solid #ebeef5;
    /*box-sizing: border-box;*/
  }
  .user-head {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    float: left;
  }
  .user-name {
    float: left;
    margin-left: 10px;
    text-align: left;
    /*font-weight: bold;*/
    text-overflow:ellipsis;
    width: 50%;
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
    margin: 10px 0 10px 10px;
    height: 200px;
    overflow-x: scroll;
  }
  .images {
    height: 100%;
    /*white-space: nowrap;*/
    display: inline-flex;
    float: left;
  }
  .images img{
    float: left;
    width: 200px;
    height: 100%;
  }
  .title {
    text-align: left;
    padding: 0px 10px 10px 10px;
    font-weight: bold;
  }
</style>