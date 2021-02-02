<template>
  <div
    v-if="isString(wrapper)"
    :id="idOrClassName"
    :class="idOrClassName"
  ></div>
</template>
<script lang="ts">
import { onMounted, PropType, reactive, toRefs } from "vue";
import ewColorPicker from "ew-color-picker";
import util from "../util/util";

type WrapperType = string | HTMLElement;
type OptionType = {
  el: WrapperType;
  alpha?: boolean;
  hue?: boolean;
  size?:
    | string
    | {
        width?: string | number;
        height?: string | number;
      };
  predefineColor?: string[];
  disabled?: boolean;
  defaultColor?: string;
  openPickerAni?: string;
  sure?: Function;
  clear?: Function;
  isLog?: boolean;
  openPicker?: Function;
};
interface ColorPickerPropType {
  colorPickerOption?: OptionType;
  wrapper: WrapperType;
}
export default {
  name:"ColorPicker",
  props: {
    wrapper: [String, HTMLElement] as PropType<WrapperType>,
    colorPickerOption: Object as PropType<ColorPickerPropType>,
  },
  setup(props) {
    const wrapper = props.wrapper;
    const option = props.colorPickerOption;
    const hasSymbol = () =>
      ["#", "."].reduce((res, item) => {
        if ((wrapper as string).indexOf(item) > -1) {
          res = true;
        }
        return res;
      }, false);
    const idOrClassName: string = util.isString(wrapper) && hasSymbol() ? (wrapper as string).slice(1) : "";
    const state = reactive({
      colorPicker: null,
      idOrClassName: idOrClassName,
      isString: util.isString,
      wrapper: wrapper,
    });
    onMounted(() => {
      state.colorPicker = new ewColorPicker(util.isObject(option) ? option : props.wrapper);
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>