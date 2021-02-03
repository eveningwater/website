
import { ComponentPublicInstance, DirectiveBinding, ObjectDirective } from 'vue';
import util,{ isServer } from '../util/util';
type DocumentHandler = <T extends MouseEvent>(mouseup:T,mousedown:T) => void;
type FlushList = Map<HTMLElement,{ DocumentHandler:DocumentHandler,bindingFn:(...args:unknown[]) => unknown }>
const nodeList:FlushList = new Map();
let startClick:MouseEvent;
if(!isServer){
    util.on(document,'mousedown',(e:MouseEvent) => startClick = e);
    util.on(document,'mouseup',(e:MouseEvent) => {
        for(const { DocumentHandler } of nodeList.values()){
            DocumentHandler(e,startClick);
        }
    })
}
const createDocumentHandler = (el:HTMLElement,binding:DirectiveBinding):DocumentHandler => {
    // the excluding elements
    let excludes:HTMLElement[] = [];
    if(Array.isArray(binding.arg)){
        excludes = binding.arg;
    }else{
        excludes.push(binding.arg as unknown as HTMLElement);
    }
    return (mouseup,mousedown) => {
        // Maybe we can not considered the tooltip component,which is the popperRef type
        const popperRef = (binding.instance as ComponentPublicInstance<{ popperRef:NonNullable<HTMLElement> }>).popperRef;
        const mouseUpTarget = mouseup.target as Node;
        const mouseDownTarget = mousedown.target as Node;
        const isBinding = !binding || !binding.instance;
        const isExistTargets = !mouseUpTarget || !mouseDownTarget;
        const isContainerEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
        const isSelf = el === mouseUpTarget;
        const isContainByPopper = popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget))
        const isTargetExcluded = excludes.length && (excludes.some(item => item.contains && item?.contains(mouseUpTarget)) || excludes.indexOf(mouseDownTarget as HTMLElement) > -1);
        if(isBinding || isExistTargets || isContainerEl || isSelf || isTargetExcluded || isContainByPopper)return;
        // the directive should binding a method or function
        binding.value();
    }
}
const setNodeList = (el,binding) => {
    nodeList.set(el,{
        DocumentHandler:createDocumentHandler(el,binding),
        bindingFn:binding.value
    })
}
export const clickOutside:ObjectDirective = {
    beforeMount(el,binding){
        setNodeList(el,binding);
    },
    updated(el,binding){
        setNodeList(el,binding);
    },
    unmounted(el){
        nodeList.delete(el);
    }
}
export default {
    directive:"clickOutside",
    directiveOption:clickOutside
};