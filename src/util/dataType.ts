export interface DataType {
    isNumber?:Function;
    isObject?:Function;
    isNull?:Function;
    isUndefined?:Function;
    isString?:Function;
    isArray?:Function;
    isFunction?:Function;
    isRegExp?:Function;
    isBoolean?:Function;
}
const _toString = Object.prototype.toString;
class TypeOf {
    constructor(){
        const obj = {};
        const getType = value =>  _toString.call(value).slice(8,-1);
        const typeArr = ['Number','Null','Undefined','String','Object','Array','Function','RegExp','Boolean'];
        typeArr.forEach(item => obj['is' + item] = (value) => getType(value).toLowerCase() === item.toLowerCase());
        return obj;
    }
}
const typeOf:DataType = new TypeOf();
export default typeOf;