<template>
  <div class="main">
    <span class="title">华农一屋</span>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-input 
        placeholder="请输入您的真实姓名" 
        prefix-icon="el-icon-service" 
        v-model="actualName"
        clearable></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <el-input 
        placeholder="请输入您的学号" 
        prefix-icon="el-icon-service" 
        v-model="studentID"
        clearable></el-input>
      </el-col>
    </el-row>
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
        <span style="color: #000000; font-size: 16px; float: left;">请上传校园卡照片</span>
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
        :disabled="!password1 || !username || !password2 || !email">注册</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" class="tips">
      <el-col :xs="17" :sm="9" :md="7" :lg="5">
        <router-link to="/" >
          <span class="remind">已有账号，去登录</span>
        </router-link>
      </el-col>
    </el-row>
    <div class="block"></div>
  </div>
</template>

<script>
  import imgUpload from '@/components/imgUpload'
  import { mapGetters, mapActions } from 'vuex';
  export default{
    name:'register',
    components: {
      'v-upload': imgUpload,
    },
    data(){
      return{
        actualName:'',
        studentID: '',
        username: '',
        password1:'',
        password2:'',
        email:'',
        limit:"1",
        multiple:false,
        imgsList:[],
      }
    },
    computed: {
      ...mapGetters([
        'errorRegister',
        'hasRegister',
        'imgName',
        'qiniuaddr',
      ])
    },
    methods: {
      ...mapActions([
        'actionRegister'
      ]),
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
      }
    },
    watch: {
      errorRegister() {
        if(this.errorRegister) {
          this.$message.error(this.errorRegister);
        }
      },
      hasRegister() {
        if(this.hasRegister) {
          // this.$message({
          //   message: `注册成功，3秒后返回登录界面`,
          //   center: true,
          //   type: 'success'
          // });
          this.$alert('待您提交的信息审核通过后，我们会已邮件的形式通知您，请注意查收', '注册成功！', {
            confirmButtonText: '确定'
          })
          this.$router.push('/');
        }
      }
    }
  };
</script>

<style scoped>
.main {
  background-size: cover;
  background-image: url('../assets/images/background5.jpg');
  width: 100%;
}
.block {
  height: 50px;
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
</style>