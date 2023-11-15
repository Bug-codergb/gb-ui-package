import React, {
  memo,
  FC,
  useRef,
  useEffect,
  Ref,
} from "react";
import { useMouse } from "../../../../hook/useMouse";
import { GraphWrapper } from "./style";

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

    const div = document.createElement("div");

    div.style.position = "absolute";
    div.style.left = `${left}px`;
    div.style.top = `${top}px`;

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
    });
  };
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
