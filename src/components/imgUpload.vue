<template>
  <div>
  <el-upload
  :action= domain
  ref="upload"
  accept='image/jpeg,image/gif,image/png'
  :auto-upload="false"
  :http-request="upqiniu"
  :limit="3"
  multiple
  list-type="picture-card"
  :before-upload="beforeUpload"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>

<script>
  import * as qiniu from 'qiniu-js'
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  import { usersApi, productApi } from '../api'
  export default {
    name: 'imgUpload',
    props:{
      
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        domain: 'http://upload-z2.qiniup.com', //上传地址
        qiniuaddr: 'pgo41om5x.bkt.clouddn.com',
      }
    },
    computed: {
      ...mapGetters([
        'userinfo',
        'publishToken',
        'imgName',
      ])
    },
    methods: {
      ...mapActions([
        'actionGetUploadToken',
      ]),
      //上传
      uploadImg() {
        this.$refs.upload.submit()
      },

      //获取token
      async getToken(filetype) {
        alert(1)
        let formdata = new FormData()
        formdata.append('filetype', filetype)
        formdata.append('username', this.userinfo.username)
        //生成随机字符串和生成的token进行绑定，以便知道每个upqiniu()上传的是哪张图片
        const timestamp = Math.random().toString(36).substring(2)
        formdata.append('timestamp', timestamp)
        alert(2)
        await this.actionGetUploadToken(formdata)
        return timestamp
      },

      beforeUpload(param) {
        
      },

      //上传图片至七牛
      upqiniu(param) {
        let filetype = ''
        if (param.file.type === 'image/png') {
          filetype = 'png'
        } else {
          filetype = 'jpg'
        }
        const timestamp = this.getToken(filetype)
        alert(7)
        const config = {
          useCdnDomain: true,
          region: qiniu.region.z2
        }
        var putExtra = {
          fname: param.file.name,
          params: {},
          mimeType: ["image/png", "image/jpeg", "image/gif"]
        };
        var observer = {
          next(res){
            // ...
          },
          error(err){
            console.log(`图片上传错误信息：${err.message}`)
          }, 
          complete(res){
            console.log(`图片上传成功：${res}`)
          }
        }
        console.log(JSON.stringify(this.imgName))
        console.log(`时间戳为${timestamp}的图片名：${this.imgName[timestamp]}`)
        var observable = qiniu.upload(param.file, this.imgName[timestamp], this.publishToken[timestamp], putExtra, config)
        var subscription = observable.subscribe(observer) // 上传开始
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    }
  }
</script>

<style scoped>

</style>