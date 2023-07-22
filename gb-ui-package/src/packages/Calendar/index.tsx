import React, { memo,FC } from "react";
import Week from "../Week";
import { CalendarWrapper } from "./style";
import {
  IGBCalendar,
  getCurrentCalendar,
  getCurrentMDays,
  getCurrentMfirstDay,
  getCurrentMlastDay,
  getDataType,
  getMonthType,
  getYearType
} from "../../utils/general";
import { IProps } from "./props/index"
import TimeType from "./common/TimeType";
import Crumb from "./common/Crumb";

const Calendar: FC<IProps> = (props) => {

  const {width } = props;

  let widthProps = width || 220;
  let scale = 1.67;

  let days = getCurrentCalendar(new Date())
  let calendar:IGBCalendar[][]  = [];
  for (let i = 0; i < days.length; i+=7){
    calendar.push(
      days.slice(i,i+7)
    )
  }
  console.log(calendar)
  return (
    <CalendarWrapper width={widthProps} scale={scale}>
      <TimeType width={widthProps*7}/>
      <Crumb date={new Date()} width={widthProps*7}/>
      <Week />
      <ul className="days">
        {
          calendar.map((item, index) => {
            return <li key={ index}>
              {
                item.map((row,i) => {
                  return <li key={row.id} className="item">{row.date}</li>
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