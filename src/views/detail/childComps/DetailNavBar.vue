<template>
  <div>
    <nav-bar>
      <!-- 左侧返回 -->
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <!-- 中间选项 -->
      <template v-slot:center>
        <div class="title">
          <div v-for="(item, index) in title" class="title-item" :class="{active: currentIndex === index}" @click="titleClick(index)">
            {{item}}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data() {
      return {
        title: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
        this.$emit("titleClick", index)
      },
      backClick() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped="scoped">
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: red
  }

  .back {
    text-align: center;
  }

  .back img {
    margin-top: 11px;
  }
</style>
