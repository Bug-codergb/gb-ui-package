import styled  from "styled-components";
export const TransferWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  .controller{
    display: flex;
    align-items: center;
    flex-direction: column  ;
    margin:  0 ${30 / 40}rem;
    .right,.left{
      cursor  :pointer ;
      
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