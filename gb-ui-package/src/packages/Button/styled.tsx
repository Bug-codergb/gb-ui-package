import styled from "styled-components";
import { IType } from "./props";

import {
  dangerColor,
  primaryColor,
  wanringColor,
  infoColor,
  successColor,
  borderColor,
  fontColor
} from "../../constant/color"

interface IStyle{
  type: IType,
  round: boolean,
  disabled:boolean
}
export const ButtonWrapper = styled.div<IStyle>`
  font-size: ${18/40}rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: ${(props:IStyle)=>props.disabled ?'not-allowed' :'pointer'};
  background-color:${(props: IStyle) => {
  let map = new Map([
    ['success',successColor],
    ['danger',dangerColor],    
    ['primary',primaryColor],    
    ['warning', wanringColor], 
    ['info',infoColor],
    ['default','#fff'],    
  ])  
  return map.get(props.type) ?? "#ffffff";
  }};
  border:${(props:IStyle) => {
    return props.type === "default" ? `1px solid ${borderColor}` : 'none';
  }};
  border-radius: ${(props:IStyle) => {
    return props.round ? `${40 / 40}rem` : '4px';
  }};
  color:${(props: IStyle) => props.type!=='default' ? '#ffffff':fontColor};
  &>span{
    display:block;
    width:100%;
    height:100%;
    padding: 10px 15px;
  }
`