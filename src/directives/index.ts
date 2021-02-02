import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import { nextTick } from "vue";
const directives = [
  {
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
  },
];
export default directives;
