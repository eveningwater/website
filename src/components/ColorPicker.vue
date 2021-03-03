<template>
  <div
    v-if="isString(wrapper) || isString(colorPickerOption.el)"
    :id="idOrClassName"
    :class="idOrClassName"
  ></div>
</template>
<script lang="ts">
import { onMounted, PropType, reactive, Ref, ref, toRefs } from "vue";
import ewColorPicker,{ WrapperType,OptionType } from "ew-color-picker";
import util from "../util/util";
export default {
  name:"ColorPicker",
  props: {
    wrapper: [String, HTMLElement] as PropType<WrapperType>,
    colorPickerOption: Object as PropType<OptionType>,
  },
  setup(props) {
    const wrapper = props.wrapper;
    const option = props.colorPickerOption;
    const hasSymbol = (value) => ["#", "."].reduce((res, item) => {
      if((value as string).indexOf(item) > -1)return true;
      return res;
    }, false);
    let idOrClassName: Ref<string> = ref("");
    if(util.isObject(option)){
      if(util.isString(option.el) && hasSymbol(option.el)){
        idOrClassName.value = (option.el as string).slice(1);
      }
    }else if(util.isString(wrapper) && hasSymbol(wrapper)){
      idOrClassName.value = (wrapper as string).slice(1);
    }else{
      throw new Error('You should set the colorPickerOption prop or wrapper prop which contained el propty!');
    }
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