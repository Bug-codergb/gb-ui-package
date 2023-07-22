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
  return (
    <CalendarWrapper width={widthProps} scale={scale}>
      <TimeType width={widthProps*7}/>
      <Crumb date={currentDate} width={widthProps*7} pre={()=>prev()} next={()=>next()} current={()=>current()}/>
      <Week width={widthProps}/>
      <ul className="days">
        {
          calendar.map((item, index) => {
            return <li key={index} className={index>0?'need-move':'' }>
              {
                item.map((row,i) => {
                  return <li key={row.id} className={`item ${row.current ? '':'no-current'}${i>0?' need-move':''}`}>{row.date}</li>
                })
              }
            </li>
          })
        }
      </ul>
    </CalendarWrapper>
  )
}
export default memo(Calendar);