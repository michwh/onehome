<template>
  <div>
    <v-header :headerMsg="headerMsg"></v-header>
    <!-- <div class="tao"> -->
    <v-upload
    class="v-upload" 
    ref="imgUpload" 
    :limit="limit" 
    :multiple="multiple"></v-upload>{{watchImgState}}
    <v-loading :successMsg="uploadSuccesMsg" :errorMsg="uploadErrorMsg"></v-loading>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import imgUpload from '@/components/imgUpload'
  import myLoading from '@/components/loading'
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  export default {
    name: 'changeAvatar',
    components: {
      'v-header': myHeader,
      'v-upload': imgUpload,
      'v-loading': myLoading,
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
        uploadSuccesMsg:'上传成功',
        uploadErrorMsg:'上传失败',
      }
    },
    computed: {
      ...mapGetters([
        'imgName',
        'userinfo',
        'publishState',
        'qiniuaddr',
        'allImgUploadState',
      ]),
      watchImgState() {
        if(this.allImgUploadState === 1) {
          // this.imgsList = this.imgName.map(key => `http://${this.qiniuaddr}/${key}`)
          let obj = {
            user_image_url: this.imgName[0].split('||')[0]
          }
          this.actionChangeAvatar(obj)
        } else if(this.allImgUploadState === -1) {
          this.actionPublishError()
        }
      }
    },
    methods: {
      ...mapActions([
        'actionChangeAvatar',
        'actionClearImgInfo',
        'actionPublishError',
      ]),
      ...mapMutations([
        'notPublish',
        'publishing'
      ]),
      //返回
      headerLeft: function() {
        history.back()
      },
      //加载成功以后执行的操作，和loading组件配合使用
      afterLoading() {
        //离开界面之前清空存在vuex里的图片信息
        this.actionClearImgInfo()
        //将发布状态设为未发布状态
        this.notPublish()
        history.back()
      },
      headerRight() {
        //将发布状态设为发布中，开启加载界面
        this.publishing()
        this.$refs.imgUpload.uploadImg()
      },
    }
  }
</script>

<style scoped>
.v-upload {
  margin-top: 100px;
}
</style>