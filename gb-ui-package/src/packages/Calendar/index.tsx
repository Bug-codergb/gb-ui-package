import React, {
  memo, FC, useState
} from "react";
import Week from "../Week";
import { CalendarWrapper } from "./style";
import {
  IGBCalendar,
  getCurrentCalendar,
  getCurrentMDays,
  getCurrentMfirstDay,
  getCurrentMlastDay,
  getDataType,
  getBeforeNmonth,
  getMonthType,
  getYearType,
  getAfterNmonth
} from "../../utils/general";
import { IProps } from "./props/index"
import TimeType from "./common/TimeType";
import Crumb from "./common/Crumb";
import Days from "./common/Days";
import Hours from "./common/Hours";
import { DAY, MONTH } from "./constant";
const Calendar: FC<IProps> = (props) => {

  const {width } = props;

  let widthProps = width || 220;
  let scale = 1.67;

  const [currentDate,setCurrentDate] = useState<Date>(new Date());
  let days = getCurrentCalendar(currentDate);

  let calendar:IGBCalendar[][]  = [];
  for (let i = 0; i < days.length; i+=7){
    calendar.push(
      days.slice(i,i+7)
    )
  }
  console.log(getAfterNmonth(6,new Date()))
  const prev = () => {
    const lastDate = getBeforeNmonth(1,currentDate);
    setCurrentDate(new Date(lastDate));
  }
  const next = () => {
    const lastDate = getAfterNmonth(1, currentDate);
    setCurrentDate(new Date(lastDate));
  }
  const current = () => {
    setCurrentDate(new Date());
  }

  const [timeType,setTimeType] = useState<string>(DAY);
  const timeTypeChangeHandler = (e:string) => {
    setTimeType(e);
  }
  return (
    <CalendarWrapper width={widthProps} scale={scale}>
      <TimeType width={widthProps * 7} click={(e:string)=>timeTypeChangeHandler(e) } />
      <Crumb date={currentDate} width={widthProps*7} pre={()=>prev()} next={()=>next()} current={()=>current()}/>
      <Week width={widthProps} />
      {timeType === DAY && <Hours width={widthProps * 7} calendar={calendar} itemWidth={ widthProps} />}
      {timeType === MONTH &&<Days calendar={calendar}/>}
    </CalendarWrapper>
  )
}
export default memo(Calendar);