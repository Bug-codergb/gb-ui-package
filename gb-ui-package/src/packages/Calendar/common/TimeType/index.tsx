import React, { memo, FC } from "react";
import { timeType } from "../../constant";
import {
  IProps
} from "./props/index"
import { TimeTypeWrapper} from "./style";
const TimeType: FC<IProps> = (props) => {
  const {width } = props;
  return (
    <TimeTypeWrapper width={width??'auto'}>
      <ul className="time-type">
        {
          timeType.map((item, index) => {
            return <li key={item}>{ item}</li>
          })
        }
      </ul>
    </TimeTypeWrapper>
  )
}
export default memo(TimeType);