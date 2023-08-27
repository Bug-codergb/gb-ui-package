export function generateTree(link: any) {
  console.log(link);
  let tree:any[] = [];
  if (!link || Object.keys(link).length === 0) {
    return tree;
  }
  tree.push({
    id: link.id,
    name: link.name,
    el: null,
    parentEl: null,
    indeterminate: false,
    parentId: link.parentId,
    children: link.next?[link.next]:[],
    isExpand: false,
    isSelect: false,
    inputRef: null,
    parentNode:null
  });
  if (link.next) {
    const children = generateTree(link.next);
    tree[0].children = children??[];
  }
  return tree;
}
export function mergeTree(n1: any, n2: any) {
  console.log(n1,n2)
  const { id } = n2[0];
  const isExists = n1.findIndex((row) => {
    return row.id === id;
  })
  if (isExists === -1) {
    console.log(n1,n2)
    n1.push(n2[0]);
    return;
  }
  const oldNode = n1[isExists];
  mergeTree(oldNode.children,n2[0].children);
}