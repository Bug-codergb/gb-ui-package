export function renderImg(src:string) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  })
}