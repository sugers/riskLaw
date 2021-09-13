<template>
  <el-image-viewer
    v-if="visible"
    :on-close="closeViewer"
    :url-list="urlList"
    :z-index="zIndex"
  />
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  name: "Comimageviewer",
  components: {
    ElImageViewer,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    
    url: {
      type: [Array, String],
      default: () => [],
    },
    zIndex: {
      type: Number,
      default: 2000,
    },
  },
  data() {
    return {};
  },
  computed: {
    urlList() {
      let url = this.url;
      if (Array.isArray(url)) {
        let index = url[url.length - 1];
        // console.log(index);
        if (Number.isInteger(index)) {
          url.pop();
          return this.getPrivewImages(index, url);
        } else {
          return url;
        }
      } else {
        return [url];
      }
    },
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.stopMove();
          document.addEventListener("click", this.handleCliskMask, true);
        } else {
          this.move();
          document.removeEventListener("click", this.handleCliskMask, true);
        }
      },
      deep: true,
    },
  },
  methods: {
    closeViewer() {
      this.$emit("onClose");
      this.$emit("update:visible", false);
    },
    // 预览对应当前图片列表
    getPrivewImages(index, imgArr) {
      let tempImgList = imgArr;
      if (index == 0) return tempImgList;
      
        // 调整图片顺序，把当前图片放在第一位
        
        return tempImgList.slice(index).concat(tempImgList.slice(0, index));

    },
    // 禁止页面滚动
    stopMove() {
      let m = function (e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", m, { passive: false });
    },
    // 开启页面滚动
    move() {
      let m = function (e) {
        e.preventDefault();
      };
      document.body.style.overflow = "auto";
      document.removeEventListener("touchmove", m, { passive: true });
    },
    // 监听遮罩层
    handleCliskMask(e) {
      if (document.querySelector(".el-image-viewer__mask").contains(e.target)) {
        this.closeViewer();
      }
    },
  },
};
</script>
