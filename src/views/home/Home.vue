<template>
  <div id="home">
    <nav-bar><template v-slot:center><div>香菇街</div></template></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed">
    </tab-control>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad.once="swiperImageLoad"></home-swiper>

      <recommend-view :recommends="recommends"></recommend-view>

      <feature-view></feature-view>

      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2">
      </tab-control>

      <goods-list :goods="goods[type].list"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper.vue"
  import RecommendView from "./childComps/RecommendView.vue"
  import FeatureView from "./childComps/FeatureView.vue"

  import NavBar from "components/common/navbar/NavBar.vue"
  import TabControl from "components/content/tabControl/TabControl.vue"
  import GoodsList from "components/content/goods/GoodsList.vue"
  import Scroll from "components/common/scroll/Scroll.vue"
  import BackTop from "components/content/backTop/BackTop.vue"

  import {
    getHomeMultidata, getHomeGoods
  } from "network/home"
  import {itemListenerMixin} from "common/mixin"

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        type: 'pop',
        isShow: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    created() {
      //请求多个数据
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');


    },
    mounted() {
    },
    activated() {
      this.$refs.scroll.scroll.scrollTo(0, this.saveY)
      this.$refs.scroll.scroll.refresh()
    },
    deactivated() {
      //离开时保存Y值
      this.saveY = this.$refs.scroll.scroll.y
      //离开时取消全局事件监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    methods: {
      //事件监听方法
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      tabClick(index) {
        switch(index) {
          case 0: this.type = 'pop';
                  break;
          case 1: this.type = 'new';
                  break;
          case 2: this.type = 'sell'
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      backClick() {
        this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      },

      contentScroll(position) {
        //决定回到顶部按钮是否显示
        this.isShow = -position.y > 1000
        //决定tabcontrol是否吸顶
        this.isTabFixed = -position.y > this.tabOffsetTop
      },

      loadMore() {
        this.getHomeGoods(this.type)
        this.$refs.scroll.scroll.refresh()
      },
      //网络请求方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          //重置上拉
          this.$refs.scroll.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped="scoped">
  #home {
    /* padding-top: 44px; */
    /* padding-bottom: 100px; */
    height: 100vh;
    position: relative;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #FFFFFF;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
</style>
