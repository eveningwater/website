import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import { nextTick } from "vue";
import { DirectiveType } from './type'

const highlightDirective: DirectiveType = {
  directive: "highlight",
  directiveOption: {
    mounted(el: HTMLElement | Document) {
      nextTick(() => {
        const blocks: NodeList = el.querySelectorAll("pre code");
        //   console.log(blocks)
        if (blocks && blocks.length) {
          for (let i = 0, len = blocks.length; i < len; i++) {
            hljs.highlightBlock(blocks[i] as HTMLElement);
          }
        }
      });
    },
  },
};
export default highlightDirective;
