<template>
  <div @click="showDetail()">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="list.goods_img_url[0]" class="image">
          <div style="padding: 5px; text-align: left;">
            <span style="font-weight: bold;">{{list.title}}</span>
            <!-- <div class="bottom clearfix"> -->
              <div class="price">￥{{list.goods_price}}</div>
              <div class="time">{{ list.time }}</div>
            <!-- </div> -->
          </div>
        </el-card>
  </div>
  </template>

<script>
  export default{
    name:'newList',
    props:{
      list: Object
    },
    data(){
      return{
      }
    },
    methods:{
      showDetail() {
        window.localStorage.setItem('detail', JSON.stringify(this.list))
        this.$router.push('/detail');
      }
    }
  }
</script>

<style scoped>

.el-card {
  margin-top: 6px;
  border-radius: 10px;
}
  .time {
    font-size: 13px;
    color: #999;
    text-align: right;
    float: right;
    border-top: 0.5px solid #e5e5e5;
    width: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
    /* text-align: right; */
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .price {
    padding-top: 5px;
    padding-bottom: 5px;
    /*float: right;*/
    color: #ff0000;
    font-weight: bold;
    text-align: left;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>