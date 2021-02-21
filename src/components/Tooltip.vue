<template>
  <div
    class="ew-tooltip-container"
    v-click-outside="onClickOutSide"
    :style="styleObject"
  >
    <slot></slot>
    <div
      class="ew-tooltip"
      :class="'ew-tooltip-' + theme"
      v-if="visible"
      :style="toolTipStyleObject"
    >
      <slot name="content">{{ content }}</slot>
      <div class="ew-tooltip-arrow" :class="'ew-tooltip-arrow-' + arrow"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, PropType, reactive, ref, toRefs, nextTick } from "vue";
import util from "../util/util";
export default {
  name: "Tooltip",
  props: {
    theme: {
      type: String as PropType<string>,
      default: "light",
      validator: (value: string) => ["dark", "light"].indexOf(value) > -1,
    },
    place: {
      type: String as PropType<string>,
      default: "right",
    },
    text: {
      type: String as PropType<string>,
      default: "",
    },
    trigger: {
      type: String as PropType<string>,
      default: "hover",
      validator: (value: string) =>
        ["hover", "click", "focus", "manual"].indexOf(value) > -1,
    },
    visible: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, ctx) {
    const arrow = ref("");
    const content = ref("");
    const theme = ref("");
    const visible = ref(false);
    const state = reactive({
      styleObject: {
        maxWidth: null,
      },
      toolTipStyleObject: {
        left: null,
        top: null,
      },
    });
    if (props.place) arrow.value = props.place;
    if (props.text) content.value = props.text;
    if (props.theme) theme.value = props.theme;
    if (props.visible) visible.value = props.visible;
    const onClickOutSide = () => {
      if (props.trigger === "click" || props.trigger === "focus") {
        visible.value = false;
      }
    };
    onMounted(() => {
      if (!ctx.slots.default) {
        throw new Error(
          "You need an element that triggers the display of the tooltip component!"
        );
        return;
      }
      const triggerElements = ctx.slots.default();
      const setStyle = (item) => {
        const rect = item.el.getBoundingClientRect();
        const left = rect.left + parseInt(rect.width) + 8;
        nextTick(() => {
          const tooltip = item.el.nextElementSibling;
          if (!tooltip) return;
          const tooltipRect = tooltip.getBoundingClientRect();
          const setTop = () => {
            tooltip.style.top = rect.top + parseInt(rect.height) + 5 - parseInt(tooltipRect.height) + "px";
            tooltip.style.left = left + "px";
          }
          setTop();
        });
      };
      if (props.visible) {
        ctx.emit("update:visible", props.visible);
      }
      triggerElements.forEach(item => {
        if (props.trigger === "manual") return;
        if (props.trigger === "hover") {
          util.on(item.el, "mouseenter", () => {
            visible.value = true;
            setStyle(item);
          });
          util.on(item.el, "mouseleave", () => {
            visible.value = false;
          });
        } else {
          util.on(item.el, props.trigger, () => {
            visible.value = !visible.value;
            setStyle(item);
          });
        }
      });
    });
    return {
      arrow,
      content,
      theme,
      visible,
      onClickOutSide,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less">
@borderDarkColor: #232525;
@borderLightColor: #a9a9aa;
@borderLightAfterColor: #fefaf2;
@darkFontColor: #fff;
@lightFontColor: #535353;
.ew-tooltip-container {
  padding: 10px;
  .ew-tooltip {
    border-radius: 4px;
    z-index: 2000;
    font-size: 12px;
    line-height: 1.5;
    min-width: 150px;
    padding: 10px;
    word-wrap: break-word;
    margin: 5px;
    position: absolute;
    .arrow-style {
      border-style: solid;
      border-color: transparent;
      width: 0;
      height: 0;
    }
    .pos {
      top: 50%;
      position: absolute;
      transform: translateY(-50%) rotate(180deg);
    }
    .ew-tooltip-arrow {
      .arrow-style;
      border-width: 10px;
      &-right,
      &-left {
        .pos;
      }
      &-right {
        right: -20px;
      }
      &-left {
        left: -20px;
      }
    }
    &-light {
      background-color: @borderLightAfterColor;
      border: 1px solid @borderLightColor;
      color: @lightFontColor;
      .ew-tooltip-arrow {
        &-right,
        &-left {
          &::after {
            content: "";
            .arrow-style;
            border-width: 9px;
            .pos;
          }
        }
        &-right {
          border-right-color: @borderLightColor;
          &::after {
            border-left-color: @borderLightAfterColor;
            right: -10px;
          }
        }

        &-left {
          border-left-color: @borderLightColor;
          &::after {
            border-right-color: @borderLightAfterColor;
            left: -10px;
          }
        }

        &-bottom {
          border-bottom-color: @borderLightColor;
          &::after {
            border-bottom-color: @borderLightAfterColor;
            border-top-width: 0;
          }
        }

        &-top {
          border-top-color: @borderLightColor;
          &::after {
            border-top-color: @borderLightAfterColor;
            border-bottom-width: 0;
          }
        }
      }
    }
    &-dark {
      background-color: @borderDarkColor;
      color: @darkFontColor;

      .ew-tooltip-arrow {
        &-left::after {
          border-left-color: @borderDarkColor;
        }

        &-top::after {
          border-top-color: @borderDarkColor;
        }
        &-bottom::after {
          border-bottom-color: @borderDarkColor;
        }
        &-right {
          border-right-color: @borderDarkColor;
        }
        &-left {
          border-left-color: @borderDarkColor;
        }
      }
    }
  }
}
</style>