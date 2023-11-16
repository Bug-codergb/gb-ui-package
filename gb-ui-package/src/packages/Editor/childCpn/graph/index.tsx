import React, {
  memo,
  FC,
  useRef,
  useEffect,
  Ref,
} from "react";

import { GraphWrapper } from "./style";
import { createElement ,appendChild,enterToMove} from "../../../../utils/dom";

interface IShap<T> {
  id: string;
  ref: Ref<T>;
}

const Graph: FC = () => {
  const graphRef = useRef<HTMLDivElement | null>(null);

  const mousedownHandler = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLDivElement;

    const x = e.clientX;
    const y = e.clientY;
    const left = e.clientX - (target ? target.offsetLeft : 0);
    const top = e.clientY - (target ? target.offsetTop : 0);


    const div = createElement<HTMLDivElement>("div", {
      style: {
        position: "absolute",
        left: `${left}px`,
        top: `${top}px`,
        backgroundColor:"#fff"
      }
    });
    div.addEventListener("mousedown", function (e) {
      e.stopPropagation()
    })

    function handler(e: MouseEvent) {
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (clientY <= y && clientX >= x) {
        div.style.top = `${Math.abs(clientY - target.offsetTop)}px`;
      }
      if (clientX < x && clientY <= y) {
        div.style.top = `${Math.abs(clientY - target.offsetTop)}px`;
        div.style.left = `${Math.abs(clientX - target.offsetLeft)}px`;
      }
      if (clientX < x && clientY >= y) {
        div.style.left = `${Math.abs(clientX - target.offsetLeft)}px`;
      }
      div.style.width = `${Math.abs(clientX - x)}px`;
      div.style.height = `${Math.abs(clientY - y)}px`;
      div.style.border = `1px solid pink`;

      graphRef.current?.appendChild(div);
    }
    document.addEventListener("mousemove", handler, false);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", handler);
      const list = createPosBlock(div);
      for (let item of list) {
        appendChild(div, item);
      }
    });
  };
  const createPosBlock = (parent: HTMLDivElement) => {
    
    const list: HTMLDivElement[] = [];

    const containerOffsetLeft = graphRef.current ? graphRef.current!.offsetLeft : 0;
    const containerOffsetTop = graphRef.current ? graphRef.current!.offsetTop : 0;

    for (let i = 1; i <= 8; i++){
      const div:HTMLDivElement = createElement("div", {
        style: {
          position: "absolute",
        }
      })
      div.style.width = "10px";
      div.style.height = "10px";
      div.style.boxShadow = "0px 0px 1px rgba(0,0,0,.7)"
      div.style.backgroundColor = "#ffffff";
      
      switch (i) {
        case 1:
          div.style.left = "0";
          div.style.top = "0";
          div.style.transform = "translate(-50%,-50%)";
          div.style.cursor = "nwse-resize";

          let rightBottom = [
            parent.offsetLeft + parent.offsetWidth + containerOffsetLeft,
            parent.offsetTop + parent.offsetHeight + containerOffsetTop
          ];
          enterToMove(div,rightBottom,parent,containerOffsetLeft,containerOffsetTop);
          break;
        case 2:
          div.style.left = "100%";
          div.style.top = "0";
          div.style.transform = "translate(-50%,-50%) ";
          div.style.cursor = "nesw-resize";
          rightBottom = [
            parent.offsetLeft + containerOffsetLeft,
            parent.offsetTop + parent.offsetHeight + containerOffsetTop
          ];
          enterToMove(div,rightBottom,parent,containerOffsetLeft,containerOffsetTop);break
        case 3:
          div.style.left = "0";
          div.style.top = "50%";
          div.style.transform = "translate(-50%,-50%)";
          div.style.cursor = "ew-resize";break
        case 4:
          div.style.left = "100%";
          div.style.top = "50%";
          div.style.transform = "translate(-50%,-50%)";
          div.style.cursor = "ew-resize";break;
        case 5:
          div.style.left = "0";
          div.style.top = "100%";
          div.style.transform = "translate(-50%,-50%)";
          div.style.cursor = "nesw-resize";
          rightBottom = [
            parent.offsetLeft + parent.offsetWidth+ containerOffsetLeft,
            parent.offsetTop + containerOffsetTop
          ];
          console.log(rightBottom)
          enterToMove(div,rightBottom,parent,containerOffsetLeft,containerOffsetTop);break
        case 6:
          div.style.left = "100%";
          div.style.top = "100%";
          div.style.transform = "translate(-50%,-50%)";
          div.style.cursor = "nwse-resize";
          rightBottom = [
            parent.offsetLeft + containerOffsetLeft,
            parent.offsetTop + containerOffsetTop
          ];
          enterToMove(div,rightBottom,parent,containerOffsetLeft,containerOffsetTop);
          break;
          case 7:
            div.style.left = "50%";
            div.style.top = "0";
          div.style.transform = "translate(-50%,-50%)";
          div.style.cursor="ns-resize"; break;
          case 8:
            div.style.left = "50%";
            div.style.top = "100%";
          div.style.transform = "translate(-50%,-50%)";
          div.style.cursor="ns-resize";break;
        
      }
      list.push(div);
    }
    return list;
  }
  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.addEventListener("mousedown", mousedownHandler, false);

     
    }
  }, [graphRef]);
  useEffect(() => {
    return () => {
      if (graphRef.current) {
        graphRef.current.removeEventListener("mousedown", mousedownHandler);
      }
    };
  }, []);
  return (
    <GraphWrapper>
      <div className="graph-container" ref={graphRef}></div>
    </GraphWrapper>
  );
};
export default memo(Graph);
