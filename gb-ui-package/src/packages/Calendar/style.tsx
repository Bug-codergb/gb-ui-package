import styled from "styled-components";
export const CalendarWrapper = styled.div`
  .days{
    display: inline-block;
    &>li{
      display: flex;
    flex-wrap: wrap;
      .item{
        font-size: ${30 / 40}rem;
        padding: 0 ${10 / 40}rem;
        width: ${200 / 40}rem;
        height: ${120/40}rem;
        border: 1px solid #e5e5e5;
      }
    }
  }
`