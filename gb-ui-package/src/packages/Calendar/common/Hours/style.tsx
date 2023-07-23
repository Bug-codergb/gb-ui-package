import styled from "styled-components";
interface IStyle{
  width: number | string,
  itemWidth:number|string
}
export const HoursWrapper = styled.div<IStyle>`
  width: ${props => typeof props.width === "string" ? 'auto' : ` ${props.width / 40}rem`};
  position: relative;
  .mask{
    position:absolute;
    width:100%;
    height:100%;
    background-color:rgba(89, 168, 215,.3);
    left:0;
    top:0;
    .week-list{
      display:flex;
      align-items:center;
      height:100%;
      &>li{
        width:${props => typeof props.itemWidth === "string" ? 'auto' : ` ${props.itemWidth / 40}rem`};
        text-align:right;
        height:100%;
      }
    }
  }
  .hour-list{
    width:100%;
    &>li{
      display: flex;
      align-items:center;
      margin:0 0 ${30/40}rem 0;
      .time{
        font-size: ${20 / 40}rem;
        margin:0 ${10 / 40}rem 0 0;
        text-align:right;
        letter-spacing:1px;
        text-align:justify-all;
      }
      .line{
        height: 1px;
        background-color: #d9d9d9 ;
        flex: 1;
      }
    }
  }
`