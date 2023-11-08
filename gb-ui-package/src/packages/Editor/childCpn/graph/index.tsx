import React, { memo, FC, useRef, useEffect } from "react";
import { GraphWrapper } from "./style";

import { useMouse } from "../../../../hook/useMouse";

const Graph: FC = () => {
  const graphRef = useRef<HTMLDivElement | null>(null);

  
  const mousedownHandler = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    const x = e.clientX;
    const y = e.clientY;

    const left =
      e.clientX - (target ? target.offsetLeft : 0);
    const top =
      e.clientY - (target ? target.offsetTop : 0);
    
    console.log(left,top)
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = `${left}px`;
    div.style.top = `${top}px`;
    graphRef.current?.appendChild(div);

    function handler(e:MouseEvent) {
      div.style.width = `${e.clientX - x}px`;
      div.style.height = `${e.clientY - y}px`;
      div.style.border = `1px solid pink`;
    }
    document.addEventListener("mousemove", handler, false);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", handler);
    })
  };
  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.addEventListener("mousedown", mousedownHandler, false);
    }
  }, [graphRef]);
  useEffect(() => {
    
  },[])
  return (
    <GraphWrapper>
      <div className="graph-container" ref={graphRef}></div>
    </GraphWrapper>
  );
};
export default memo(Graph);
