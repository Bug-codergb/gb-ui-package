import styled  from "styled-components";
export const TabBarWrapper = styled.div`
  .tab-list{
    display: flex;
    align-items: center;
    background-color: #b44d31;
    padding: ${10/40}rem ${10/40}rem 0 ${10/40}rem;
    &>li{
      color: #fff;
      font-size: ${18 / 40}rem;
      padding: ${6 / 40}rem ${16 / 40}rem ${8 / 40}rem;
      text-align: center;
      cursor: pointer;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      font-weight: 700;
      &.active{
        background-color: #fff;
        color: #b4482a;
      }
    }
  }
`