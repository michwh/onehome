<template>
  <div>
    <v-menu :activeIndex="menuIndex"></v-menu>
    <div class="lists" v-for="(list,index) in historyMsg">
      <v-chat-card :list="list"></v-chat-card>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import topMenu from '@/components/topMenu'
  import chatCard from '@/components/chatCard'
  export default{
    name:'message',
    components: {
      'v-chat-card': chatCard,
      'v-menu': topMenu,
    },
    data(){
      return{
        menuIndex: '3',
      }
    },
    computed: {
      ...mapGetters([
        'historyMsg'
      ]),
    },
  }
</script>