<template>
  <div class="all">
    <v-header :headerMsg="headerMsg"></v-header>
    <div class="tao">
    <v-upload 
    ref="imgUpload" 
    :limit="limit" 
    :multiple="multiple"></v-upload>{{watchUploadState}}
    </div>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import imgUpload from '@/components/imgUpload'
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  export default {
    name: 'changeAvatar',
    components: {
      'v-header': myHeader,
      'v-upload': imgUpload,
    },
    data() {
      return {
        headerMsg: {
          centerWord: '上传头像',
          //这种绑定的图片只能放在static文件夹下
          leftImg: '/static/images/back.png',
          rightImg: '/static/images/check.png',
        },
        limit:"1",
        multiple:false,
        imgsList:[],
        //avatar:'',
      }
    },
    computed: {
      ...mapGetters([
        'imgName',
        'userinfo',
        'publishState',
        'qiniuaddr',
      ]),
      //监听头像上传状态
      watchUploadState() {
        let loading = null
        if(this.publishState == 2) {
          loading = this.$loading({
            lock: true,
            background: 'rgba(0, 0, 0, 0.7)'
          });
        } else if(this.publishState == 1) {
          loading = this.$loading({});
          loading.close()
          loading = this.$loading({
            lock: true,
            background: 'rgba(0, 0, 0, 0.7)',
            text: '上传成功',
            spinner: 'el-icon-check',
          });
          setTimeout(() => {
            loading.close();
            this.headerLeft()
          }, 1000);
        } else if(this.publishState == -1) {
          loading = this.$loading({});
          loading.close()
          loading = this.$loading({
            lock: true,
            background: 'rgba(0, 0, 0, 0.7)',
            text: '上传失败',
            spinner: 'el-icon-close',
          });
          setTimeout(() => {
            loading.close();
          }, 1000);
        }
      },
    },
    methods: {
      ...mapActions([
        'actionChangeAvatar'
      ]),
      ...mapMutations([
        'clearImgInfo',
        'notPublish',
        'publishing'
      ]),
      //返回
      headerLeft: function() {
        //离开界面之前清空存在vuex里的图片信息
        this.clearImgInfo()
        //将发布状态设为未发布状态
        this.notPublish()
        history.back()
      },
      headerRight() {
        //将发布状态设为发布中，开启加载界面
        this.publishing()
        this.$refs.imgUpload.uploadImg()
        setTimeout(() => {
          for(let key in this.imgName) {
              this.imgsList.push(`http://${this.qiniuaddr}/${this.imgName[key]}`)
          }
          let obj = {
            user_image_url: this.imgsList[0]
          }
          this.actionChangeAvatar(obj)
        },1000)
      },
    }
  }
</script>

<style scoped>
.el-upload {
  width: 100%;
  height: auto;
}
.tao {
  position: fixed;
  top: 50%;
  left: 50%;
  /*background-color: #000;*/
  width:50%;
  height: 50%;
-webkit-transform: translateX(-50%) translateY(-50%);
}
</style>