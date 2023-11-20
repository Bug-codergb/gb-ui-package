export function createElement<T>(
  type: string,
  props: Object,
  children?: any
): T {
  const el = document.createElement(type);
  for (const key in props) {
    if (key === "style") {
      for (const style in props[key]) {
        el.style[style] = props[key][style];
      }
    } else {
      el.setAttribute(key, props[key]);
    }
  }
  if (children) {
    el.innerHTML = children;
  }
  return el as T;
}
export function appendChild(parent: any, child: any) {
  parent.appendChild(child);
}

export function enterToMove(
  downTarget: HTMLElement,
  pos: number[],
  parent: HTMLElement,
  containerOffsetLeft: number,
  containerOffsetTop: number
) {
  function handler(e) {
    e.stopPropagation();
    this.style.cursor = "crosshair";
    const [x, y] = pos;

    function fn(e: any) {
      e.stopPropagation();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (clientY <= y && clientX >= x) {
        parent.style.top = `${Math.abs(clientY - containerOffsetTop)}px`;
      }
      if (clientX < x && clientY <= y) {
        parent.style.left = `${Math.abs(clientX - containerOffsetLeft)}px`;
        parent.style.top = `${Math.abs(clientY - containerOffsetTop)}px`;
      }
      if (clientX < x && clientY >= y) {
        parent.style.left = `${Math.abs(clientX - containerOffsetLeft)}px`;
      }

      parent.style.width = `${Math.abs(clientX - x)}px`;
      parent.style.height = `${Math.abs(clientY - y)}px`;
    }

    document.addEventListener("mousemove", fn, false);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", fn);
    });
  }
  downTarget.addEventListener("mousedown", handler, false);
  document.addEventListener(
    "mouseup",
    function (e) {
      downTarget.removeEventListener("mousedown", handler);
    },
    false
  );
}

export function mergeCol(item: HTMLElement) {
  if (item.parentNode) {
    let rawSpan = item.getAttribute("rowspan") ?? 1;
    let cur = item.parentNode.nextSibling; //找到当前节点的父节点的下一个节点

    const children = item.parentNode.childNodes;
    const currentIndex = [...children].findIndex((row) => {
      return row === item;
    });
    
    let additional = Number(rawSpan);
    while (
      cur &&
      cur.childNodes[currentIndex] &&
      ((cur.childNodes[currentIndex].nodeType === 8 && rawSpan > 1) ||
        (cur.childNodes[currentIndex].nodeType !== 8 &&
          cur.childNodes[currentIndex].style.backgroundColor === "pink"))
    ) {
      rawSpan--;
      //span++;
      if (
        cur.childNodes[currentIndex].nodeType !== 8 &&
        cur.childNodes[currentIndex].style.backgroundColor === "pink") {
        additional += Number(cur.childNodes[currentIndex].getAttribute("rowspan") ?? 1);  
        rawSpan = Number(cur.childNodes[currentIndex].getAttribute("rowspan") ?? 1);
      }
      let next = cur.nextSibling;
      const currentItem = cur.childNodes[currentIndex];

      const parent = currentItem.parentNode;

      const comment = document.createComment("delete");

      if (parent) parent.insertBefore(comment, currentItem);
      if (parent) parent.removeChild(currentItem);
      cur = next;
    }
    item.setAttribute("rowspan", `${Number(additional)}`);//这里判断是否加一
  }
}
export function mergeRow(item: HTMLElement) {
  let span = 0;
  let cur = item.nextSibling;

  let rawSpan = item.getAttribute("colspan") ?? "1";

  let additional = Number(rawSpan);
  while (
    cur &&
    ((cur.nodeType === 8 && rawSpan > 1) ||
      (cur.nodeType !== 8 && cur.style.backgroundColor === "pink"))
  ) {
    rawSpan--;
    if (cur.nodeType !== 8 && cur.style.backgroundColor === 'pink') {
      additional += Number(cur.getAttribute("colspan") ?? 1);
      rawSpan = Number(cur.getAttribute("colspan") ?? 1);

    }
    let nextSibling = cur.nextSibling;
    const parent = cur.parentNode;

    const comment = document.createComment("delete");
    if (parent) parent.insertBefore(comment, cur);
    if (parent) parent.removeChild(cur);
    cur = nextSibling;
  }
  console.log(span);
  item.setAttribute("colspan", `${Number(additional)}`);
}
export function getPrevTd(td:HTMLElement) {
  let ret: HTMLElement | null = null;
  const parent = td.parentNode;
  const childNodes = parent?parent!.childNodes:[];
  const index:number = [...childNodes].findIndex((item: HTMLElement,index:number) => {
    return item === td;
  })
  if (index !== -1) {
    const prev = parent ? parent!.previousSibling : null;
    if (prev) {
      return prev.childNodes[index];
    }
  }
  return ret;
}
export function getNextTd(td: HTMLElement) {
  if (!td) {
    return null;
  }
  let ret: HTMLElement | null = null;
  const parent = td.parentNode;
  const childNodes = parent?parent!.childNodes:[];
  const index:number = [...childNodes].findIndex((item: HTMLElement,index:number) => {
    return item === td;
  })
  if (index !== -1) {
    const prev = parent ? parent!.nextSibling : null;
    if (prev) {
      ret = prev.childNodes[index];
    }
  }
  return ret;
}