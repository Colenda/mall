<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
    class="tab-item"
    :class="{active: index === currentIndex}"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit("tabClick", index)
      }
    }
  }
</script>

<style scoped="scoped">
  .tab-control {
    display: flex;
    text-align: center;
    background-color: #fff;
    z-index: 9;
  }

  .tab-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    margin: 0 25px;
    margin-bottom: 5px;
  }

  .active {
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
  }




</style>
