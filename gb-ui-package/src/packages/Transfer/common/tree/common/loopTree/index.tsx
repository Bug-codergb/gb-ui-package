import React, { memo, FC, ReactElement,useState ,createRef, useEffect} from "react";
import {
  LoopTreeWrapper
} from "./style";
import { deepClone } from "../../../../../../utils/array";
import SelectItem from "../../../selectItem";
import { levelTree } from "../../../../../../utils/levelTree";

interface IInput{
  inputRef:HTMLInputElement | null
};

interface IProps{
  data: any[],
  changeNode:(node:any,status:boolean,isAllEmpty:boolean)=>void
}
const LoopTree: FC<IProps> = (props) => {
  const { data : dataProp,changeNode} = props;
  const [data, setData] = useState(dataProp);
 
  useEffect(() => {
    if (data) {
      let dataArr = [...data];
      levelTree(
        dataArr,
        {
          key: 'inputRef',
          value:()=>createRef<IInput>()
        }
      );
      setData(dataArr);
    }

  }, []);

  const expandClickHandler = (e: boolean, item: any, index: number) => {
    item.isExpand = !item.isExpand;
    let arr = [...data];
    arr[index] = item;
    setData(arr);
  }
  function selectChildren(children: any[], e: boolean) {
    if (!children || children.length === 0) {
      return;
    }
    for (let item of children) {
      item.isSelect = e;
      selectChildren(item.children, e);
    }
  }
   
  const selectChangeHandler = (e: boolean, item: any, index: number) => {
  
    selectChildren(item.children, e);
    
    item.el = item.inputRef.current.inputRef;
    
    item.isSelect = e;

    item.parentEl = item.parentNode?.inputRef.current.inputRef;
  
    /*const _parent = item.parentNode ?? {};
    if (_parent && Object.keys(_parent).length !== 0) {
      const children = item.parentNode.children || [];
      const selectAll = children.every((item) => {
        return item.isSelect !== undefined && item.isSelect === true;
      })
      if (selectAll) {
        item.parentEl ? item.parentEl.indeterminate = false : "";
        item.parentNode.isSelect = true;
        item.parentEl.checked = true;
        selectParent(item.parentNode, true);
        
        console.log(item);
      } else {
        selectParent(item, true);
        const allEmpty = children.every((item) => {
          return item.isSelect === undefined || item.isSelect === false;
        })
        if (allEmpty) {
          item.parentEl ? item.parentEl.indeterminate = false : "";
          item.parentNode.isSelect = false;
        item.parentEl.checked = false;
        } else {
          item.parentEl ? item.parentEl.indeterminate = true : "";
        }
        
      }
    }*/
    console.log(item);

    let arr = [...data];
    arr[index] = item;
    //item.el.indeterminate = true
    setData(arr);
    console.log(data)

    

    const _parent = item.parentNode ?? {};
    let parentStatus = false,isAllEmpty = true;
    if (_parent && Object.keys(_parent).length !== 0) {
      const children = item.parentNode.children || [];
      const selectAll = children.every((item) => {
        return item.isSelect !== undefined && item.isSelect === true;
      })
      if (selectAll) {
        parentStatus = true;
      } else {
        parentStatus = false;
      }
      isAllEmpty = children.every((item:any) => {
        return item.isSelect == undefined || item.isSelect === false;
      })
    }
    changeNode(item.parentNode,parentStatus,isAllEmpty);
  }

  const changeNodeHandler = (item:any,status:boolean,allEmpty:boolean,index:number) => {
    item.isSelect = status;
    console.log(item,allEmpty);
    if (!status && !allEmpty) {
      item.inputRef.current.inputRef.indeterminate = true;
    } else {
      item.inputRef.current.inputRef.indeterminate = false;
    }
    const arr = [...data];
    arr[index] = item;
    setData(arr);
  }
  return (
    <LoopTreeWrapper>
      <ul>
        {
          data && data.map((item, index) => {
            return <li key={item.id}>
              <SelectItem
                key={item.id}
                ref={item.inputRef}
                id={item.id}
                name={item.name}
                isSelect={item.isSelect}
                expandClick={(e)=>expandClickHandler(e,item,index)}
                selectChange={(e: boolean) => selectChangeHandler(e,item,index)} />
              {
                item.children && item.children.length !== 0 &&
                <div
                    style={{ height: item.isExpand ? "auto":"0px" }}
                    className="children-container">
                    <LoopTree
                      data={item.children}
                      changeNode={(row, status, allEmpty) => changeNodeHandler(row, status, allEmpty,index)} />
                </div>
              }
            </li>
          })
        }
      </ul> 
    </LoopTreeWrapper>
  )
}
export default memo(LoopTree);