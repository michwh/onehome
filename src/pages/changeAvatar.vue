<template>
  <div class="all">
    <v-header :headerMsg="headerMsg"></v-header>
    <div class="tao">
    <v-upload 
    ref="imgUpload" 
    :limit="limit" 
    :multiple="multiple"></v-upload>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import imgUpload from '@/components/imgUpload'
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
      }
    },
    methods: {
      //返回
      headerLeft: function() {
        history.back()
      },
      headerRight() {
        this.$refs.imgUpload.uploadImg()
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