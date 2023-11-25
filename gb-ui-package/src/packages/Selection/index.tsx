import React, { memo, FC } from 'react';
import { SelectionWrapper } from "./style";
interface IProps{
  list: any[],
  label: string,
  value:any
}
const Selection: FC<IProps> = (props) => {
  const {list,label,value } = props;
  return <SelectionWrapper>
    <input />
    <ul>
      {
        list.length !== 0 && list.map((item) => {
          return <li key={item[label]}>
            {
              item[value]
            }
          </li>
        })
      }
    </ul>
  </SelectionWrapper>
}
export default memo(Selection);