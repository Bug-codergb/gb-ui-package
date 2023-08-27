import {
  isArray, isObject
} from "./general";
export function deleteFromArr(arr: any, index?: number, options?: { key: string, value: any }) {
  if (arr.length == 0) return arr;
  if (index !== undefined) {
    arr.splice(index, 1);
    return;
  }
  if (options !== undefined) {
    const { key, value } = options;
    for (let i = 0; i < arr.length; i++){
      const item = arr[i];
      if (item[key] === value) {
        arr.splice(i, 1);
      }
    }
  }
}
export function deleteChildren(arr: any[], children: any[], key: string) {
 
  const keyIndex = {};
  for (let item of children) {
    keyIndex[item[key]] = true;
  }
  for (let i = 0; i < arr.length;i++) {
    const item = arr[i];
    console.log(keyIndex[item[key]]);
    if (keyIndex[item[key]]) {
      arr.splice(i, 1);
      i-- ;
    }
  }
  
}
export function deepClone(raw:Array<any>|Object) {
  let res: any = {};
  if (isArray(raw)) {
    res=[]
  }
  for (const key in raw) {
    let value = raw[key];
    if (isArray(value)) {
      value = deepClone(value);
    } else if (isObject(value)) {
      value = deepClone(value);
    }
    res[key] = value;
  }
  return res;
}
deepClone(1);