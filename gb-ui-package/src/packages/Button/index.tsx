import React, { memo, FC, ReactElement } from 'react';
import {
  ButtonWrapper
} from "./styled"
import {
  IProps
} from "./props/index";
const Button: FC<IProps> = (props): ReactElement => {
  const {type,text } = props;
  return (
    <ButtonWrapper type={type}>
      <span>{ text}</span>
    </ButtonWrapper>
  )
}
export default memo(Button);