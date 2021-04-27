<template>
  <Background v-model:snowStatus="show" />
  <div class="theme">
    <div class="ew-content-box">
      <Markdown :code="code" />
      <ew-color-picker wrapper="#test"/>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import Background from "./views/Background/Background.vue";
import Markdown from "./components/Markdown.vue";
import htmlCode1 from "./doc/HTML/html-1.md";
export default {
  components: {
    Background,
    Markdown,
  },
  setup() {
    const state = reactive({
      show: false,
      code: htmlCode1,
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less">
@import "./styles/app.less";
</style>