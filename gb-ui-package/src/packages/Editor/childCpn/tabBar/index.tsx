import React, {
  memo, FC, useState, useEffect
} from "react";
import {
  TabBarWrapper
} from "./style";

import { tabBar } from "../../constant/tabBar";
import {ITabBar } from "../../constant/tabBar"
interface IProps{
  onClick:(item:ITabBar,index:number)=>void
}
const TabBar: FC<IProps> = (props) => {
  const {onClick } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    itemClickHandler(tabBar[0], 0);  
  }, [tabBar])
  
  const itemClickHandler = (item:ITabBar,index:number) => {
    setCurrentIndex(index);
    onClick(item, index);
  }

  return <TabBarWrapper>
    <ul className="tab-list">
      {
        tabBar.map((item,index) => {
          return <li key={item.label}
            className={index === currentIndex ? 'active' : ''}
            onClick={e=>itemClickHandler(item,index)}>{item.label}</li>
        })
      }
    </ul>
  </TabBarWrapper>
}
export default memo(TabBar);