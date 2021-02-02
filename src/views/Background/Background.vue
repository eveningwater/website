<template>
    <div class="ew-bg" id="ew-bg"></div>
</template>

<script lang="ts">
import { onMounted, PropType, reactive, toRefs } from 'vue';
import Snow from './snow';
export default {
    name:"Background",
    props:{
        snowStatus:{
            type:Boolean as PropType<boolean>,
            default:false
        }
    },
    setup(props,ctx){
        const state = reactive({
            snowInstace:null
        })
        onMounted(() => {
            state.snowInstace = new Snow(document.getElementById("ew-bg"),null);
            const loadSnow = () => state.snowInstace.init();
            const removeSnow = () => state.snowInstace.remove();
            ctx.emit("update:snowStatus",props.snowStatus);
            props.snowStatus ? loadSnow() : removeSnow();
            
        })
        return {
            ...toRefs(state)
        }
    }
}
</script>

<style lang="less" scoped>
 @import url('../../styles/backgroud.less');
</style>