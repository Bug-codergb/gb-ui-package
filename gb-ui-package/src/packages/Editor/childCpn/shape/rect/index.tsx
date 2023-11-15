import React, { memo, FC,forwardRef, Ref} from "react";
import {
  RectWrapper
} from "./style";
interface IProps{
  ref:Ref<HTMLDivElement>
}
const Rect: FC<IProps> = forwardRef((props,propRef) => {
  return <div ref={propRef} style={{position:'absolute'}}>111wwww</div>
})
export default memo(Rect);