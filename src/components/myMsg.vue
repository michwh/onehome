<template>
    <div class="item-right">
        <div class="name-right">
            <span>{{ mytime }}</span>
        </div>
        <img :src="avatar" alt="" class="avatar-right">
        <span v-if="msg">
            {{ msg }}
        </span>
    </div>
</template>

<script>
//import dateFormat from '../utils/date'
export default {
  props: ['msg', 'mytime', 'avatar'],
  computed: {
    
  }
}
</script>

<style scoped>
.item-right {
    /*margin-top: 10px;*/
    position: relative;
    clear: both;
    display: inline-block;
    padding: 16px 15px 16px 15px;
    margin: 30px 5px 10px 20px;
    border-radius: 10px;
    background-color: #ADD8E6;
    animation: show-chat-odd 0.25s 1 ease-in;
    -moz-animation: show-chat-odd 0.25s 1 ease-in;
    -webkit-animation: show-chat-odd 0.25s 1 ease-in;
    float: right;
    margin-right: 80px;
    color: #000000;
    font-weight: bold;
    text-align: left;
}
.item-right ::after {
    position: absolute;
    top: 15px;
    content: '';
    width: 0;
    height: 0;
    border-top: 15px solid  #ADD8E6;
    border-right: 15px solid transparent;
    right: -15px;
}
.img-right {
    max-width: 200px;
}
span {
    word-break: break-all;
}
.time-right {
    position: absolute;
    top: -40px;
    width: 200px;
    height: 20px;
    right: -70px;
    text-align: right;
}
.name-right {
    position: absolute;
    top: -20px;
    width: 280px;
    height: 20px;
    right: -70px;
    text-align: right;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: lighter;
}
.avatar-right {
    position: absolute;
    top: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    right: -70px;
}
@keyframes show-chat-odd {
0% {
    margin-right: -480px;
}

100% {
    margin-right: 0;
}
}

@-moz-keyframes show-chat-odd {
    0% {
        margin-right: -480px;
    }

    100% {
        margin-right: 0;
    }
}

@-webkit-keyframes show-chat-odd {
    0% {
        margin-right: -480px;
    }

    100% {
        margin-right: 0;
    }
}
</style>
