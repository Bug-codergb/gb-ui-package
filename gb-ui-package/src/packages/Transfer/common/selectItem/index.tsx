import React, {
  memo,
  ReactElement,
  FC,
  useState,
  ChangeEvent,
  useEffect,
  Ref,
  forwardRef,
  useImperativeHandle,
  createRef,
  useRef
} from 'react';
import {
  SelectItemWrapper
} from "./styled";
interface IInput{
  inputRef:HTMLInputElement | null
};
interface IProps{
  id: string;
  name: string;
  isSelect: boolean;
  indeterminate?:boolean,
  selectChange: (e: boolean) => void,
  expandClick: (e: boolean) => void,
  ref:Ref<IInput>
}
const SelectItem: FC<IProps> = forwardRef((props,propsRef):ReactElement => {
  const {
    id,
    name,
    selectChange,
    expandClick,
    isSelect: isSelectProp = false,
    indeterminate: indeterminateProp = false
  } = props;
  
  const [isSelect, setIsSelect] = useState(isSelectProp);
  useEffect(() => {
    setIsSelect(isSelectProp);
  }, [isSelectProp])

  //const [indeterminate,setIndeterminate] = useState(indeterminateProp);
  
  const selectChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSelect(e.currentTarget.checked);
    selectChange && selectChange(e.currentTarget.checked);
  }
  const [isExpand,setIsExpand] = useState(false);
  const clickHandler = () => {
    setIsExpand(!isExpand);
    expandClick(!isExpand);
  }

  const inputRef= createRef<HTMLInputElement>();
  useImperativeHandle<IInput,IInput>(propsRef, () => {
    return {
      inputRef:inputRef.current
    }
  })
  return (
    <SelectItemWrapper>
      <div className={`triangle ${isExpand ? 'expand':''}`} onClick={()=>clickHandler()}></div>
      <input
        ref={inputRef}
        type="checkbox"
        checked={isSelect}
        onChange={(e) => selectChangeHandler(e)} />
      <span className='label' onClick={()=>clickHandler()}>{ name}</span>
    </SelectItemWrapper>
  )
})
export default memo(SelectItem);