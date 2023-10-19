import React, { memo, FC, ReactElement } from 'react';
import {
  ButtonWrapper
} from "./styled"
import {
  IProps
} from "./props/index";
const Button: FC<IProps> = (props): ReactElement => {
  const { type="default",disabled=false, text, onClick ,round=false} = props;
  
  const clickHandler = () => {
    if (onClick) {
      onClick();
    }
  }
  return (
    <ButtonWrapper type={type} round={round} disabled={disabled}>
      <span onClick={()=>clickHandler()}>{ text}</span>
    </ButtonWrapper>
  )
}
export default memo(Button);