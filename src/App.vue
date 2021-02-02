<template>
  <Background v-model:snowStatus="show" />
  <div class="theme">
    <div class="ew-content-box">
      <ewFolderMenu @on-menu-click="onClick" />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import Background from "./views/Background/Background.vue";
export default {
  components: {
    Background
  },
  setup() {
    const state = reactive({
      show: false
    });
    const onClick =(status) => {
      console.log(status)
    }
    return {
      ...toRefs(state),
      onClick
    };
  },
};
</script>

<style lang="less">
 @import "./styles/app.less";
</style>