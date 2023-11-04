import React, { memo, FC ,DragEvent,useRef,useEffect} from 'react';
import {
  DragListWrapper
} from "./style"
const DragList: FC = () => {
  const currentSibList = useRef<NodeListOf<HTMLLIElement>|null>(null);
  const currentDragItem = useRef<HTMLLIElement|null>(null);

  useEffect(() => {
    document.addEventListener("dragenter", (e) => e.preventDefault(),false);
    document.addEventListener("dragover", (e) => {
      //dragOverHandler(e);
    }, false);
  })
  const dragStartHandler = (e:DragEvent<HTMLLIElement|HTMLUListElement>) => {
    const traget = e.currentTarget;
    setTimeout(() => {
      traget.classList.add("gb-ui-package-draging");
    },0)
  }
  const dragEndHandler = (e:DragEvent<HTMLLIElement|HTMLUListElement>) => {
    const target = e.currentTarget;
    target.classList.remove("gb-ui-package-draging");
  }
  const dragOverHandler = (e:DragEvent<HTMLUListElement|Document>) => {
    const target = e.currentTarget;
    e.preventDefault();
    currentDragItem.current = target.querySelector(".gb-ui-package-draging");
    currentSibList.current = target.querySelectorAll(".drag-item:not(.gb-ui-package-draging)");
    
    const container = document.querySelector(".drag-list");
    const clientY = e.clientY;
    const len = currentSibList.current.length;
    if (currentSibList.current && len !== 0 && container && currentDragItem.current) {
      const item = [...currentSibList.current].find((item) => {
        return clientY <= (item as HTMLLIElement).offsetTop + (item as HTMLLIElement).offsetHeight / 2 &&
        container &&
        currentDragItem.current
      })
      if (item) {
        container.insertBefore(currentDragItem.current, item);
      } else {
        container.insertBefore(currentDragItem.current, null);
      }
    }
  }
  return <DragListWrapper>
    <ul className="drag-list" onDragOver={(e)=>dragOverHandler(e)}>
      <li draggable className="drag-item"
        onDragStart={(e) => dragStartHandler(e)}
        onDragEnd={(e)=>dragEndHandler(e)}>窗前明月光</li>
      <li draggable className="drag-item"
        onDragStart={(e) => dragStartHandler(e)}
        onDragEnd={(e)=>dragEndHandler(e)}>疑似地上霜</li>
      <li draggable className="drag-item"
        onDragStart={(e) => dragStartHandler(e)}
        onDragEnd={(e)=>dragEndHandler(e)}>举头望明月</li>
      <li draggable className="drag-item"
        onDragStart={(e) => dragStartHandler(e)}
        onDragEnd={(e)=>dragEndHandler(e)}>低头思故乡</li>
    </ul>
  </DragListWrapper>
}
export default memo(DragList);