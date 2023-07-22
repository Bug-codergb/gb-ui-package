import React, { memo ,FC} from "react";
import { WeekWrapper } from "./style";
import { week } from "../../constant/week";
import {IProps } from "./props/index"
const Week: FC<IProps> = (props) => {
  const {width=200,scale=2.7 } = props;
  return (
    <WeekWrapper width={200} scale={scale}>
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