import React, { memo } from "react";
import { CalendarWrapper } from "./style";
import {
  getCurrentMfirstDay,
  getDataType,
  getMonthType,
  getYearType
} from "../../utils/general";
const Calendar = () => {
  console.log(getCurrentMfirstDay("2023"));
  return (
    <CalendarWrapper>11</CalendarWrapper>
  )
}
export default memo(Calendar);