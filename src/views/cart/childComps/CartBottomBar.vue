<template>
  <div class="cart-bar">
    <div class="select-all">
      <check-button class="button" :is-checked="isSeleceAll" @click.native="goSelectAll"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计： {{totalPrice}}
    </div>

    <div class="calculate" @click="checkClick">
      去计算：{{checkedLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton"

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '¥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkedLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSeleceAll() {
        if(this.$store.state.cartList.length === 0) return false
        return !(this.$store.state.cartList.filter(item => !item.checked).length)
      }
    },
    methods:{
      goSelectAll() {
        if(this.isSeleceAll) {
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else{
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
			checkClick() {
				if(!this.$store.state.cartList.filter(item => item.checked).length) {
					this.$toast.show("请先选择商品")
				}
			}
    }
  }
</script>

<style scoped="scoped">
  .cart-bar {
    background-color: #eee;
    height: 40px;
    width: 100%;
    position: relative;
    padding-left: 5px;
    display: flex;
  }

  .cart-bar span {
    line-height: 40px;
    margin-left: 10px;
  }

  .select-all {
    display: flex;
  }

  .button {
    margin-top: 11px;
  }

  .price {
    margin-left: 20px;
    line-height: 40px;
  }

  .calculate {
    line-height: 40px;
    position: absolute;
    left: 230px;
    width: 90px;
    background-color: var(--color-high-text);
    text-align: center;
    color: #fff;
  }
</style>
