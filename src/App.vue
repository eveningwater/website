<template>
  <Background v-model:snowStatus="show" />
  <div class="theme">
    <div class="ew-content-box">
      <ew-tooltip text="测试内容" trigger="click">
        <button>测试</button>
      </ew-tooltip>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import Background from "./views/Background/Background.vue";
export default {
  components: {
    Background
  },
  setup() {
    const state = reactive({
      show: false
    });
    return {
      ...toRefs(state)
    };
  },
};
</script>

<style lang="less">
 @import "./styles/app.less";
</style>