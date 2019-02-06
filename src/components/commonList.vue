<template>
  <div @click="showDetail()">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="list.goods_img_url[0]" :class="imgName">
          <!-- <img class="image"> -->
          <div style="padding: 5px; text-align: left;">
            <div class="title">{{list.title}}</div>
              <div class="price">￥{{list.goods_price}}</div>
              <div class="time">{{ list.time }}</div>
          </div>
        </el-card>
  </div>
  </template>

<script>
  export default{
    name:'commonList',
    props:{
      list: Object,
      index: Number,
    },
    data(){
      return{
        imgName: '',
      }
    },
    created() {
      this.imgName = `image${this.index}`
    },
    mounted() {
      //如果每个list组件的<img>都使用同样class
      //那么document.querySelector('.xxx')获得的永远是第一个list组件的<img>
      const img = document.querySelector(`.${this.imgName}`)
      img.style.width = "100%";
      img.style.height = `${img.offsetWidth}px`
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
.title {
  font-weight: bold;
  height: 20px;
  overflow: hidden;
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
    /*height: 0;
    padding-bottom: 100%;
    background-size: cover;*/
  }
</style>