<template>
  <div id="home">
    <nav-bar>
      <template v-slot:center>
        <div>香菇街</div>
      </template>
    </nav-bar>

    <home-swiper :banners="banners"></home-swiper>

    <recommend-view :recommends="recommends"></recommend-view>

    <feature-view></feature-view>

    <tab-control :titles="['流行','新款','精选']"
                 class="tab-control"
                 @tabClick="tabClick">
    </tab-control>

    <goods-list :goods="goods[type].list"></goods-list>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper.vue"
  import RecommendView from "./childComps/RecommendView.vue"
  import FeatureView from "./childComps/FeatureView.vue"

  import NavBar from "components/common/navbar/NavBar.vue"
  import TabControl from "components/content/tabControl/TabControl.vue"
  import GoodsList from "components/content/goods/GoodsList.vue"

  import {
    getHomeMultidata, getHomeGoods
  } from "network/home"

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        type: 'pop'
      }
    },
    created() {
      //请求多个数据
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell')
    },
    methods: {
      //事件监听方法
      tabClick(index) {
        switch(index) {
          case 0: this.type = 'pop';
                  break;
          case 1: this.type = 'new';
                  break;
          case 2: this.type = 'sell'
        }
      },

      //网络请求方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          console.log("首页展示数据如下：");
          console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
    }
  }
</script>

<style>
  #home {
    padding-top: 44px;
    padding-bottom: 100px;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #FFFFFF;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px
  }
</style>
