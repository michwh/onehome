<template>
  <div>
    <v-header :headerMsg="headerMsg"></v-header>
    <v-common-lists :lists="collectionList"></v-common-lists>
    <div class="block2"></div>
  </div>
</template>

<script>
  import commonLists from '@/components/commonLists'
  import myHeader from '@/components/header'
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'myCollection',
    components: {
      'v-header': myHeader,
      'v-common-lists': commonLists,
    },
    data() {
      return {
        headerMsg: {
          centerWord: '我的收藏',
          //这种绑定的图片只能放在static文件夹下
          leftImg: '/static/images/back.png',
        },
      }
    },
    created() {
      this.actionGetCollectionList()
    },
    computed: {
      ...mapGetters([
        'collectionList',
      ]),
    },
    methods: {
      ...mapActions([
        'actionGetCollectionList'
      ]),
      headerLeft() {
        history.back()
      },
    },
  }
</script>

<style scoped>
.block2 {
  height: 50px;
}
</style>