export type IGBTime = string | number | Date;
export type IGBCalendar = {current:boolean,date:number|string,id:string}
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

export function getCurrentMlastDay(time:IGBTime) {
  const type = getDataType(time);
  let exp = /-\d{2}$/g;
  switch (type) {
    case 'date':
      let dateStr = getDateStr(time as Date);
      return dateStr.replace(exp, `-${getCurrentMDays(time)}`);
    case "string":
      return (time as string).replace(exp, `-${getCurrentMDays(time)}`)
    default: 
      return getDateStr(time as Date);
  }
}

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
          return 28;
        } else {
          return getMonthType(month + 1) === MonthType.n ? 31 : 30;
        }
      }
    default:
      return 31
  }
}
/**
 * @n 前几个月
 */
export function getBeforeNmonth(n:number,time:IGBTime) {
  const date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let day = date.getDate();
  
  const remainder = n % 12;

  const isCurrentY = n!==0 && remainder===0 ? false : month - remainder > 0;
  let subYear = isCurrentY ? 0 : Math.ceil(n / 12);
  month = month - remainder>0 ? month-remainder:12 - Math.abs(month - remainder);
  year -= subYear;
  
  return `${year}-${Math.abs(month).toString().padStart(2,"0")}-${day.toString().padStart(2,"0")}`
}
export function getAfterNmonth(n:number,time:IGBTime) {
  const date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  
  const remainder = n % 12;

  const isCurrentY = n !== 0 && remainder === 0 ? false : month + remainder <=12;
  
  let subYear = isCurrentY ? 0 : Math.ceil(n / 12);
  month = month + remainder <=12 ? month+remainder : 12 - Math.abs(month + remainder);
  year += subYear;
  return `${year}-${Math.abs(month).toString().padStart(2,"0")}-${day.toString().padStart(2,"0")}`
}

export function getCurrentCalendar(time: IGBTime): IGBCalendar[] {
  if (typeof time === "string") {
    time = new Date(time);
  }
  const timeFirstDay = getCurrentMfirstDay(time);
  const timeLastDay = getCurrentMlastDay(time);
  
  const timeFirstDayWeek = new Date(timeFirstDay).getDay();
  const timeLastDayWeek = new Date(timeLastDay).getDay();
  
  const days:IGBCalendar[] = [];
  const header = timeFirstDayWeek;
  const tail = 7-timeLastDayWeek-1;
  
  for (let i = 1; i <= getCurrentMDays(time); i++){
    days.push({
      current: true,
      date: i,
      id:`i_${Math.random()}_${Math.random()}`
    })
  }
  
  if (header > 0) {
    for (let i = 1; i <= header; i++){
      days.unshift({
        current: false,
        date: getCurrentMDays(getBeforeNmonth(1,time)) - i+1,
        id:`i_${Math.random()}_${Math.random()}`
      })
    }
  }
  if (tail > 0) {
    for (let i = 1; i <= tail; i++){
      days.push({
        current: false,
        date:i,
        id:`i_${Math.random()}_${Math.random()}`
      })
    }
  }
  return days;
}
export function isObject(value:any) {
  return value !== null && typeof value === "object";
}
export function isArray(value: any) {
  return Array.isArray(value)
}