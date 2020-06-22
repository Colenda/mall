import {debounce} from "common/utils.js"
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.scroll.refresh, 300)
    this.itemImgListener = () => {
      this.scroll && this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}
