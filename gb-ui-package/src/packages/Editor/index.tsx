import React, {
  memo, FC, ReactElement, useState, useEffect
} from "react";
import {
  EditorWrapper
} from "./style";

import TabBar from "./childCpn/tabBar/index"
import TabBarDetail from "./childCpn/tabBarDetail";
import Graph from "./childCpn/graph/index"
import { ITabBar } from "./constant/tabBar";
const Editor: FC = (): ReactElement => {

  const [detail, setDetail] = useState<ITabBar|null>(null);

  const tabBarClickHandler = (item: ITabBar, index: number) => {
    setDetail(item);
  }
 
  return <EditorWrapper>
    <TabBar onClick={(item,index)=>tabBarClickHandler(item,index)} />
    <TabBarDetail detail={detail} />
    <div>
      <Graph/>
    </div>
  </EditorWrapper>
}
export default memo(Editor);