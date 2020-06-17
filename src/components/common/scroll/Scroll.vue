<template>
  <div class="wrapper" ref="scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {

      //先创建scroll对象
      this.scroll = new BScroll(this.$refs.scroll, {
         click: true,
         probeType: this.probeType,
         pullUpLoad: this.pullUpLoad
      })

      //监听滚动位置并将位置传出
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })

      //监听上拉
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  }
</script>

<style>
</style>
