<template>
  <div>
  <el-upload
  :action= domain
  ref="upload"
  accept='image/jpeg,image/png'
  :auto-upload="false"
  :http-request="upqiniu"
  :limit="limit"
  :multiple="multiple"
  list-type="picture-card"
  :before-upload="beforeUpload"
  :on-preview="handlePictureCardPreview"
  :on-change="handldChange"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>{{watchUploadState}}
  </el-upload>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>

<script>
  //import * as qiniu from 'qiniu-js'
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
        imgNum:0, //要上传的图片数量
        imgQuality: 0.5, //压缩图片的质量
        imgWidthHeight: '', //图片的宽度和高度
      }
    },
    computed: {
      ...mapGetters([
        'userinfo',
        'imgName',
        'qiniuaddr',
        'domain',
      ]),
      watchUploadState() {
        if(this.imgNum === this.imgName.length && this.imgNum !== 0) {
          this.actionUploadSuccess()
        }
      }
      
    },
    methods: {
      ...mapActions([
        'actionGetUploadToken',
        'actionUploadSuccess'
      ]),
      //上传
      uploadImg() {
        this.$refs.upload.submit()
      },

      dataURItoBlob(dataURI, type) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: type});
      },

      beforeUpload(param) {
        //对图片进行压缩
        const imgSize = param.size / 1024 / 1024
        const _this = this
        if(imgSize > 1) {
          return new Promise(resolve => {
            const reader = new FileReader()
            const image = new Image()
            image.onload = (imageEvent) => {
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              const width = image.width * _this.imgQuality
              const height = image.height * _this.imgQuality
              _this.imgWidthHeight = `${width}/${height}`
              //console.log(`图片上传前，压缩：${_this.imgWidthHeight}`)
              canvas.width = width;
              canvas.height = height;
              context.clearRect(0, 0, width, height);
              context.drawImage(image, 0, 0, width, height);
              const dataUrl = canvas.toDataURL(param.type);
              const blobData = _this.dataURItoBlob(dataUrl, param.type);
              resolve(blobData)
            }
            reader.onload = (e => { image.src = e.target.result; });
            reader.readAsDataURL(param);
          })
        } else {
          return new Promise(resolve => {
            const reader = new FileReader()
            const image = new Image()
            image.onload = (imageEvent) => {
              const width = image.width
              const height = image.height
              _this.imgWidthHeight = `${width}/${height}`
              //console.log(`图片上传前，不需要压缩：${_this.imgWidthHeight}`)
              resolve()
            }
            reader.onload = (e => { image.src = e.target.result; });
            reader.readAsDataURL(param)
          })
        }
      },

      handldChange(file, fileList) {
        this.imgNum = fileList.length
        const el = document.getElementsByClassName('el-upload')[0]
        if(fileList.length >= this.limit - 0) {
          el.style.display = 'none'
        }
      },

      //上传图片至七牛
      upqiniu(param) {
        let filetype = ''
        if (param.file.type === 'image/png') {
          filetype = 'png'
        } else {
          filetype = 'jpg'
        }
        //console.log(`上传方法里面：${this.imgWidthHeight}`)
        const formdata = {
          filetype: filetype,
          param: param,
          imgWidthHeight: this.imgWidthHeight
        }
        this.actionGetUploadToken(formdata)        
      },

      handleRemove(file, fileList) {
        this.imgNum = fileList.length
        const el = document.getElementsByClassName('el-upload')[0]
        if(fileList.length < this.limit - 0) {
          el.style.display = 'inline-block'
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      
    }
  }
</script>

<style>
.el-upload-list__item {
  width: 130px !important;
  height: 130px !important;
}
.el-upload--picture-card {
  width: 130px !important;
  height: 130px !important;
  margin: 0 8px 8px 0;
  line-height: 130px !important;
}
.el-dialog {
  width: 100% !important;
}
.el-dialog__body {
  padding: 20px 20px !important;
}
</style>