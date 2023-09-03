import styled  from "styled-components";
export const TransferWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  .controller{
    display: flex;
    align-items: center;
    flex-direction: column  ;
    margin:  0 ${30 / 40}rem;
    .right,.left{
      cursor  :pointer ;
      background-color:skyblue ;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 20px;
      color: #fff;
      line-height: 50px;
    }
    .left{
      margin: 5px 0 0 0;
    }
    .right{
      margin: 0 0 5px 0;
    }
  }
`
export const LeftContainer = styled.div`
  flex: 1;
  height: 100%;
  border: 1px solid pink;
  padding: ${20/40}rem;
`
export const RightContainer = styled.div`
  flex: 1;
  height: 100%;
  border: 1px solid pink;
  padding: ${20/40}rem;
`