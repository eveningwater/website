<template>
  <div
    class="ew-to-top"
    :class="visible ? 'show' : 'hidden'"
    :style="{ right: styleRight, bottom: styleBottom }"
    @click="onHandle"
  >
    <slot>
      <img src="../assets/top/ico-to-top.svg" alt="图片加载中" />
    </slot>
  </div>
</template>

<script lang="ts">
import {
  computed,
  onBeforeMount,
  onMounted,
  PropType,
  reactive,
  ref,
  toRefs,
} from "vue";
import util from "../util/util";
export default {
  name: "ToTop",
  props: {
    target: String as PropType<string>,
    right: {
      type: Number as PropType<number>,
      default: 15,
    },
    bottom: {
      type: Number as PropType<number>,
      default: 28,
    },
    visibilityHeight: {
      type: Number as PropType<number>,
      default: 200,
    },
  },
  setup(props, ctx) {
    const state = reactive({
      visible: false,
    });
    const styleRight = computed(() => `${props.right}px`);
    const styleBottom = computed(() => `${props.bottom}px`);
    const el = ref(null);
    const container = ref(null);
    const scrollHandler = () => {
      state.visible = el.value.scrollTop >= props.visibilityHeight;
    };

    const scrollTop = (time: number) => {
      const beginTime = Date.now();
      const beginValue = el.value.scrollTop;
      const handler = () => {
        const progress = (Date.now() - beginTime) / time;
        if (progress < 1) {
          el.value.scrollTop = beginValue * (1 - util.easeInOutCubic(progress));
          util.requestAnimationFrame(handler);
        } else {
          el.value.scrollTop = 0;
        }
      };
      util.requestAnimationFrame(handler);
    };
    onMounted(() => {
      container.value = document;
      el.value = document.documentElement || document.body;
      if (props.target) {
        el.value = document.querySelector(props.target);
        if (!el.value) {
          throw new Error(`Can not find the target element:${props.target}`);
        }
        container.value = el.value;
      }
      util.on(container.value, "scroll", util.debounce(scrollHandler, 300));
    });
    const onHandle = () => {
      scrollTop(500);
      ctx.emit("on-top");
    };
    onBeforeMount(() =>
      util.off(container.value, "scroll", util.debounce(scrollHandler, 300))
    );
    return {
      ...toRefs(state),
      el,
      container,
      styleRight,
      styleBottom,
      onHandle,
    };
  },
};
</script>

<style lang="less" scoped>
.ew-to-top {
  position: fixed;
  z-index: 1000;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
  img {
    width: 100%;
    height: 100%;
  }
  &.show {
    width: 45px;
    height: 45px;
  }
  &.hidden {
    width: 0;
    height: 0;
  }
  &:hover,
  &:active {
    opacity: 0.8;
  }
}
</style>