<template>
  <swiper class="detail-swiper">
      <swiper-item v-for="item in topImages" >
        <img :src="item" alt="">
      </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper/index"
  export default {
    name: 'DetailSwiper',
    props:{
      topImages: {
        type: Array,
        defaul() {
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped="scoped">
  .detail-swiper {
    height: 50vh;
  }
</style>
