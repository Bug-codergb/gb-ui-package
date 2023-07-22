import React, { memo, FC } from "react";
import { CrumbWrapper } from "./style";

import { IProps} from "./props/index";
import { getDateStr } from "../../../../utils/general";
const Crumb: FC<IProps> = (props) => {
  const { date,width,pre:propsPrev,next:propNext,current:propCurrent } = props;
  const dateProps: string = typeof date === "undefined" ?
    getDateStr(new Date()) :
    typeof date === "string" ? date : getDateStr(date as Date); 
  
  const prev = () => {
    if (propsPrev) {
      propsPrev();
    }
  }
  const next = () => {
    if (propNext) {
      propNext()
    }
  }
  const current = () => {
    if (propCurrent) {
      propCurrent()
    }
  }
  return <CrumbWrapper width={width??'auto'}>
    <div className="left-container">
      { dateProps }
    </div>
    <div className="right-container">
      <ul className="controller">
        <li onClick={()=>prev()}>last</li>
        <li onClick={ ()=>current()}>今天</li>
        <li onClick={()=>next()}>next</li>
      </ul>
    </div>
  </CrumbWrapper>
}
export default memo(Crumb);