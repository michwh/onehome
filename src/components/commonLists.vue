<template>
  <div class="tao">
    <div class="lists" v-for="(list,index) in lists" style="width: 49%;">
      <v-common-list :list="list" :index="index"></v-common-list>
    </div>
  </div>
</template>

<script>
  import commonList from '@/components/commonList'
  export default{
    name:'commonLists',
    props:{
      lists: Object,
    },
    components: {
      'v-common-list': commonList,
    },
  }
</script>

<style scoped>
.tao {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 96%;
  margin: 0 auto;
}
</style>