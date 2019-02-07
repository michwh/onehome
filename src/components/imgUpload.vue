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
        //imgs:[],
        imgNum:0, //要上传的图片数量
        //listLength:0,
      }
    },
    computed: {
      ...mapGetters([
        'userinfo',
        //'publishToken',
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

      beforeUpload(param) {
        
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
        //this.imgNum++;
        let filetype = ''
        if (param.file.type === 'image/png') {
          filetype = 'png'
        } else {
          filetype = 'jpg'
        }
        const formdata = {
          filetype: filetype,
          param: param
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