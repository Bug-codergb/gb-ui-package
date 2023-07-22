import styled from "styled-components";
interface IStyle{
  width: number,
  scale:number
}
export const CalendarWrapper = styled.div<IStyle>`
  padding: ${16/40}rem;
  .days{
    display: inline-block;
    &>li{
      display: flex;
      flex-wrap: wrap;
      &.need-move{
        margin-top: -1px;
      }
      .item{
        font-size: ${30 / 40}rem;
        padding: 0 ${10 / 40}rem;
        width: ${props=>props.width / 40}rem;
        height: ${props=>props.width/props.scale/40}rem;
        border: 1px solid #e5e5e5;
        text-align: right;
        &.need-move{
          margin-left: -1px;
        }
      }
      .no-current{
        color: #bdbdbd;
      }
    }
  }
`