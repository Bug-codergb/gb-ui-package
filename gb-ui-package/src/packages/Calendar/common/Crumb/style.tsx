import styled from "styled-components";
interface IStyle{
  width:number|string
}
export const CrumbWrapper = styled.div<IStyle>`
  width: ${props => props.width === "auto" ? 'auto' : `${props.width as number / 40}rem`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${20/40}rem 0;
  .controller{
    display: flex;
    align-items: center;
    &>li{
      border: 1px solid #c3c3c3;
      font-size: ${20 / 40}rem;
      display: flex;
      justify-content: center;
      padding: ${5 / 40}rem ${10 / 40}rem;
      border-radius: 8px;
      cursor: pointer;
      &:nth-child(2){
        margin:  0 ${0/40}rem;
      }
      &:active{
        background-color: #f0f0f0;
      }
    }
  }
`