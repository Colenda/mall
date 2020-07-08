<template>
  <div class="cart">
    <nav-bar class="navbar">
      <template v-slot:center>购物车({{length}})</template>
    </nav-bar>

    <cart-list></cart-list>

    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped="scoped">
  .navbar {
    background-color: var(--color-tint);
    color: #FFF
  }

  .cart {
    height: 100vh;
  }
</style>
