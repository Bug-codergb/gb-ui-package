import React, { memo, FC, ReactElement, useRef,useEffect ,useState} from "react";
import { getCurrentParent } from "./utils/getCurrentParent";
import { judgeVisible } from "./utils/judgeVisible";
import { renderImg } from "./utils/renderImg";
import {
  ImageWrapper
} from "./style"
interface IProps{
  src: string;
  error: string;
  loading: string;
  perload:number
}

const Image: FC<IProps> = (props): ReactElement => {
  const {
    src,
    error,
    loading,
    perload
  } = props;
  const imgRef = useRef<HTMLImageElement & {loaded:boolean} | null>(null);
  const [container, setContainer] = useState<HTMLElement|null>(null);
  useEffect(() => {
    if (imgRef.current) {
      const parent = getCurrentParent(imgRef.current);
      parent && parent.addEventListener("scroll", scrollHandler);
      if (parent) {
        setContainer(parent as HTMLElement);
      }
      scrollHandler();
    }
    
  }, [imgRef.current])
  const scrollHandler = () => {
    if (imgRef.current && container) {
      const isVislble = judgeVisible(imgRef.current, container.offsetHeight);
      if (isVislble && !imgRef.current.loaded) {
        imgRef.current.setAttribute("src", loading);
        renderImg(src).then(() => {
          imgRef.current?.setAttribute("src", src);
          imgRef.current!.loaded = true;
        }).catch((e) => {
          imgRef.current?.setAttribute("src", error);
          imgRef.current!.loaded = true;
        })
      }
    }
  }
  return <ImageWrapper>
    <img ref={ imgRef} />
  </ImageWrapper>
}
export default memo(Image);