<template>
  <Background v-model:snowStatus="show" />
  <div class="theme">
    <div class="ew-content-box">
      <div class="container">
        <ewFolderMenu @on-menu-click="onClick" v-click-outside:[outsideContainer]="clickoutside" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import Background from "./views/Background/Background.vue";
import { nextTick } from 'process';
export default {
  components: {
    Background
  },
  setup() {
    const state = reactive({
      show: false
    });
    const outsideContainer= ref('');
    const onClick =(status) => {
      console.log(status)
    }
    const clickoutside = () => {
      console.log('点击该元素之外的区域触发')
    }
    onMounted(() => {
      nextTick(() => {
        outsideContainer.value = document.querySelector('.container');
      })
    })
    return {
      ...toRefs(state),
      onClick,
      outsideContainer,
      clickoutside
    };
  },
};
</script>

<style lang="less">
.ew-content-box > .container{
  width: 500px;
  height: 500px;
}
 @import "./styles/app.less";
</style>