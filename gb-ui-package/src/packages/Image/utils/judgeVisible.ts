export function judgeVisible(el:HTMLElement,containerHeight:number) {
  return el.getBoundingClientRect().top <= containerHeight;
}