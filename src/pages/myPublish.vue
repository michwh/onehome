<template>
  <div>
    <v-header :headerMsg="headerMsg"></v-header>
    <div class="lists" v-for="(list,index) in myPublishList">
      <v-list :list="list"></v-list>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/components/header'
  import list from '@/components/list'
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'myPublish',
    components: {
      'v-header': myHeader,
      'v-list': list,
    },
    data() {
      return {
        headerMsg: {
          centerWord: '我的发布',
          //这种绑定的图片只能放在static文件夹下
          leftImg: '/static/images/back.png',
        },
      }
    },
    created() {
      this.actionGetMyPublishList()
    },
    computed: {
      ...mapGetters([
        'myPublishList',
      ]),
    },
    methods: {
      ...mapActions([
        'actionGetMyPublishList'
      ]),
      headerLeft() {
        history.back()
      },
    },
  }
</script>

<style scoped></style>