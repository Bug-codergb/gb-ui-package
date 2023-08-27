import React, { memo, FC, ReactElement,useState ,createRef, useEffect, useLayoutEffect} from "react";
import {
  LoopTreeWrapper
} from "./style";

import SelectItem from "../../../selectItem";
import { levelTree } from "../../../../../../utils/levelTree";

interface IInput{
  inputRef:HTMLInputElement | null
};

interface IProps{
  keyProp: string;
  data: any[],
  changeNode:(parentNode:any,parentStatus:boolean,isAllEmpty:boolean,item:any,status:boolean,link:any)=>void
}
const LoopTree: FC<IProps> = (props) => {
  const { data : dataProp=[],changeNode} = props;
 
  const [tree, setTree] = useState<any>([]);
  useEffect(() => {
    if (dataProp) {
      let dataArr = [...dataProp];
      console.log(dataArr)
      levelTree(
        dataArr,
        {
          key: 'inputRef',
          value:()=>createRef<IInput>()
        }
      );
      setTree(dataArr);
    }
    
  }, [dataProp])
  
  useEffect(() => {
    
  }, []);

  const expandClickHandler = (e: boolean, item: any, index: number) => {
    item.isExpand = !item.isExpand;
    let arr = [...tree];
    arr[index] = item;
    setTree(arr);
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
   
  //最底层子组件处理
  const selectChangeHandler = (e: boolean, item: any, index: number,type:'auto'|'handle',link:any) => {

    if(type==='handle') selectChildren(item.children, e);
    
    item.el = item.inputRef.current.inputRef;
    
    item.isSelect = e;

    item.parentEl = item.parentNode?.inputRef.current.inputRef;

    let arr = [...tree];
    arr[index] = item;
    
    setTree(arr);
  
    const _parent = item.parentNode ?? {};
    let parentStatus = false,isAllEmpty = true;
    if (_parent && Object.keys(_parent).length !== 0) {
      const children = item.parentNode.children || [];
      const selectAll = children.every((item) => {
        return item.isSelect !== undefined && item.isSelect === true;
      })
      //console.log(selectAll,children);
      if (selectAll) {
        parentStatus = true;
      } else {
        parentStatus = false;
      }
      isAllEmpty = children.every((item:any) => {
        return item.isSelect == undefined || item.isSelect === false;
      })
    }
    changeNode(item.parentNode,parentStatus,isAllEmpty,item,e,link);//发送给父组件
  }

  //父组件处理
  const changeNodeHandler = (item: any, status: boolean, allEmpty: boolean, index: number, link: any) => {
    item && (item.next = link);
    item.isSelect = status;
    //console.log(item);
    if ((!status && !allEmpty) || item.children.some((child)=>child.indeterminate === true)) {
      item.inputRef.current.inputRef.indeterminate = true;
      item.indeterminate = true;
    } else {
      item.inputRef.current.inputRef.indeterminate = false;
      item.indeterminate = false;
    }
    const arr = [...tree];
    arr[index] = item;
    setTree(arr);

    selectChangeHandler(status,item,index,'auto',item);
  }
  return (
    <LoopTreeWrapper>
      <ul>
        {
          tree && tree.map((item, index) => {
            return <li key={item.id}>
              <SelectItem
                key={item.id}
                ref={item.inputRef}
                id={item.id}
                name={item.name}
                isSelect={item.isSelect}
                expandClick={(e)=>expandClickHandler(e,item,index)}
                selectChange={(e: boolean) => selectChangeHandler(e,item,index,'handle',item)} />
              {
                item.children && item.children.length !== 0 &&
                <div
                    style={{ height: item.isExpand ? "auto":"0px" }}
                    className="children-container">
                    <LoopTree
                      data={item.children}
                      keyProp={item.id}
                      changeNode={
                        (row, parentStatus, allEmpty, item, status, link) => changeNodeHandler(row, parentStatus, allEmpty, index,link)
                      } />
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