import styled from "styled-components";
import { IType } from "./props";
interface IStyle{
  type:IType
}
export const ButtonWrapper = styled.div<IStyle>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color:${(props:IStyle)=>props.type==='danger'?`#ec4141`:`pink`};
`