import React, {
  FC, memo, useEffect, useState
} from "react";
import {
  TabBarDetailWrapper
} from "./style";
import { ITabBar } from "../../constant/tabBar";
interface IProps{
  detail:ITabBar|null
}
const TabBarDetail: FC<IProps> = (props) => {
  const { detail: propsDetail } = props;
  const [detail, setDetail] = useState<ITabBar | null>(propsDetail);
  
  useEffect(() => {
    setDetail(propsDetail);
  }, [propsDetail])
  return <TabBarDetailWrapper>
    <ul className="tab-bar-detail-list">
      {
        detail && detail.children && detail.children.map((item, index) => {
          return <li key={item.label}>
            <div className="img-container">
              <img src={ item.icon} className="img"/>
            </div>
            <span className="label">{item.label}</span>
          </li>
        })
      }
    </ul>
  </TabBarDetailWrapper>
}
export default memo(TabBarDetail);