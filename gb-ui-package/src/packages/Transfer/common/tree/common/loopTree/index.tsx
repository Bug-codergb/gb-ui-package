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
  data:any[]
}
const LoopTree: FC<IProps> = (props) => {
  const { data : dataProp} = props;
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
  const selectChangeHandler = (e:boolean,item:any,index:number) => {
    const children = item.children ? [...item.children] :[];
    selectChildren(children, e);

    item.el = item.inputRef.current.inputRef;
    item.isSelect = e;
    item.children = children;
    let arr = [...data];
    arr[index] = item;
    item.el.indeterminate = true
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
                  <LoopTree data={ item.children} />
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