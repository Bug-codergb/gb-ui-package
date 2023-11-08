import styled from "styled-components";
export const TabBarDetailWrapper = styled.div`
  background-color: #f5f5f5;
  padding: ${20/40}rem 0;
  .tab-bar-detail-list{
    display: flex;
    &>li{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 ${2/ 40}rem;
      .img-container{
        padding: ${8/40}rem ${10/40}rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius:5px ;
        border: 1px solid transparent;
        &:hover{
          background-image:linear-gradient(#f1f1f0,#e0e0e0);
          border: 1px solid #b6b6b6;
          cursor: pointer;
        }
      }
      .img{
        width: ${35/40}rem;
      }
      .label{
        font-size: ${18/40}rem;
      }
    }
  }
`