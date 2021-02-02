<template>
  <section v-html="renderCode" v-highlight></section>
</template>

<script lang="ts">
import { onMounted, PropType, ref } from "vue";

export default {
  name: "Markdown",
  props: {
    code: {
      type: String as PropType<string>,
      default: "",
    },
  },
  setup(props) {
    const renderCode = ref("");
    onMounted(() => {
      renderCode.value = props.code;
    });
    return {
      renderCode,
    };
  },
};
</script>

<style>
</style>