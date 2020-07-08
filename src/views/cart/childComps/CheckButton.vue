<template>
  <div class="check-button" :class="{checked:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props:{
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped="scoped">
  .check-button {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .check-button img{
    width: 12px;
    height: 12px;
    margin-left: 1px;
    margin-top: 1px;
  }
  .checked{
    border-color: var(--color-tint);
    background-color: var(--color-tint);
  }
</style>
