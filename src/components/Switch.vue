<template>
  <div class="ew-switch">
    <label class="ew-switch-core"></label>
  </div>
</template>

<script lang="ts">
export default {
  name:"Switch",
  setup() {},
};
</script>

<style lang="less" scoped>
.ew-switch {
  vertical-align: middle;
  .ew-switch-core {
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    border-radius: 10px;
    background: #dcdfe6;
    transition: border-color 0.3s, background-color 0.3s;
  }
}
</style>