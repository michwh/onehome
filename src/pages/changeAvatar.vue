<template>
  <div>
    <v-header :headerMsg="headerMsg"></v-header>
    <!-- <div class="tao"> -->
    <v-upload
    class="v-upload" 
    ref="imgUpload" 
    :limit="limit" 
    :multiple="multiple"></v-upload><!-- {{watchUploadState}} -->
    </div>
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
      ]),
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
        history.back()
      },
      //加载成功以后执行的操作，和loading组件配合使用
      afterLoading() {
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
.v-upload {
  margin-top: 100px;
}
</style>