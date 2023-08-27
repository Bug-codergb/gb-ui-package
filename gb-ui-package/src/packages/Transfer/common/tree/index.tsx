import React, { memo, FC, ReactElement ,useState, useEffect} from "react";
import {
  TreeWrapper
} from "./style";

import LoopTree from "./common/loopTree";
import { deepClone } from "../../../../utils/array";

interface IProps{
  keyProps: string;
  data: any[];
  selectChangle: (
    parentNode: any,
    parentStatus: boolean,
    isAllEmpty: boolean,
    item: any, status: boolean,
    link: any
  ) => void
}
const Tree: FC<IProps> = (props) :ReactElement=> {
  const { data: dataProp ,selectChangle:selectChangleProp,keyProps} = props;
  const [data, setData] = useState<any>(deepClone(dataProp));
  useEffect(() => {
    console.log(dataProp);
    if (dataProp && dataProp.length !== 0) {
      setData(dataProp);
    } else {
      setData([])
    }
  }, [dataProp]);
  const selectChange = (
    parentNode: any,
    parentStatus: boolean,
    isAllEmpty: boolean,
    item: any,
    status: boolean,
    link:any
  ) => {
    //console.log(parentNode, item);
    selectChangleProp(parentNode, parentStatus, isAllEmpty, item, status,link);
  }
  return (
    <TreeWrapper>
      <LoopTree
        data={data}
        key={keyProps}
        keyProp={keyProps}
        changeNode={
          (
            parentNode: any,
            parentStatus: boolean,
            isAllEmpty: boolean,
            item: any,
            status: boolean,
            link:any) => selectChange(parentNode, parentStatus, isAllEmpty, item, status,link)
        } />
    </TreeWrapper>
  )
}
//selectItemChangeHandler(e,item,'left')
export default memo(Tree);