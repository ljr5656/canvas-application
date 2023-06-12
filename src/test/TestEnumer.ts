import {
  IEnumerator,
  IndexerL2R,
  IndexerR2L,
  NodeEnumeratorFactory,
  TreeNode,
} from '../base/treeNode';

class NumberNode extends TreeNode<number> {
  constructor(
    data: number | undefined = undefined,
    parent: TreeNode<number> | undefined = undefined,
    name: string = '',
  ) {
    super(data, parent, name);
  }
}
export class TreeNodeTest {
  // 创建一棵如图9.1所示结构一致的树结构
  public static createTree(): NumberNode {
    let root: NumberNode = new NumberNode(0, undefined, ' root ');
    let node1: NumberNode = new NumberNode(1, root, ' node1 ');
    let node2: NumberNode = new NumberNode(2, root, ' node2 ');
    let node3: NumberNode = new NumberNode(3, root, ' node3 ');
    let node4: NumberNode = new NumberNode(4, node1, ' node4 ');
    let node5: NumberNode = new NumberNode(5, node1, ' node5 ');
    let node6: NumberNode = new NumberNode(6, node2, ' node6 ');
    let node7: NumberNode = new NumberNode(7, node2, ' node7 ');
    let node8: NumberNode = new NumberNode(8, node3, ' node8 ');
    let node9: NumberNode = new NumberNode(9, node4, ' node9 ');
    let node10: NumberNode = new NumberNode(10, node6, ' node10 ');
    let node11: NumberNode = new NumberNode(11, node7, ' node11 ');
    let node12: NumberNode = new NumberNode(12, node11, ' node12 ');
    return root;
  }

  // 辅助方法，根据输入的枚举器，线性输出节点内容
  public static outputNodesInfo(iter: IEnumerator<TreeNode<number>>): string {
    let output: string[] = [];
    let current: TreeNode<number> | undefined = undefined;
    while (iter.moveNext()) {
      current = iter.current;
      if (current !== undefined) {
        output.push(current.name);
      }
    }
    return ' 实际输出：[' + output.join(', ') + ' ] ';
  }
}

let root: NumberNode = TreeNodeTest.createTree();
let iter: IEnumerator<TreeNode<number>>; // IEnumerator枚举器
let current: TreeNode<number> | undefined = undefined;
console.log(' 1、depthFirst_left2rihgt_top2bottom_enumerator ');
iter = NodeEnumeratorFactory.create_df_l2r_t2b_iter<number>(root);
while (iter.moveNext()) {
  current = iter.current;
  if (current !== undefined) {
    console.log(current.repeatString(' ', current.depth * 4) + current.name);
  }
}

// 下面的代码线性输出所有遍历结果，验证迭代的正确性
console.log(' 2、depthFirst_right2left_top2bottom_enumerator ');
console.log(
  ' 应该输出：[ root , node3 , node8 , node2 , node7 , node11 ,node12 , node6 , node10 , node1 , node5 , node4 , node9  ] ',
);
iter = NodeEnumeratorFactory.create_df_r2l_t2b_iter<number>(root);
console.log(TreeNodeTest.outputNodesInfo(iter));

console.log(' 3、depthFirst_left2right_bottom2top_enumerator ');
iter = NodeEnumeratorFactory.create_df_l2r_b2t_iter<number>(root);
console.log(
  ' 应该输出：[ node9 , node4 , node5 , node1 , node10 , node6 ,node12 , node11 , node7 , node2 , node8 , node3 , root  ] ',
);
console.log(TreeNodeTest.outputNodesInfo(iter));

console.log(' 4、depthFirst_right2left_bottom2top_enumerator ');
iter = NodeEnumeratorFactory.create_df_r2l_b2t_iter<number>(root);
console.log(
  ' 应该输出：[ node8 , node3 , node12 , node11 , node7 , node10 ,node6 , node2 , node5 , node9 , node4 , node1 , root  ] ',
);
console.log(TreeNodeTest.outputNodesInfo(iter));

console.log(' 5、breadthFirst_left2right_top2bottom_enumerator ');
iter = NodeEnumeratorFactory.create_bf_l2r_t2b_iter<number>(root);
console.log(
  ' 应该输出：[ root , node1 , node2 , node3 , node4 , node5 ,node6 , node7 , node8 , node9 , node10 , node11 , node12  ] ',
);
console.log(TreeNodeTest.outputNodesInfo(iter));

console.log(' 6、breadthFirst_rihgt2left_top2bottom_enumerator ');
iter = NodeEnumeratorFactory.create_bf_r2l_t2b_iter<number>(root);
console.log(
  ' 应该输出：[ root , node3 , node2 , node1 , node8 , node7 ,node6 , node5 , node4 , node11 , node10 , node9 , node12  ] ',
);
console.log(TreeNodeTest.outputNodesInfo(iter));

console.log(' 7、breadthFirst_left2right_bottom2top_enumerator ');
iter = NodeEnumeratorFactory.create_bf_l2r_b2t_iter<number>(root);
console.log(
  ' 应该输出：[ node12 , node9 , node10 , node11 , node4 , node5 ,node6 , node7 , node8 , node1 , node2 , node3 , root  ] ',
);
console.log(TreeNodeTest.outputNodesInfo(iter));

console.log(' 8、breadthFirst_right2left_bottom2top_enumerator ');
iter = NodeEnumeratorFactory.create_bf_r2l_b2t_iter<number>(root);
console.log(
  ' 应该输出：[ node12 , node11 , node10 , node9 , node8 , node7 ,node6 , node5 , node4 , node3 , node2 , node1 , root  ] ',
);
console.log(TreeNodeTest.outputNodesInfo(iter));

function printNodeInfo(node: NumberNode): void {
  console.log(node.name);
}

// root.visit(printNodeInfo, null, IndexerL2R);
// 深度优先、从上到下（先根)、从左到右遍历
// root.visit(printNodeInfo, null, IndexerR2L);
// // 深度优先、从上到下（先根)、从右到左遍历
// root.visit(null, printNodeInfo, IndexerL2R);
// // 深度优先、从下到上（后根)、从左到右遍历
// root.visit(null, printNodeInfo, IndexerR2L);
// // 深度优先、从下到上（后根)、从右到左遍历
// root.visit(printNodeInfo, printNodeInfo, IndexerL2R);
// // 先根和后根回调同时触发
// root.visit(printNodeInfo, printNodeInfo, IndexerR2L);
// // 先根和后根回调同时触发

// root.visitForward(printNodeInfo, null);

for (
  let n: TreeNode<number> | undefined = root;
  n !== undefined;
  n = n.moveNext()
) {
  // 缩进层次输出节点名
  console.log('moveNext : ' + n.repeatString(' ', n.depth * 4) + n.name);
}

for (
  let n: TreeNode<number> | undefined = root;
  n !== undefined;
  n = n.movePrev()
) {
  // 缩进层次输出节点名
  console.log('movePrev : ' + n.repeatString(' ', n.depth * 4) + n.name);
}
