import React, {
  memo,
  FC,
  ReactElement,
  useState,
  createRef,
  useEffect,
  useLayoutEffect
} from "react";
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
  changeNode: (
    parentNode: any,
    parentStatus: boolean,
    isAllEmpty: boolean,
    item: any,
    status: boolean,
    link: any,
    selectAll: boolean
  ) => void
}
const LoopTree: FC<IProps> = (props) => {
  const { data : dataProp=[],changeNode} = props;
 
  const [tree, setTree] = useState<any>([]);
  useEffect(() => {
    if (dataProp) {
      let dataArr = [...dataProp];
      //console.log(dataArr)
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
    let parentStatus = false,isAllEmpty = true,selectAll = false;
    if (_parent && Object.keys(_parent).length !== 0) {
      const children = item.parentNode.children || [];
      selectAll = children.every((item) => {
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
    console.log(e);
    changeNode(item.parentNode,parentStatus,isAllEmpty,item,e,link,selectAll);//发送给父组件
  }

  const setChildrenToNext = (link: any) => {
    if (link && link.children) { 
      const selectAll = link.children.every((item: any) => item.isSelect === true);
      if (selectAll) {
        link.next = link.children;
        for (let item of link.children) {
          setChildrenToNext(item);
        }
      }
      
    }
  }
  //父组件处理
  const changeNodeHandler = (
    item: any,
    status: boolean,
    allEmpty: boolean,
    index: number,
    link: any,
    selectAll: boolean
  ) => {
   
    if (item) {
      item.next = link;
      setChildrenToNext(link);
    }
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
            const children = item.children ? [...item.children] : [];
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
                      data={children}
                      keyProp={item.id}
                      key={item.id}
                      changeNode={
                        (
                          row,
                          parentStatus,
                          allEmpty,
                          item,
                          status,
                          link,
                          selectAll
                        ) => changeNodeHandler(row, parentStatus, allEmpty, index, link,selectAll)
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