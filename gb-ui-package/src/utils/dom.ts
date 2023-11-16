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
    const [x, y] = pos;
    console.log(x,y)
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

    document.addEventListener("mousemove", fn,false);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", fn);
    });
  }
  downTarget.addEventListener("mousedown", handler, false);
  document.addEventListener("mouseup", function (e) {
    downTarget.removeEventListener("mousedown", handler);
  },false);
}
