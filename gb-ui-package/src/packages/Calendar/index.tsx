import React, { memo } from "react";
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
const Calendar = () => {
  let days = getCurrentCalendar(new Date())
  let calendar:IGBCalendar[][]  = [];
  for (let i = 0; i < days.length; i+=7){
    calendar.push(
      days.slice(i,i+7)
    )
  }
  console.log(calendar)
  return (
    <CalendarWrapper>
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