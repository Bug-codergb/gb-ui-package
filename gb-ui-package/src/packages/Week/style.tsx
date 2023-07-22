import styled from "styled-components";
interface IStyle{
  width: number,
  scale:number
}
export const WeekWrapper = styled.div<IStyle>`
  .week-list{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    &>li{ 
      padding: 0 ${10 / 40}rem;
      cursor: pointer;
      font-size: ${24 / 40}rem;
      width: ${props=>props.width / 40}rem;
      height: ${props => props.width / props.scale / 40}rem;
      text-align: center;
      vertical-align: middle;
      font-weight: 700;
    }
  }
`