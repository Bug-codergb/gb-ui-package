import React, { memo, FC } from "react";
import {
  HoursWrapper
} from "./style";
import { getHour } from "./constant";
import { IProps } from "./props/index";
import { week } from "../../../../constant/week";

const hours = getHour();
const Hours: FC<IProps> = (props) => {
  const { width,calendar,itemWidth } = props;
  const widthProps = width || "auto";
  console.log(widthProps)
  return (
    <HoursWrapper width={widthProps} itemWidth={itemWidth}>
      <ul className="hour-list">
        {
          hours.map((item, index) => {
            return <li key={item + index}>
              <div className="time">{item}</div>
              <div className="line"></div>
            </li>
          })
        }
      </ul>
      <div className="mask">
        <ul className="week-list">
          {
            week && week.map((item, index) => {
              return <li>
                {
                  item
                }
              </li>
            })
          }
        </ul>
      </div>
    </HoursWrapper>
  )
}
export default memo(Hours)