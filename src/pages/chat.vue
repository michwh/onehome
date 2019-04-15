<template>
  <div>
    <v-header :headerMsg="headerMsg"></v-header>
    <div class="chat-content">
      <div v-for="obj in msgRecord">
        <v-my-msg
        v-if="obj.name == myUserInfo.username"
        :msg="obj.msg" 
        :avatar="obj.avatar"
        :mytime="obj.time"></v-my-msg>
        <v-other-msg 
        v-else
        :msg="obj.msg" 
        :avatar="obj.avatar"
        :mytime="obj.time"></v-other-msg>
      </div>
    </div>
    <el-input
    v-model="input">
    <el-button slot="append" @click="websocketsend()">发送</el-button>
  </el-input>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import * as url from '../api/urlConfig'
  import myMsg from '@/components/myMsg'
  import otherMsg from '@/components/otherMsg'
  import myHeader from '@/components/header'
  export default{
    name:'chat',
    components: {
      'v-my-msg': myMsg,
      'v-other-msg': otherMsg,
      'v-header': myHeader,
    },
    data(){
      return{
        input:'',
        myUserInfo:{}, //我的个人信息
        headerMsg: {
          centerWord: '',
          //这种绑定的图片只能放在static文件夹下
          leftImg: '/static/images/back.png',
        },
        container: {}, //.chat-content容器
        websock: null,
        msgRecord: [], //消息记录
      }
    },
    created() {
      this.myUserInfo = JSON.parse(window.localStorage.getItem('userinfo'))
      this.headerMsg.centerWord = this.chatToUser.username
      this.initWebSocket();
      //获取该聊天组的历史消息
      const hm = JSON.parse(window.localStorage.getItem(this.group_name))
      if(hm) {
        this.msgRecord = hm
      }
      //时间格式化
      Date.prototype.Format = function (fmt) {
        var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }
    },
    computed: {
      ...mapGetters([
        'chatToUser', //聊天对象的个人信息
        'group_name',
      ]),
    },
    destroyed() {
      //离开路由之后断开websocket连接
      this.websock.close()
    },
    mounted() {
      //设置输入框在界面中的位置
      //这里不能写在created()里，因为那时候元素还没有加载好
      this.container = document.querySelector('.chat-content')
      const pageHeight = window.innerHeight;
      const inputHeight = document.querySelector('.el-input').offsetHeight
      this.container.style.height = `${pageHeight - inputHeight - 50}px`;

      // 自动滚动到底部
      this.$nextTick(() => {
        this.container.scrollTop = this.container.scrollHeight
      })
    },
    methods: {
      ...mapActions([
        'actionClearGroupName',
      ]),
      //初始化weosocket
      initWebSocket(){
        //const wsuri = `wss://www.fanfei.site/ws/chat/${this.group_name}/`;
        const wsuri = `${url.chat}/${this.group_name}/`;
        //alert(`地址：${wsuri}`)
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      //连接建立之后执行send方法发送数据
      websocketonopen(){ 
        console.log('WebSocket连接成功')
      },
      //连接建立失败重连
      websocketonerror(e){
        console.log(`连接失败的信息：${e}`)
        this.initWebSocket();
      },
      //数据接收
      websocketonmessage(e){ 
        const redata = JSON.parse(e.data);
        //let name = ''
        //let avatar = ''
        if(redata.from_user == this.chatToUser.user_id) {
          //name = this.chatToUser.username
          //avatar = this.chatToUser.avatar_url
          //const time = redata.time
          const obj = {
            name: this.chatToUser.username,
            msg: redata.message,
            avatar: this.chatToUser.avatar_url,
            time: redata.time
          }
          this.msgRecord.push(obj)
          this.$nextTick(() => {
            this.container.scrollTop = this.container.scrollHeight
          })
        } else if(redata.from_user == this.myUserInfo.id) {
          console.log('消息发送成功')
        } else {
          console.log('返回未知消息')
        }
      },
      //数据发送
      websocketsend(){
        const time = new Date().Format("yyyy-MM-dd hh:mm:ss")
        let obj = {
          from_user: this.myUserInfo.id,
          to_user: this.chatToUser.user_id,
          message: this.input,
          time: time
        }
        //发给后端的数据需要字符串化
        this.websock.send(JSON.stringify(obj));
        obj = {
          name: this.myUserInfo.username,
          msg: this.input,
          avatar: this.myUserInfo.user_image_url,
          time: time
        }
        this.msgRecord.push(obj)
        this.$nextTick(() => {
          this.container.scrollTop = this.container.scrollHeight
        })
        this.input = ''
      },
      //关闭
      websocketclose(e){ 
        console.log('断开连接',e);
      },
      //返回
      headerLeft() {
        this.websocketclose()
        window.localStorage.setItem(this.group_name, JSON.stringify(this.msgRecord))
        this.actionClearGroupName()
        history.back()
      },
    }
  }
</script>

<style scoped>
  .el-input {
    font-size: 15px;
    z-index: 10;
  }
  .chat-content {
  width: 100%;
  overflow: scroll;
  background: #ffffff;
}
</style>
