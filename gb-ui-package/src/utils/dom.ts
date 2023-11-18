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

export function mergeCol(item:HTMLElement) {
  let span = 0;
  if (item.parentNode) {
    let cur = item.parentNode.nextSibling;

    const children = item.parentNode.childNodes;
    console.log(children);
    const currentIndex = [...children].findIndex((row) => {
      return row === item;
    });
    while (
      cur &&
      cur.childNodes[currentIndex] &&
      (cur.childNodes[currentIndex].nodeType === 8 ||
        cur.childNodes[currentIndex].style.backgroundColor === "pink")
    ) {
      span++;
      let next = cur.nextSibling;
      const currentItem = cur.childNodes[currentIndex];
      console.log(currentItem);
      const parent = currentItem.parentNode;

      const comment = document.createComment("delete");

      if(parent) parent.insertBefore(comment, currentItem);
      if(parent) parent.removeChild(currentItem);
      cur = next;
    }
    item.setAttribute("rowspan", `${span + 1}`);
  }
}
export function mergeRow(item: HTMLElement) {
  let span = 0;
  let rawSpan = item.getAttribute("colspan") ?? 0;
  if (`${rawSpan}` === `1`) {
    item.setAttribute('colspan', '0');
  }
  let cur = item.nextSibling;
  while (cur && cur.style.backgroundColor === "pink") {
    span++;
    let nextSibling = cur.nextSibling;
    const parent = cur.parentNode;

    const comment = document.createComment("delete");
    if (parent) parent.insertBefore(comment, cur);
    if(parent) parent.removeChild(cur);
    cur = nextSibling;
  }
  item.setAttribute("colspan",`${span + 1 + (rawSpan !== 0 ? rawSpan - 1 : 0)}`);
}
