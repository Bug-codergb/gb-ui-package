import styled  from "styled-components";
export const SelectItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 0;
  .triangle{
    border: 4.5px solid #a9abb1;
    width: 0;
    height: 0;
    padding: 0;
    border-right: none ;
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-top-width: 3.5px;
    border-bottom-width: 3.5px;
    cursor: pointer;
    transition: transform 0.2s;
    margin: 0 2px 0 0 ;
    &.expand{
      transform: rotate(90deg);
    }
  }
  .label{
    margin: 0 0 0 2px;
    cursor: pointer;
  }
` 