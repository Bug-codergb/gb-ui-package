import React, { memo, FC } from "react";
import {
  DaysWrapper
} from "./style";
import { IProps} from "./props/index"
const Days: FC<IProps> = (props) => {
  const {calendar } = props;
  return <DaysWrapper>
      <ul className="days">
        {
          calendar && calendar.map((item, index) => {
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
  </DaysWrapper>
}
export default memo(Days);