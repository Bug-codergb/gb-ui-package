import React, { FC, memo, ReactElement ,useRef,useEffect} from "react";
import {
  TextWrapper
} from "./style";
import {
  IProps
} from "./props/index"
const Text: FC<IProps> = (props): ReactElement => {
  const { text, maxLine } = props;
  const textRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (textRef.current) {
      let ret = getComputedStyle(textRef.current);
      console.log(ret.getPropertyValue("line-height"))
      console.log(ret.getPropertyValue("font-size"))
      console.log(textRef.current.clientHeight)
    }
  },[textRef.current])
  return (
    <TextWrapper>
      <span className="content" ref={textRef}>
        {text}
      </span>
    </TextWrapper>
  )
}
export default memo(Text);