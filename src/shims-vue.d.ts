/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare interface myWindow extends Window {
  mozRequestAnimationFrame?: any;
  msRequestAnimationFrame?: any;
  oRequestAnimationFrame?: any;
  mozCancelAnimationFrame?: any;
  msCancelAnimationFrame?: any;
  oCancelAnimationFrame?: any;
  onresize?:Function
}