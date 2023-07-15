import React, { memo } from "react";
import Week from "../Week";
import { CalendarWrapper } from "./style";
import {
  getCurrentMDays,
  getCurrentMfirstDay,
  getDataType,
  getMonthType,
  getYearType
} from "../../utils/general";
const Calendar = () => {
  const currentMonthDays = getCurrentMDays(new Date());
  const firstDay:string = getCurrentMfirstDay(new Date());
  const week = new Date(firstDay).getDay();
  
  return (
    <CalendarWrapper>
      <Week/>
    </CalendarWrapper>
  )
}
export default memo(Calendar);