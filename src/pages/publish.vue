<template>
  <div class="main">
    <v-header :headerMsg="headerMsg"></v-header>{{watchPublishState}}
    <!-- <div class="block"></div> -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <input 
        type="text" 
        placeholder="请输入标题" 
        class="title" 
        v-model="title"></imput>
      </div>
      <textarea type="text" placeholder="内容描述..." v-model="description"></textarea>
        <v-upload 
        ref="imgUpload" 
        :limit="limit" 
        :multiple="multiple"></v-upload>
      </el-card>
    <div class="price">
      <span>价格：</span>
      <input type="number" placeholder="请输入价格" v-model="price"></imput>
    </div>
    <div class="block"></div>
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
        limit:"4",
        multiple:true,
        price: '',
        description: '',
        title: '',
        imgsList:[],
        img1:null, //如果这里初始化为字符串类型，发给后端时格式会不正确
        img2:null,
        img3:null,
        img4:null
      }
    },
    computed: {
      ...mapGetters([
        'imgName',
        'userinfo',
        'publishState',
        'qiniuaddr',
      ]),
      //监听发布状态
      watchPublishState() {
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
            text: '发布成功',
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
            text: '发布失败',
            spinner: 'el-icon-close',
          });
          setTimeout(() => {
            loading.close();
          }, 1000);
        }
      }
    },
    methods: {
      ...mapMutations([
        'clearImgInfo',
        'notPublish',
        'publishing'
      ]),
      ...mapActions([
        'actionPublish'
      ]),
      //发布前的信息检查
      checkMessage() {
        if(!this.title || !this.description || !this.price) {
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
        //离开界面之前清空存在vuex里的图片信息
        this.clearImgInfo()
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
          setTimeout(() => {
            for(let key in this.imgName) {
              this.imgsList.push(`http://${this.qiniuaddr}/${this.imgName[key]}`)
            }
            switch(this.imgsList.length) {
              case 4:
                this.img4 = this.imgsList[3]
              case 3:
                this.img3 = this.imgsList[2]
              case 2:
                this.img2 = this.imgsList[1]
              case 1:
                this.img1 = this.imgsList[0]
            }
            let obj = {
              username: this.userinfo.username,
              goods_price: this.price,
              title: this.title,
              description: this.description,
              goods_img1: this.img1,
              goods_img2:this.img2,
              goods_img3:this.img3,
              goods_img4:this.img4
            }
            //console.log(obj)
            this.actionPublish(obj)
          },1000)
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
