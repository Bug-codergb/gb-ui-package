import React, { memo, FC, useState } from "react";
import { DAY, MONTH, timeType } from "../../constant";
import {
  IProps
} from "./props/index"
import { TimeTypeWrapper} from "./style";
const TimeType: FC<IProps> = (props) => {
  const { width, click } = props;

  const [currentIndex, setCurrentIndex] = useState<number>(timeType.indexOf(DAY));
  const clickHandler = (type:string,index:number) => {
    if (click) {
      click(type);
    }
    setCurrentIndex(index);
  }
  return (
    <TimeTypeWrapper width={width??'auto'}>
      <ul className="time-type">
        {
          timeType.map((item, index) => {
            return <li className={ index===currentIndex?'active':''} key={item} onClick={()=>clickHandler(item,index)}>{ item}</li>
          })
        }
      </ul>
    </TimeTypeWrapper>
  )
}
export default memo(TimeType);