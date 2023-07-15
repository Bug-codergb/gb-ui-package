import React, { memo } from "react";
import { WeekWrapper } from "./style";
import { week } from "../../constant/week";
const Week = () => {
  return (
    <WeekWrapper>
      <ul className="week-list"> 
      {
        week.map((item, index) => {
          return (
            <li key={item} > {item}</li>
          )
        })
      }
      </ul>
    </WeekWrapper>
  )
}
export default memo(Week);