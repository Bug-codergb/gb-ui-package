import React, {
  memo,
  FC,
  ReactElement,
  useState,
  useLayoutEffect,
  useCallback
} from "react";
import {
  deleteFromArr,
  deleteChildren,
  deepClone
} from "../../utils/array";
import SelectItem from "./common/selectItem/index";
import Tree from "./common/tree/index";
import {
  TransferWrapper,
  LeftContainer,
  RightContainer
} from "./style";

import {generateTree, mergeTree,removeTreeNode } from "./utils/index"

interface IProps{
  source: any[],
  target:any[]
}
const Transfer: FC<IProps> = (props):ReactElement => {
  const { source:sourceProp,target:targetProp } = props;

  const [source, setSource] = useState(deepClone(sourceProp));

  const [sourceSelect, setSourceSelect] = useState<any[]>([]);
  const [targetSelect, setTargetSelect] = useState<any[]>([]);

  const [target, setTarget] = useState<any[]>([]);
  useLayoutEffect(() => {
    if (target.length !== 0) {
      let arr = [...source];
      deleteChildren(arr, target, "id");
      setSource(arr);
    }
  }, [])
  
  let preLink:any = null;
  const selectItemChangeHandler = (isSelect: boolean, item: any, alias: string, link: any) => {
    console.log(link)
    const cloneLink = generateTree(link);
    console.log(cloneLink);
    if (preLink) {
      mergeTree(preLink,cloneLink);
    } else {
      preLink = cloneLink; 
    }
    if (preLink) {
      setSourceSelect(preLink);
    }
    /*if (!isSelect) {
      const arr = alias === 'left' ? [...sourceSelect] : [...targetSelect];
      deleteFromArr(arr,undefined,{key:'id',value:item.id});
      alias==='left' ? setSourceSelect(arr) :setTargetSelect(arr);
    } else {
      const arr = alias === 'left' ? [...sourceSelect]: [...targetSelect];
      arr.push(item);
      alias === 'left' ? setSourceSelect(arr) : setTargetSelect(arr);
    }*/
  }

  
  const rightClickHandler = () => {
    if (sourceSelect.length === 0) {
      
    } else { 
      let sourceArr = [...source];
      removeTreeNode(sourceArr);
      console.log(sourceArr);
      setSource(sourceArr);
      // const temp = [...target];
      // for (let item of sourceSelect) {
      //   temp.push(item);
      // }
      // setTarget(temp);
      
      // setSourceSelect([]);

      // const arr = [...source];
      // deleteChildren(arr, sourceSelect, "id");
      // setSource(arr);
      let arr = [...sourceSelect];
      setTarget(arr);
    }
  }
  const leftClickHandler = () => {
    
    if (targetSelect.length === 0) {
      
    } else {
      const arr = [...source];
      for (let item of targetSelect) {
        arr.push(item);
      }
      setSource(arr);

      setTargetSelect([]);

      const temp = [...target];
      deleteChildren(temp, targetSelect, "id");
      setTarget(temp);
    }
  }
  const selectLeftChangleHandler = useCallback(
    (
      parentNode:any,
      parentStatus:boolean,
      isAllEmpty:boolean,
      item:any,
      status:boolean,
      link:any
    ) => {
      selectItemChangeHandler(status, item, "left",link)
    }, [])
  
    const selectRightChangleHandler = useCallback(
      (
        parentNode:any,
        parentStatus:boolean,
        isAllEmpty:boolean,
        item:any,
        status:boolean,
        link:any
      ) => {
        selectItemChangeHandler(status, item, "right",link)
      }, [])
  
  return <TransferWrapper>
    <LeftContainer>
      <Tree
        key={'left'}
        keyProps="left"
        data={source}
        selectChangle={selectLeftChangleHandler} />
    </LeftContainer>
    <div className="controller">
      <div className="right" onClick={()=>rightClickHandler()}>&gt;</div>
      <div className="left" onClick={()=>leftClickHandler()}>&lt;</div>
    </div>
    <RightContainer>
      <Tree
        key={'right'}
        keyProps="right"
        data={target}
        selectChangle={selectRightChangleHandler} />
    </RightContainer>
  </TransferWrapper>
}
export default memo(Transfer)