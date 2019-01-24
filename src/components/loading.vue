<template>
  <div>
    {{monitorState}}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default{
    name:'loading',
    props:{
      successMsg: String,
      errorMsg: String,
    },
    data(){
      return{

      }
    },
    computed: {
      ...mapGetters([
        'publishState',
      ]),
      monitorState() {
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
            text: this.successMsg,
            spinner: 'el-icon-check',
          });
          setTimeout(() => {
            loading.close();
            //this.headerLeft()
            this.$parent.afterLoading()
          }, 1000);
        } else if(this.publishState == -1) {
          loading = this.$loading({});
          loading.close()
          loading = this.$loading({
            lock: true,
            background: 'rgba(0, 0, 0, 0.7)',
            text: this.errorMsg,
            spinner: 'el-icon-close',
          });
          setTimeout(() => {
            loading.close();
          }, 1000);
        }
      }
    }
  }
</script>

<style scoped>
  
</style>
