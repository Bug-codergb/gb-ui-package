import styled from "styled-components";
import { borderColor } from "../../constant/color";
export const DragListWrapper = styled.div`
  .drag-list{
    padding: 0;
    margin: 0;
    border: 1px solid ${borderColor};
    padding: 10px ${20 / 40}rem ${10 / 40}rem;
    background-color: #fff;
    .drag-item{
      padding: ${10/40}rem ${15/40}rem;
      margin: 0 0 ${10/40}rem 0;
      border: 1px solid ${borderColor};
      font-size: ${24 / 40}rem;
      background-color: #fff;
      &.gb-ui-package-draging{
        opacity: 0;
      }
    }
  }
`