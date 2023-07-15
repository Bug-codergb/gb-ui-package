import { flushSync } from "react-dom";
export type IGBTime = string | number | Date;

export function getDataType(data:any) {
  const type:string = Object.prototype.toString.call(data);
  let exp = /\s\w+/;
  let res:null | RegExpMatchArray = null;
  if (res = type.match(exp)) {
    return res[0].trim().toLowerCase();
  }
  throw new Error("invald data type ")
}

export enum YearType{
  n,
  p
}
export function getYearType(year: string) {
  const fullYear:number = new Date(year).getFullYear();
  if (!fullYear) {
    return undefined;
  }
  if (fullYear % 400 === 0 || (fullYear%4===0 && fullYear%100 === 0)) {
    return YearType.n
  }
  return YearType.p;
}
export enum MonthType{
  n,//31
  p//30
}
export function getMonthType(month:number) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return MonthType.n;
  }
  return MonthType.p;
}
export function getDateStr(time:Date) {
  const year = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDate();
  return `${year}-${(month+1).toString().padStart(2,"0")}-${day.toString().padStart(2,"0")}`
}
export function getCurrentMfirstDay(time:IGBTime) {
  const type = getDataType(time);
  let exp = /-\d{2}$/g;
  switch (type) {
    case 'date':
      let dateStr = getDateStr(time as Date);
      return dateStr.replace(exp, "-01");
    case "string":
      return (time as string).replace(exp, "-01")
    default: 
      return getDateStr(time as Date);
  }
}
//
export function getCurrentMDays(time:IGBTime) {
  const type = getDataType(time);
  switch (type) {
    case 'date':
      const year = (time as Date).getFullYear();
      const month = (time as Date).getMonth();
      const day = (time as Date).getDate();
      if (getYearType(`${year}`) === YearType.n) {
        if (month + 1 === 2) {
          return 29;
        } else {
          return getMonthType(month + 1) === MonthType.n ? 31 : 30;
        }
      } else {
        if (month + 1 === 2) {
          return 29;
        } else {
          return getMonthType(month + 1) === MonthType.n ? 31 : 30;
        }
      }
    default:
      return 31
  }
}