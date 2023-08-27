export function levelTree(data: any[], options?: { key: string, value: any }) {
  let queue:any[] = [];
      queue.push(...data);
      while (queue.length) {
        const len = queue.length;
        for (let i = 0; i < len;i++) {
          const node:any = queue.shift();
          if (options) {
            const { key, value } = options;
            node[key] = typeof value === 'function' ? value():value;
          }
          if (node.children && node.children.length!==0) {
            for (let item of node.children) { 
              if (item) {
                item.parentNode = node;
                queue.push(item);
                }
            }
          }
        }
      }
}