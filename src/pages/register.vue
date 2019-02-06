<template>
  <!-- <div class="top"> -->
  <div class="main">
    <!-- <span class="title">华农一屋</span> -->
    <v-header :headerMsg="headerMsg"></v-header>
    <el-row type="flex" justify="center">
    <el-col :xs="17" :sm="9" :md="7" :lg="5">
    <el-steps :active="active" finish-status="success" align-cente>
      <el-step title="用户信息"></el-step>
      <el-step title="实名认证"></el-step>
      <el-step title="提交成功"></el-step>
    </el-steps>
    </el-col>
    </el-row>

    <div class="step1" v-if="active === 0">
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-input 
        placeholder="请输入用户名" 
        prefix-icon="el-icon-service" 
        v-model="username"
        clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-input 
        placeholder="请输入邮箱" 
        prefix-icon="el-icon-message" 
        type="email" 
        v-model="email"
        clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-input 
        placeholder="请输入密码" 
        prefix-icon="el-icon-view" 
        v-model="password1"
        type="password"
        clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-input 
        placeholder="请再次输入密码" 
        prefix-icon="el-icon-view" 
        v-model="password2"
        type="password"
        clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-button 
        type="primary" 
        @click="next()"
        :disabled="!password1 || !username || !password2 || !email">下一步</el-button>
      </el-col>
    </el-row>
    </div>

    <div class="step2" v-if="active === 1">
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-input 
        placeholder="您的真实姓名" 
        prefix-icon="el-icon-service" 
        v-model="actualName"
        clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-input 
        placeholder="您的学号" 
        prefix-icon="el-icon-edit" 
        v-model="studentID"
        clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <span class="upload">请上传校园卡照片</span>
        <v-upload 
          ref="imgUpload" 
          :limit="limit" 
          :multiple="multiple"></v-upload>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-button 
        type="primary" 
        @click="register()"
        :disabled="!actualName || !studentID">提交</el-button>
      </el-col>
    </el-row>
    </div>

    <div class="step3" v-if="active === 3">
      <el-row type="flex" justify="center">
        <el-col :xs="17" :sm="9" :md="7" :lg="5">
          <span>提交成功！待您提交的信息审核通过后，我们会已邮件的形式通知您，请注意查收</span>
        </el-col>
      </el-row>
    </div>
    <v-loading :errorMsg="submitErrorMsg"></v-loading>
  </div>
<!-- </div> -->
</template>

<script>
  import imgUpload from '@/components/imgUpload'
  import myHeader from '@/components/header'
  import myLoading from '@/components/loading'
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  export default{
    name:'register',
    components: {
      'v-upload': imgUpload,
      'v-header': myHeader,
      'v-loading': myLoading,
    },
    data(){
      return{
        headerMsg: {
          centerWord: '注册',
          //这种绑定的图片只能放在static文件夹下
          leftImg: '/static/images/back.png',
        },
        actualName:'',
        studentID: '',
        username: '',
        password1:'',
        password2:'',
        email:'',
        limit:"1",
        multiple:false,
        imgsList:[],
        active: 0,
        submitErrorMsg: '提交失败',
      }
    },
    computed: {
      ...mapGetters([
        'errorRegister',
        'hasRegister',
        'imgName',
        'qiniuaddr',
        'publishState',
      ])
    },
    methods: {
      ...mapActions([
        'actionRegister'
      ]),
      ...mapMutations([
        'clearImgInfo',
        'notPublish',
        'publishing'
      ]),
      next() {
        this.active++
      },
      //注册前检查用户填写的信息
      checkMessage: function() {
        if(this.password1 != this.password2) {
          this.$message({
            message: '两次密码不一致',
            center: true,
            type: 'warning'
          });
          return false
        }
        return true
      },

      //注册
      register: function() {
        if (!this.checkMessage()) return
        //将发布状态设为发布中，开启加载界面
        this.publishing()
        this.$refs.imgUpload.uploadImg()
        setTimeout(() => {
          for(let key in this.imgName) {
              this.imgsList.push(`http://${this.qiniuaddr}/${this.imgName[key]}`)
          }
          let obj = {
            actual_name: this.actualName,
            student_id: this.studentID,
            username: this.username,
            email: this.email,
            password: this.password1,
            student_card_image_url: this.imgsList[0]
          }
          this.actionRegister(obj)
        },1000)
      },
      headerLeft: function() {        
        history.back()
      },
      //加载成功以后执行的操作，和loading组件配合使用
      afterLoading() {
        //清空存在vuex里的图片信息
        this.clearImgInfo()
        //将发布状态设为未发布状态
        this.notPublish()
      },
    },
    watch: {
      errorRegister() {
        if(this.errorRegister) {
          this.$message.error(this.errorRegister);
        }
      },
      hasRegister() {
        if(this.hasRegister) {
          this.active = 3
        }
      },
    }
  };
</script>

<style scoped>
.main {
  width: 100%;
}
.block {
  height: 50px;
}
.upload {
  color: rgb(0, 0, 0);
  font-size: 15px;
  float: left;
  margin-bottom: 5px;
}
.el-row {
  margin-top: 30px;
}
.title {
  color: #409EFF;
  font-size: 40px;
}
.el-button {
  width: 100%;
}
.remind {
  font-size: 15px;
  float: left;
 /* margin-top: 20px;*/
 color:#b22222;
}
.tips {
  margin-top: 20px
}
/*.el-step__title.is-process {
  font-weight: 300;
  color: #303133;
  font-size: 13px;
}
.el-step_icon {
  height: 20px;
  width: 20px;
}*/
</style>