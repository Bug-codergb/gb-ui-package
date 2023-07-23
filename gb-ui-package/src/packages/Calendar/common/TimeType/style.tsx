import styled from "styled-components";
interface IStyle{
  width:number|string
}
export const TimeTypeWrapper = styled.div<IStyle>`
  width: ${props => props.width === "auto" ? 'auto' : `${props.width as number / 40}rem`};
  display:flex;
  justify-content:center;
  .time-type{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${24 / 40}rem;
    border:1px solid #f2f2f2;
    border-radius:10px;
    overflow:hidden;
    &:hover{
      background-color:#f2f2f2;
      &>li{
        &.active{
          background-color:#dadada;
        }
      }
    }
    &>li{
      padding: ${2 / 40}rem ${26 / 40}rem;
      border-radius:10px;
      cursor: pointer;
      &.active{
        background-color:#f2f2f2;
      }
    }
  }
`