import React, {
  memo,
  FC,
  useRef,
  useEffect,
  Ref,
  useState,
} from "react";

import { GraphWrapper } from "./style";
import {
  createElement,
  appendChild,
  enterToMove,
  mergeCol,
  mergeRow,
  getNextTd,
  getPrevTd

} from "../../../../utils/dom";

interface IShap<T> {
  id: string;
  ref: Ref<T>;
}

const Graph: FC = () => {
  const graphRef = useRef<HTMLDivElement | null>(null);
  const [seleect, setSelect] = useState<any>([]);
  const [allTd, setAllTd] = useState<any>();

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
        backgroundColor: "#fff",
        cursor:"move",
      }
    });
    div.addEventListener("mousedown", function (e) {
      e.stopPropagation();
      const target = e.currentTarget as HTMLDivElement;
      const x = e.clientX - (target?target.offsetLeft : 0);
      const y = e.clientY - (target ? target.offsetTop : 0);
      function handler(e:MouseEvent) {
        
          let left = e.clientX - x;
          let top = e.clientY - y;
          div.style.left = `${left}px`;
          div.style.top = `${top}px`;

      }
      div.addEventListener("mousemove", handler);
      document.addEventListener("mouseup", () => {
        div.removeEventListener("mousemove", handler);
      })
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
      //graphRef.current.addEventListener("mousedown", mousedownHandler, false);
    }
  }, [graphRef]);
  useEffect(() => {
    return () => {
      if (graphRef.current) {
        graphRef.current.removeEventListener("mousedown", mousedownHandler);
      }
    };
  }, []);
  useEffect(() => {
    const tdlist = document.querySelectorAll("td");
    setAllTd(tdlist);

    tdlist.forEach((td, index) => {
      //鼠标按下回调函数
      function tdMouseDownHandler(e: MouseEvent) { //(按下)
        e.stopPropagation();
        let self = this;
        let currentClickNext = self;
        let currentClickPrev = self;
        // 当鼠标按下并且移动时
        function tdMouseMoveHandler(e:MouseEvent) { //(移动)
          e.stopPropagation();
          self.style.backgroundColor = "pink";//当前元素置为选中色
          
          
          for (let item of tdlist) {

            function handler(e: MouseEvent) {  
              console.log("enter 执行")
              this.style.backgroundColor = "pink";

              const prev = getPrevTd(this);
              const next = getNextTd(this);
              if (
                prev &&
                prev.nodeType !== 8 &&
                prev.style.backgroundColor === "pink" &&
                ((next &&
                next.style.backgroundColor !== 'pink') || !next) &&
                this.previousSibling &&
                this.previousSibling.style.backgroundColor !=='pink'
              ) {//向下走
                let currentOverNext = this;
                currentClickNext = getNextTd(currentClickNext);
                while (currentOverNext && currentOverNext !==currentClickNext) {
                  currentOverNext.style.backgroundColor = "pink";
                  currentOverNext = currentOverNext.previousSibling;
                }
                currentClickNext.style.backgroundColor = "pink";
              }
              
              if (
                next &&
                next.nodeType !== 9 &&
                next.style.backgroundColor === "pink" &&
                ((prev &&
                prev.style.backgroundColor !== "pink") || !prev) && 
                this.previousSibling &&
                this.previousSibling.style.backgroundColor !=='pink'
              ) {//向上走
                let currentOverNext = this;
                currentClickPrev  = getPrevTd(currentClickPrev);

                while (currentOverNext && currentOverNext !== currentClickPrev) {
                  currentOverNext.style.backgroundColor = "pink";
                  currentOverNext = currentOverNext.previousSibling;
                }
                currentClickPrev.style.backgroundColor = "pink";
              }
              
            }
            if (item !== self) {
              item.onmouseover = handler;//这里的绑定事件不使用addEventListener,否则会绑定很多次
            }
            document.addEventListener("mouseup", function (e) {
              item.onmouseover=null;
            })
          }

        }
        document.addEventListener("mousemove", tdMouseMoveHandler);

        document.addEventListener("mouseup", () => {
          document.removeEventListener("mousemove",tdMouseMoveHandler)
        })
      }
      //鼠标按下时
      td.addEventListener("mousedown", tdMouseDownHandler);

      //当鼠标点击时，颜色职位透明
      td.addEventListener("click", function (e) {
        e.stopPropagation();
        for (let item of tdlist) {
          item.style.backgroundColor = "white"
        }
      })
    })

  }, [])
  const mergeHandler = () => {
    const select:any[] = [];
    for (let item of allTd) {
      if (item.style.backgroundColor === 'pink') {
        select.push(item);
      }
    }
    if (select.length !== 0) {
      for (let i = 0; i < select.length; i++) {
        const item = select[i];
        if (item.style.backgroundColor === "pink") {
          
          mergeRow(item)
          queueMicrotask(() => {
            mergeCol(item);
            for (let item of select) {
              item.style.backgroundColor = "white";
            } 
          })
        } else {
          
        }
      }
    }
  }
  return (
    <GraphWrapper>
      <div className="graph-container" ref={graphRef}>
        <table border="true">
          <tr>
            <td data-p={[0,0]}>前端语言</td>
            <td data-p={[0,1]}>后端语言</td>
            <td data-p={[0,2]}>大数据语言</td>
            <td data-p={[0,4]}>嵌入式</td>
            <td data-p={[0,4]}>移动端</td>
            <td data-p={[0,4]}>pc端</td>
            <td data-p={[0,4]}>云原生</td>
            </tr>
          <tr>
            <td data-p={[1,0]}>JavaScript</td>
            <td data-p={[1,1]}>Java</td>
            <td data-p={[1,2]}>pyhon</td>
            <td data-p={[1,3]}>C++</td>
            <td data-p={[1,3]}>React</td>
            <td data-p={[1,3]}>Vue</td>
            <td data-p={[1,3]}>Uniapp</td>
            </tr>
            <tr>
            <td data-p={[2,0]}>Flutter</td>
            <td data-p={[2,1]}>Golang</td>
            <td data-p={[2,2]}>ruby</td>
            <td data-p={[2,3]}>C</td>
            <td data-p={[2,3]}>Spring</td>
            <td data-p={[2,3]}>SpringBoot</td>
            <td data-p={[2,3]}>Anglur</td>
            </tr>
            <tr>
            <td data-p={[3,0]}>rust</td>
            <td data-p={[3,1]}>php</td>
            <td data-p={[3,2]}>swift</td>
            <td data-p={[3,3]}>oc</td>
            <td data-p={[3,3]}>React Native</td>
            <td data-p={[3,3]}>Express</td>
            <td data-p={[3,3]}>Koa</td>
          </tr>
          <tr>
            <td data-p={[3,0]}>Strutc</td>
            <td data-p={[3,1]}>MySQL</td>
            <td data-p={[3,2]}>SqlServer</td>
            <td data-p={[3,3]}>Oracle</td>
            <td data-p={[3,3]}>Redis</td>
            <td data-p={[3,3]}>Linux</td>
            <td data-p={[3,3]}>Ngnix</td>
          </tr>
          
          <tr>
            <td data-p={[3,0]}>Tomcat</td>
            <td data-p={[3,1]}>Maven</td>
            <td data-p={[3,2]}>Npm</td>
            <td data-p={[3,3]}>NodeJS</td>
            <td data-p={[3,3]}>Scala</td>
            <td data-p={[3,3]}>Kotlin</td>
            <td data-p={[3,3]}>TypeScript</td>
          </tr>
          <tr>
            <td data-p={[3,0]}>Next</td>
            <td data-p={[3,1]}>Android</td>
            <td data-p={[3,2]}>IOS</td>
            <td data-p={[3,3]}>Macos</td>
            <td data-p={[3,3]}>Dart</td>
            <td data-p={[3,3]}>Babel</td>
            <td data-p={[3,3]}>Eslint</td>
          </tr>
          <tr>
            <td data-p={[3,0]}>Inter</td>
            <td data-p={[3,1]}>AMD</td>
            <td data-p={[3,2]}>Promise</td>
            <td data-p={[3,3]}>Object</td>
            <td data-p={[3,3]}>Array</td>
            <td data-p={[3,3]}>Function</td>
            <td data-p={[3,3]}>Generator</td>
           </tr>
        </table>
        <button onClick={()=>mergeHandler()}>合并单元格</button>
      </div>
    </GraphWrapper>
  );
};
export default memo(Graph);
