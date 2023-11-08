import styled from "styled-components";
export const AppWrapper = styled.div`
  height: 600px;
  
  .container{
    height: 800px;
    .img-container{
      height: 100%;
      overflow-y: scroll;
      border: 1px solid pink;
      &>li{
        height: 100px;
        img{
          height: 100%;
        }
      }
    }
  }
`