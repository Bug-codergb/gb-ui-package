import styled from "styled-components";
interface IStyle{
  width:number|string
}
export const TimeTypeWrapper = styled.div<IStyle>`
  width: ${props => props.width === "auto" ? 'auto' : `${props.width as number / 40}rem`};
  .time-type{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${24 / 40}rem;
    &>li{
      padding: ${5/40}rem ${20/40}rem;
    }
  }
`