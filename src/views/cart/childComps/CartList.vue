<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <div>
        <cart-list-item
          v-for="(item,index) in cartList"
          :item-info="item">{{item}}
          :key="index"
        </cart-list-item>
      </div>
    </scroll>
  </div>

</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'CartList',
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    created() {
      
    }
  }
</script>

<style scoped="scoped">
  .content {
    height: 100%;
    overflow: hidden;
  }

  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }
</style>
