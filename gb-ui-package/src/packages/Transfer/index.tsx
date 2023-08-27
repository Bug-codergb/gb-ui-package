import React, {
  memo, FC, ReactElement, useState, useEffect, useLayoutEffect
  
} from "react";
import {deleteFromArr,deleteChildren,deepClone } from "../../utils/array";
import SelectItem from "./common/selectItem/index";
import Tree from "./common/tree/index";
import {
  TransferWrapper,
  LeftContainer,
  RightContainer
} from "./style"
interface IProps{
  source: any[],
  target:any[]
}
const Transfer: FC<IProps> = (props):ReactElement => {
  const { source:sourceProp,target:targetProp } = props;

  const [source, setSource] = useState(deepClone(sourceProp));
  const [sourceSelect, setSourceSelect] = useState<any[]>([]);
  const [targetSelect, setTargetSelect] = useState<any[]>([]);

  const [target, setTarget] = useState<any[]>(deepClone(targetProp));
  useLayoutEffect(() => {
    if (target.length !== 0) {
      let arr = [...source];
      deleteChildren(arr, target, "id");
      setSource(arr);
    }
  }, [])
  
  const selectItemChangeHandler = (isSelect: boolean, item: any, alias: string) => {
    
    if (!isSelect) {
      const arr = alias === 'left' ? [...sourceSelect] : [...targetSelect];
      deleteFromArr(arr,undefined,{key:'id',value:item.id});
      alias==='left' ? setSourceSelect(arr) :setTargetSelect(arr);
    } else {
      const arr = alias === 'left' ? [...sourceSelect]: [...targetSelect];
      arr.push(item);
      alias === 'left' ? setSourceSelect(arr) : setTargetSelect(arr);
    }
  }

  
  const rightClickHandler = () => {
    if (sourceSelect.length === 0) {
      
    } else {
      const temp = [...target];
      for (let item of sourceSelect) {
        temp.push(item);
      }
      setTarget(temp);
      
      setSourceSelect([]);

      const arr = [...source];
      deleteChildren(arr, sourceSelect, "id");
      setSource(arr);
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
  return <TransferWrapper>
    <LeftContainer>
      <Tree data={ source} />
    </LeftContainer>
    <div className="controller">
      <div className="right" onClick={()=>rightClickHandler()}>向右</div>
      <div className="left" onClick={()=>leftClickHandler()}>向左</div>
    </div>
    <RightContainer>
      <ul>
        {
          target && target.map((item, index) => {
            return <li key={item.id}>
              <SelectItem
                id={item.id}
                name={item.name}
                expandClick={(e)=>{}}
                selectChange={(e: boolean) => selectItemChangeHandler(e,item,'right')} />
            </li>
          })
        }
      </ul>
    </RightContainer>
  </TransferWrapper>
}
export default memo(Transfer)