<template>
  <div class="main">
    <v-header :headerMsg="headerMsg"></v-header>
    <div class="block"></div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <input 
        type="text" 
        placeholder="请输入标题" 
        class="title" 
        v-model="title"></imput>
      </div>
      <textarea type="text" placeholder="内容描述..." v-model="descrition"></textarea>
      <!-- <div class="tao">
        <div class="images">
          <label class="add">
            <input 
            type="file" 
            accept="image/*" 
            multiple="multiple" 
            @change="handleFileChange">
          </label>
          <img :src="data" v-for="(data,index) in localImg" class="img-uploader-preview">
        </div>
      </div> -->
        <v-upload ref="imgUpload"></v-upload>
      </el-card>
    <div class="price">
      <span>价格：</span>
      <input type="number" placeholder="请输入价格" v-model="price"></imput>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import imgUpload from '@/components/imgUpload'
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  export default {
    name: 'publish',
    components: {
      'v-header': myHeader,
      'v-upload': imgUpload,
    },
    data() {
      return {
        headerMsg: {
          centerWord: '发布',
          //这种绑定的图片只能放在static文件夹下
          leftImg: '/static/images/back.png',
          rightImg: '/static/images/check.png',
        },
        // imageDataList: [], //要上传的图片的base64码
        // imagesNum:0, //要上传的图片的数量
        // localImg: [], //在前端展示的上传的图片
        price: '',
        descrition: '',
        title: '',
      }
    },
    computed: {
      
    },
    methods: {
      ...mapMutations ([
        'clearImgInfo',
      ]),
      //发布前的信息检查
      checkMessage() {
        if(!this.title || !this.descrition || !this.price) {
          this.$message({
            message: '信息填写不完整',
            center: true
          });
        }
      },

      //返回
      headerLeft: function() {
        //离开发布界面时清空准备上传图片的数组
        //this.clearImgInfo()
        history.back()
      },

      //发布
      headerRight() {
        //this.checkMessage()
        //上传商品图片
        this.$refs.imgUpload.uploadImg()
      },

      // handleFileChange: function(e) {
      //   const files = e.target.files;
      //   if (!files.length) return; 
      //   this.createImage(files);
      // },
      // createImage(file){
      //   if(typeof FileReader==='undefined'){
      //     console.log('您的浏览器不支持图片上传，请升级您的浏览器');
      //     return false;
      //   }
      //   var image = new Image();         
      //   var vm = this;
      //   var leng=file.length;
      //   for(var i=0;i<leng;i++){
      //     var reader = new FileReader();
      //     vm.localImg.push(window.URL.createObjectURL(file[i]))//在界面显示图片
      //     vm.imagesNum=vm.localImg.length
      //     reader.readAsDataURL(file[i])
      //     reader.onload =function(e){
      //       vm.imageDataList.push(e.target.result);
      //       vm.imagesNum=vm.imageDataList.length;                                    
      //     };                 
      //   }    
      // },
    }
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
