<template>
  <div>
  <el-upload
  :action= domain
  ref="upload"
  accept='image/jpeg,image/gif,image/png'
  :auto-upload="false"
  :http-request="upqiniu"
  :limit="limit"
  :multiple="multiple"
  list-type="picture-card"
  :before-upload="beforeUpload"
  :on-preview="handlePictureCardPreview"
  :on-change="handldChange"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i><!-- {{showButton}} -->
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
      limit: String,
      multiple: Boolean,
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        // domain: 'http://upload-z2.qiniup.com', //上传地址
        // qiniuaddr: 'pgo41om5x.bkt.clouddn.com',
        imgs:[],
        imgNum:0, //要上传的图片数量
        listLength:0,
      }
    },
    computed: {
      ...mapGetters([
        'userinfo',
        'publishToken',
        'imgName',
        'qiniuaddr',
        'domain'
      ]),
    },
    computed: {
      // showButton() {
      //   const el = document.getElementsByClassName('el-upload')
      //   if(this.listLength < this.limit - 0) {
      //     el.style.display = 'inline-block'
      //   } else {
      //     el.style.display = 'none'
      //   }
      // }
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
      getToken(filetype) {
        let formdata = new FormData()
        formdata.append('filetype', filetype)
        formdata.append('username', this.userinfo.username)
        //生成随机字符串和生成的token进行绑定，以便知道每个upqiniu()上传的是哪张图片
        const timestamp = Math.random().toString(36).substring(2)
        formdata.append('timestamp', timestamp)
        this.actionGetUploadToken(formdata)
        return timestamp
      },

      beforeUpload(param) {
        
      },

      handldChange(file, fileList) {
        this.listLength = fileList.length
        const el = document.getElementsByClassName('el-upload')[0]
        if(this.listLength < this.limit - 0) {
          el.style.display = 'inline-block'
        } else {
          el.style.display = 'none'
        }
      },

      //上传图片至七牛
      upqiniu(param) {
        this.imgNum++;
        let filetype = ''
        if (param.file.type === 'image/png') {
          filetype = 'png'
        } else {
          filetype = 'jpg'
        }
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
            
          },
          error(err){
            console.log(`图片上传错误信息：${err.message}`)
          }, 
          complete(res){
            console.log(`图片上传成功：${res.key}`)
          }
        }
        const timestamp = this.getToken(filetype)
        setTimeout(() => {
          //console.log(JSON.stringify(this.imgName))
          var observable = qiniu.upload(param.file, this.imgName[timestamp], this.publishToken[timestamp], putExtra, config)
          var subscription = observable.subscribe(observer) // 上传开始
        },1000)
        
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