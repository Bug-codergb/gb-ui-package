import React, { memo, FC, ReactElement ,useState, useEffect} from "react";
import SelectItem from "../selectItem";
import {
  TreeWrapper
} from "./style";

import LoopTree from "./common/loopTree";
import { deepClone } from "../../../../utils/array";
import { levelTree } from "../../../../utils/levelTree";
interface IProps{
  data:any[]
}
const Tree: FC<IProps> = (props) :ReactElement=> {
  const { data: dataProp } = props;
  const [data, setData] = useState<any>(deepClone(dataProp));
  useEffect(() => {
    if (data && data.length !== 0) {
      //levelTree(data);
    }
  }, [dataProp])
  return (
    <TreeWrapper>
      <LoopTree data={data} changeNode={(a,b)=>{}}/>
    </TreeWrapper>
  )
}
//selectItemChangeHandler(e,item,'left')
export default memo(Tree);