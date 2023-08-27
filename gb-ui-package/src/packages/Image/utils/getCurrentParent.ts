export function getCurrentParent(el:HTMLElement) {
  let _parent = el.parentNode;
  while (_parent) {
    const overflowStyle = getComputedStyle(_parent as Element)['overflow'];
    if (/(auto)|(scroll)/.test(overflowStyle)) {
      return _parent;
    }
    _parent = _parent.parentNode;
  }
}