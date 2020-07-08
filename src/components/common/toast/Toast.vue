<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, time = 2000) {
        this.message = message
        this.isShow = true
        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, time);
      }
    }
  }
</script>

<style scoped="scoped">
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;

    z-index: 999;

    color: #FFF;
    background-color: rgba(0,0,0,0.5);
    white-space: nowrap;
    border-radius: 5px;
  }
</style>
