import typeOf, { DataType } from "./dataType";
interface UtilType extends DataType {
  isDom?: Function;
  isInt?: Function;
  isShallowObject?: Function;
  debounce?: Function;
  cubic?: Function;
  easeInOutCubic?: Function;
  requestAnimationFrame?: Function;
  on?: Function;
  off?: Function;
  $?: Function;
  $$?: Function;
}
const util: UtilType = {};
export const isServer = typeof window === "undefined";
for (let key in typeOf) {
  util[key] = typeOf[key];
}
/**
 * 判断是否是一个整数
 * @param {*} value
 */
util["isInt"] = (value) => util.isNumber(value) && value % 1 === 0;
/**
 * 动画函数兼容写法
 */
util["requestAnimationFrame"] = (handler: Function) => {
  const raf =
    window.requestAnimationFrame ||
    (window as myWindow).mozRequestAnimationFrame ||
    (window as myWindow).webkitRequestAnimationFrame ||
    (window as myWindow).msRequestAnimationFrame ||
    (window as myWindow).oRequestAnimationFrame ||
    function (callback) {
      return setTimeout(callback, 1000 / 16);
    };
  return raf(handler);
};
util["cancelAnimationFrame"] = (handler: Function) => {
  const caf =
    window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    (window as myWindow).mozCancelAnimationFrame ||
    (window as myWindow).msCancelAnimationFrame ||
    (window as myWindow).oCancelAnimationFrame;
  return caf(handler);
};
util["ewEval"] = (str) => new Function("return " + str)();
util["isShallowObject"] = (value) => value && typeof value === "object";
util["isDom"] = (el) =>
  util.isShallowObject(HTMLElement)
    ? el instanceof HTMLElement
    : (el &&
        util.isShallowObject(el) &&
        el.nodeType === 1 &&
        util.isString(el.nodeName)) ||
      el instanceof HTMLCollection ||
      el instanceof NodeList;
util["debounce"] = (fn: Function, wait: number) => {
  let timeout: any = null;
  return function () {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
};
util["cubic"] = (base: number, index: number): number => Math.pow(base, index);
util["easeInOutCubic"] = (value: number): number =>
  value < 0.5
    ? util.cubic(value * 2, 3) / 2
    : 1 - util.cubic((1 - value) * 2, 3) / 2;
util["on"] = (
  element: HTMLElement | Document | Window,
  type: string,
  handler: EventListenerOrEventListenerObject,
  useCapture: boolean = false
): void => {
  if (element && type && handler) {
    element.addEventListener(type, handler, useCapture);
  }
};
util["off"] = (
  element: HTMLElement | Document | Window,
  type: string,
  handler: EventListenerOrEventListenerObject,
  useCapture: boolean = false
): void => {
  if (element && type && handler) {
    element.removeEventListener(type, handler, useCapture);
  }
};
util["$"] = (selector:string) => document.querySelector(selector);
util["$$"] = (selector:string) => document.querySelectorAll(selector);
export default util;
