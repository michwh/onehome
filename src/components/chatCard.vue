<template>
  <div class="clearfix" @click="chatDetail()">
    <div class="img-tao">
      <el-badge :value="list.unreadCount" v-if="list.unreadCount != 0">
      <img :src="list.avatar_url" class="user-head">
      </el-badge>
      <img :src="list.avatar_url" class="user-head" v-else>
    </div>
    <div class="tao">
      <div class="user-name">{{list.username}}</div>
      <div class="time">{{list.msg[list.msg.length - 1].words}}</div>
    </div>
    <span class="price">{{list.msg[list.msg.length - 1].time.split(" ")[0]}}</span>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default{
    name:'chatCard',
    props:{
      list: Object
    },
    data(){
      return{
        
      }
    },
    computed: {
      ...mapGetters([
        'unreadMsgLength',
        'group_name',
      ]),
    },
    methods:{
      ...mapActions([
        'actionSetChatToUser',
        'actionReduceUnreadMsg',
        'actionSetGroupName',
        'actionChangeReadState',
      ]),
      chatDetail() {
        //开始读取消息的位置
        const startPosition = this.list.msg.length - this.list.unreadCount
        let obj = {
            user_id: this.list.user_id,
            username: this.list.username,
            avatar_url: this.list.avatar_url,
        }
        this.actionSetGroupName(this.list.user_id)
        this.actionSetChatToUser(obj)
        this.actionReduceUnreadMsg(this.list.unreadCount)
        //this.unread = false
        this.actionChangeReadState(this.list.username)
        //通过缓存传送历史消息至聊天界面
        let m = []
        for(let i = startPosition; i < this.list.msg.length; i++) {
          let o = {
            name: this.list.username,
            msg: this.list.msg[i].words,
            avatar: this.list.avatar_url,
            time: this.list.msg[i].time,
          }
          m.push(o)
        }
        let existingMsg = JSON.parse(window.localStorage.getItem(this.group_name))
        if(existingMsg) {
          //console.log('原来是有的')
          existingMsg = existingMsg.concat(m)
          window.localStorage.setItem(this.group_name, JSON.stringify(existingMsg))
        } else {
          //console.log(`原来是没有的${m[0]}`)
          window.localStorage.setItem(this.group_name, JSON.stringify(m))
        }
        this.$router.push('/chat');
      }
    }
  }
</script>

<style scoped>
  .clearfix {
    height: 40px;
    padding: 15px;
    border-bottom: 1px solid #ebeef5;
    /*box-sizing: border-box;*/
    margin-top: 5px;
  }
  .user-head {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    /*float: left;*/
    /*margin-top: 10px;*/
  }
  .img-tao {
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
    font-size: 17px;
    font-weight: bold;
  }
  .price {
    float: right;
    font-weight: bold;
    font-size: 15px;
    color: #a9a9a9;
  }
  .tao {
    float: left;
    margin-left: 10px;
    height: 40px;
    width: 60%;
    /*margin-top: 10px;*/
  }
  .time {
    text-align: left;
    /*margin-right: 40px;*/
    font-size: 15px;
    width: 100%;
    color: #a9a9a9;
    text-overflow:ellipsis;
    overflow: hidden;
    height: 20px;
    white-space: nowrap;
  }
</style>