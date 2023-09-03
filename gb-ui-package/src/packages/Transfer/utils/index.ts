export function generateTree(link: any) {
  let tree:any[] = [];
  if (!link || Object.keys(link).length === 0) {
    return tree;
  }
  if (Array.isArray(link)) {
    for (let item of link) {
      tree.push({
        id: item.id,
        name: item.name,
        el: null,
        parentEl: null,
        indeterminate: false,
        parentId: item.parentId,
        children: item.next?item.next:[],
        isExpand: false,
        isSelect: false,
        inputRef: null,
        parentNode:null
      });
    }
  } else {
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
  }
  
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
    n1.push(n2[0]);
    return;
  }
  const oldNode = n1[isExists];
  mergeTree(oldNode.children,n2[0].children);
}
export function generateParent(tree:any[]) {
  let queue:any = [];
  queue.push(...tree);
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++){
      const node = queue.shift();
      node.hasChildren = false;
      if (node.children && node.children.length !== 0) {
        node.hasChildren = true;
        for (let i = 0; i < node.children.length; i++){
          const item = node.children[i];
          item.parent = node;
          if(item){
            queue.push(item);
          }
        }
      } 
    }
  }
}
export function removeTreeNode(tree: any[]) {
  generateParent(tree);
  let queue:any = [];
  queue.push(...tree);
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++){
      const node = queue.shift();
      if (node.children && node.children.length !== 0) {
        for (let i = 0; i < node.children.length; i++){
          const item = node.children[i];
          if (item.isSelect) {
            node.children.splice(i, 1);
            i--;
          } else if(item){
            queue.push(item);
          }
        }
        if (node.hasChildren && node.children.length === 0) {
          const index = node.parent.children.findIndex((it: any) => it.id === node.id);
          if (index !== -1) {
            node.parent.children.splice(index,1);
          }
        }
      } 
      const parent = node.parent;
      if (parent && parent.hasChildren && parent.children.length === 0) {
        const index = parent.parent ? parent.parent.children.findIndex((it: any) => it.id === parent.id) : -1;
        if (index !== -1) {
          parent.parent.children.splice(index, 1);
        }
      }
    }
  }
}