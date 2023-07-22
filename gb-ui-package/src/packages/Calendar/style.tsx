import styled from "styled-components";
interface IStyle{
  width: number,
  scale:number
}
export const CalendarWrapper = styled.div<IStyle>`
  .days{
    display: inline-block;
    &>li{
      display: flex;
    flex-wrap: wrap;
      .item{
        font-size: ${30 / 40}rem;
        padding: 0 ${10 / 40}rem;
        width: ${props=>props.width / 40}rem;
        height: ${props=>props.width/props.scale/40}rem;
        border: 1px solid #e5e5e5;
      }
      .no-current{
        color: #bdbdbd;
      }
    }
  }
`