<template>
   <div class="ew-folder-menu" @click="onHandle">
       <div class="ew-folder-menu-item" v-for="(item,index) in total" :key="item.toString() + index" :style="{ 'background-color':color }"></div>
   </div> 
</template>

<script lang="ts">
import { PropType, ref } from 'vue'
export default {
    name:"ewFolderMenu",
    props:{
        total:Number as PropType<number>,
        color:{
            type:String as PropType<string>,
            default:"#364149"
        }
    },
    emits:['on-menu-click'],
    setup(props,ctx){
        const total = ref(4);
        const clickStatus = ref(false);
        if(props.total)total.value = props.total;
        const color = props.color;
        const onHandle = () => {
            clickStatus.value = !clickStatus.value;
            ctx.emit('on-menu-click',clickStatus);
        }
        return {
            total,
            color,
            onHandle
        }
    }
}
</script>

<style lang="less" scoped>
    .ew-folder-menu {
        width: 24px;
        height: 24px;
        display: inline-block;
        margin:8px 10px;
        vertical-align: middle;
        transition: color .1s cubic-bezier(.175,.885,.32,1.275);
        text-align: center;
        cursor: pointer;
        &:hover .ew-folder-menu-item {
            opacity: .8;
        }
        .ew-folder-menu-item {
            width: 100%;
            height: 2px;
            margin-top: 3px;
            display: block;
        }
    }
</style>