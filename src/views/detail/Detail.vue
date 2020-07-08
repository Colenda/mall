<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probeType="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <!-- 下面是返回顶部按钮 -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>

</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"
  import Scroll from "components/common/scroll/Scroll.vue"
  import GoodsList from "../../components/content/goods/GoodsList"
  import BackTop from "components/content/backTop/BackTop.vue"

  import {
    getDetail,
    getRecommend,
    Goods,
    Shop,
    GoodsParam
  } from "network/detail"
  import {itemListenerMixin} from "common/mixin"
  import {debounce} from "common/utils"

  import {mapActions} from "vuex"
  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      BackTop
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        isShow: false
      }
    },
    created() {
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        //1.获取顶部的轮播数据
        this.topImages = res.result.itemInfo.topImages
        //2.获取商品信息
        const result = res.result
        this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo.services)
        //3.获取店铺信息
        this.shop = new Shop(result.shopInfo)
        //4.商品详情
        this.detailInfo = result.detailInfo
        //5.商品参数
        this.paramInfo = new GoodsParam(result.itemParams.info, result.itemParams.rule)
        //6.评论信息
        if(result.rate.cRate !== 0) {
          this.commentInfo = result.rate.list[0]
        }
      })
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 300)
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']),
      detailImageLoad() {
        this.scroll && this.refresh();
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 600)
      },
      contentScroll(position) {
        this._listenScrollTheme(-position.y)
        this.isShow = -position.y > 1000
      },
      _listenScrollTheme(position){
        let length = this.themeTopYs.length;
        for (let i = 0; i < length; i++) {
          let iPos = this.themeTopYs[i];
          if (position >= iPos && position < this.themeTopYs[i+1]) {
            if (this.currentIndex !== i) {
              this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex
            }
            break;
          }
        }
      },
      backClick() {
        this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      },
      addToCart() {
        //获取购物车需要展示的商品信息
        const product = {}
        product.img = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        //添加商品到购物车

        this.addCart(product).then(res => {
          this.$toast.show(res, 2000)
        })
      }
    }
  }
</script>

<style scoped="scoped">
  #detail {
    position: relative;
    z-index: 9;
    background-color: #FFFFFF;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    background-color: #fff;
    z-index: 9;
  }

  .content {
    height: calc(100% - 100px);
  }
</style>
