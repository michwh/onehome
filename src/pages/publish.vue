<template>
  <div class="main">
    <v-header :headerMsg="headerMsg"></v-header><!-- {{watchPublishState}} -->
    <!-- <div class="block"></div> -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <input 
        type="text" 
        placeholder="请输入标题" 
        class="title" 
        v-model="title">
      </div>
      <textarea type="text" placeholder="内容描述..." v-model="description"></textarea>
        <v-upload 
        ref="imgUpload"
        :limit="limit" 
        :multiple="multiple"></v-upload>{{watchImgState}}
      </el-card>
    <div class="price">
      <span>价格：</span>
      <input type="number" placeholder="请输入价格" v-model="price"></imput>
    </div>
    <div class="block"></div>
    <v-load :successMsg="uploadSuccesMsg" :errorMsg="uploadErrorMsg"></v-load>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import imgUpload from '@/components/imgUpload'
  import myLoading from '@/components/loading'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    name: 'publish',
    components: {
      'v-header': myHeader,
      'v-upload': imgUpload,
      'v-load': myLoading
    },
    data() {
      return {
        headerMsg: {
          centerWord: '发布',
          //这种绑定的图片只能放在static文件夹下
          leftImg: '/static/images/back.png',
          rightImg: '/static/images/check.png',
        },
        //限制上传图片的数量
        limit:"4",
        //是否需要上传多张图片
        multiple:true,
        price: '',
        description: '',
        title: '',
        imgsList:[],
        img1:null, //如果这里初始化为字符串类型，发给后端时格式会不正确
        img2:null,
        img3:null,
        img4:null,
        uploadSuccesMsg:'发布成功',
        uploadErrorMsg:'发布失败',
      }
    },
    computed: {
      ...mapGetters([
        'imgName',
        'userinfo',
        'publishState',
        'qiniuaddr',
        'allImgUploadState',
        //'imgWidthHeight',
      ]),
      watchImgState() {
        if(this.allImgUploadState === 1) {
          // this.imgsList = this.imgName.map(key => `http://${this.qiniuaddr}/${key}`)
            switch(this.imgName.length) {
              case 4:
                this.img4 = this.imgName[3].split('||')[0]
              case 3:
                this.img3 = this.imgName[2].split('||')[0]
              case 2:
                this.img2 = this.imgName[1].split('||')[0]
              case 1:
                this.img1 = this.imgName[0].split('||')[0]
            }
            //console.log(this.imgWidthHeight)
            let obj = {
              username: this.userinfo.username,
              goods_price: this.price,
              title: this.title,
              description: this.description,
              goods_img1: this.img1,
              goods_img2: this.img2,
              goods_img3: this.img3,
              goods_img4: this.img4,
              first_img_width_height: this.imgName[0].split('||')[1]
            }
            this.actionPublish(obj)
        } else if(this.allImgUploadState === -1) {
          this.actionPublishError()
        }
      }
    },
    methods: {
      ...mapMutations([
        //'clearImgInfo',
        'notPublish',
        'publishing'
      ]),
      ...mapActions([
        'actionPublish',
        'actionClearImgInfo',
        'actionPublishError',
      ]),
      //发布前的信息检查
      checkMessage() {
        if(!this.title || !this.description || !this.price || !this.imgName) {
          this.$message({
            message: '信息填写不完整',
            center: true
          });
          return 0
        } else if(this.title.length>40 || this.description.length>300 || this.price.length>8) {
          this.$message({
            message: '填写的信息过长',
            center: true
          });
          return 0
        } else {
          return 1
        }
      },

      //返回
      headerLeft: function() {
        history.back()
      },

      //加载成功以后执行的操作
      afterLoading() {
        //离开界面之前清空存在vuex里的图片信息
        this.actionClearImgInfo()
        //将发布状态设为未发布状态
        this.notPublish()
        history.back()
      },

      //发布
      headerRight() {
        if(this.checkMessage()) {
          //将发布状态设为发布中，开启加载界面
          this.publishing()
          //上传商品图片
          this.$refs.imgUpload.uploadImg()
        }
      },
    },   
  }
</script>

<style scoped>
.block {
  height: 50px;
}
.box-card {
  width: 97%;
  height: auto;
  margin: 0 auto;
}
.title {
  border: 0;
  outline: none;
  width: 100%;
  font-size: 17px;
}
textarea{
  width: 100%;
  height: 100px;
  font-size: 16px;
  border: none;
  outline:none;
  /*border-bottom: 1px solid #e5e5e5;*/
}
.price {
  width: 97%;
  margin: 0 auto;
  margin-top: 10px;
  height: 35px;
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  font-size: 17px;
  line-height: 35px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.price input{
  border: 0;
  outline: none;
  width: 75%;
  font-size: 17px;
}
.add {
  display: inline-block;
    background-image: url('../assets/images/add2.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 66px;
    height: 66px;
    width: 66px;
   /* border: 1px solid black;*/
    float: left;
   /* border: 0;*/
    background-color: #ffffff;
    margin: 0;
}
.add input[type="file"] {
  display: none;
}
.img-uploader-preview {
  height: 65px;
  width: 65px;
  float: left;
  margin: 0;
  margin-left: 2px;
}
.tao {
  height: 65px;
  overflow-x: scroll;
}
.images {
    /*height: 100%;*/
    /*white-space: nowrap;*/
    display: inline-flex;
    float: left;
  }
</style>
