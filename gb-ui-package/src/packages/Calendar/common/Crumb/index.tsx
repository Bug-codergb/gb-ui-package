import React, { memo, FC } from "react";
import { CrumbWrapper } from "./style";

import { IProps} from "./props/index";
import { getDateStr } from "../../../../utils/general";
const Crumb: FC<IProps> = (props) => {
  const { date,width } = props;
  const dateProps: string = typeof date === "undefined" ?
    getDateStr(new Date()) :
    typeof date === "string" ? date : getDateStr(date as Date); 
  return <CrumbWrapper width={width??'auto'}>
    <div className="left-container">
      { dateProps }
    </div>
    <div className="right-container">
      <ul className="controller">
        <li>last</li>
        <li>今天</li>
        <li>next</li>
      </ul>
    </div>
  </CrumbWrapper>
}
export default memo(Crumb);