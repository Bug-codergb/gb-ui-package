import styled from "styled-components";
export const WeekWrapper = styled.div`
  .week-list{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    &>li{
      padding: ${20 / 40}rem;
      cursor: pointer;
      font-size: ${20/40}rem;
    }
  }
`