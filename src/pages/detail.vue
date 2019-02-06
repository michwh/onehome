<template>
<div class="main">
  <v-header :headerMsg="headerMsg"></v-header>{{watchCollectState}}
  <div class="box-card">
    <div class="clearfix">
      <img :src="list.avatar_url" class="user-head">
      <div class="tao">
        <div class="user-name">{{list.username}}</div>
        <div class="time">{{list.time}}</div>
      </div>
      <span class="price">￥{{list.goods_price}}</span>
    </div>
    <div class="title">{{list.title}}</div>
    <div class="description">{{list.description}}</div>
    <div class="images">
      <img v-for="(img,index) in list.goods_img_url" :src="img" >
    </div>
  </div>
  <div class="block"></div>
</div>
</template>

<script>
  import myHeader from '@/components/header'
  import { mapActions } from 'vuex';
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
          rightImg: '',
          centerImg: '/static/images/message.png',
        },
        nowCollectState: false,
      }
    },
    created() {
      this.list = JSON.parse(window.localStorage.getItem('detail'))
      this.nowCollectState = this.list.collect_state
    },
    computed: {
      watchCollectState() {
        if(this.nowCollectState) {
          this.headerMsg.rightImg = '/static/images/favor_fill.png'
        } else {
          this.headerMsg.rightImg = '/static/images/favor.png'
        }
      }
    },
    methods:{
      ...mapActions([
        'actionChangeCollectState',
        'actionSetChatToUser',
        'actionSetGroupName',
      ]),
      //返回
      headerLeft: function() {
        if(this.nowCollectState != this.list.collect_state) {
          let obj = {
            product_id: this.list.product_id,
            collect_state: this.nowCollectState
          }
          this.actionChangeCollectState(obj)
        }
        window.localStorage.removeItem('detail');
        history.back()
      },
      //改变收藏状态
      headerRight: function() {
        this.nowCollectState = !this.nowCollectState
        if(this.nowCollectState) {
          this.$message({
            message: '收藏成功！',
            type: 'success',
            duration: 2000,
        });
        }
      },
      //与用户聊天
      headerCenter(){
          let obj = {
            user_id: this.list.user_id,
            username: this.list.username,
            avatar_url: this.list.avatar_url,
          }
          this.actionSetGroupName(this.list.user_id)
          this.actionSetChatToUser(obj)
          this.$router.push('/chat');
      }
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
  border-top: 1px solid #ebeef5;
}
.chat, .collect, .obtained {
  width: 50%;
  float: left;
  text-align: center;
  height: 100%;
}
.chat i, .collect i, .obtained i {
  line-height: 40px;
}
.description, .title {
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
    padding: 10px;
  }
  .images > img{
    /*float: left;*/
    width: 100%;
    height: auto;
  }
  .time {
    text-align: left;
    /*margin-right: 40px;*/
    font-size: 15px;
    width: 100%;
  }
</style>