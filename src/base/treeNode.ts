export class TreeNode<T> {
  private _parent: TreeNode<T> | undefined;
  private _children: TreeNode<T>[] | undefined;
  public name: string;
  public data: T | undefined;

  constructor(
    data: T | undefined = undefined,
    parent: TreeNode<T> | undefined = undefined,
    name: string = '',
  ) {
    this._parent = parent;
    this._children = undefined;
    this.name = name;
    this.data = data;

    if (this._parent !== undefined) {
      this._parent.addChild(this);
    }
  }

  // this节点是否为ancestor节点的子孙节点
  public isDescendantOf(ancestor: TreeNode<T> | undefined): boolean {
    if (ancestor === undefined) {
      return false;
    }
    for (
      let node: TreeNode<T> | undefined = this._parent;
      node !== undefined;
      node = node._parent
    ) {
      if (node === ancestor) {
        return true;
      }
    }

    return false;
  }

  // 移处某个节点
  public removeChildAt(index: number): TreeNode<T> | undefined {
    if (this._children === undefined || this._children.length === 0) {
      return undefined;
    }
    let child: TreeNode<T> | undefined = this.getChildAt(index);
    if (child === undefined) {
      return undefined;
    }

    this._children.splice(index, 1);
    child._parent = undefined;
    return child;
  }

  public removeChild(child: TreeNode<T> | undefined): TreeNode<T> | undefined {
    if (child === undefined || this._children === undefined) {
      return undefined;
    }
    let index: number = -1;
    for (let i = 0; i < this._children.length; i++) {
      if (this.getChildAt(i) === child) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      return undefined;
    }
    return this.removeChildAt(index);
  }

  //添加节点
  public addChildAt(
    child: TreeNode<T> | undefined,
    index: number,
  ): TreeNode<T> | undefined {
    // 如果添加的节点是当前节点的祖先节点, 会造成循环引用
    if (this.isDescendantOf(child) || child === undefined) {
      return undefined;
    }
    if (this._children === undefined) {
      this._children = [];
    }
    if (index >= 0 && index <= this._children.length) {
      // 如果要添加的节点有父节点, 从其父节点中remove掉
      if (child._parent !== undefined) {
        child._parent.removeChild(child);
      }

      child._parent = this;
      this._children.splice(index, 0, child);
      return child;
    } else {
      return undefined;
    }
  }

  public addChild(child: TreeNode<T> | undefined): TreeNode<T> | undefined {
    if (this._children === undefined) {
      this._children = [];
    }
    this.addChildAt(child, this._children.length);
    return child;
  }

  //获取儿子节点
  public getChildAt(index: number): TreeNode<T> | undefined {
    if (this._children === undefined) {
      return undefined;
    }

    return this._children[index];
  }

  //获取当前节点儿子节点数量
  public get childCount(): number {
    if (this._children !== undefined) {
      return this._children.length;
    } else {
      return 0;
    }
  }

  // 当前节点是否存在儿子节点
  public hasChild(): boolean {
    return this._children !== undefined && this._children.length > 0;
  }

  public get parent(): TreeNode<T> | undefined {
    return this._parent;
  }
  public get children(): TreeNode<T>[] | undefined {
    return this._children;
  }

  // 获取根节点
  public get root(): TreeNode<T> | undefined {
    let curr: TreeNode<T> | undefined = this;
    while (curr !== undefined && curr.parent !== undefined) {
      curr = curr.parent;
    }
    return curr;
  }

  // 获取当前节点深度
  public get depth(): number {
    let curr: TreeNode<T> | undefined = this;
    let level = 0;
    while (curr !== undefined && curr.parent !== undefined) {
      curr = curr.parent;
      level++;
    }
    return level;
  }

  public get firstChild(): TreeNode<T> | undefined {
    if (this._children !== undefined && this._children.length > 0) {
      return this._children[0];
    } else {
      return undefined;
    }
  }

  public get lastChild(): TreeNode<T> | undefined {
    if (this._children !== undefined && this._children.length > 0) {
      return this._children[this._children.length - 1];
    } else {
      return undefined;
    }
  }

  //获取当前节点右兄弟节点
  public get nextSibling(): TreeNode<T> | undefined {
    if (this._parent === undefined) {
      return undefined;
    }
    if (
      this._parent._children !== undefined &&
      this._parent._children.length > 1
    ) {
      let idx: number = -1;
      for (let i = 0; i < this._parent._children.length; i++) {
        if (this === this._parent._children[i]) {
          idx = i;
          break;
        }
      }

      if (idx !== this._parent._children.length - 1) {
        return this._parent._children[idx + 1];
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  //获取当前节点左兄弟节点
  public get prevSibling(): TreeNode<T> | undefined {
    if (this._parent === undefined) {
      return undefined;
    }
    if (
      this._parent._children !== undefined &&
      this._parent._children.length > 1
    ) {
      let idx: number = -1;
      for (let i = 0; i < this._parent._children.length; i++) {
        if (this === this._parent._children[i]) {
          idx = i;
          break;
        }
      }
      if (idx !== 0) {
        return this._parent._children[idx - 1];
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  //获取当前树最左侧节点
  public get mostLeft(): TreeNode<T> | undefined {
    let node: TreeNode<T> | undefined = this;
    // 以深度优先方式不断调用firstChild
    while (true) {
      let subNode: TreeNode<T> | undefined = undefined;
      if (node !== undefined) {
        subNode = node.firstChild;
      }
      if (subNode === undefined) {
        break;
      }
      node = subNode;
    }

    return node;
  }

  //获取当前树最右侧节点
  public get mosrRight(): TreeNode<T> | undefined {
    let node: TreeNode<T> | undefined = this;
    // 以深度优先方式不断调用lastChild
    while (true) {
      let subNode: TreeNode<T> | undefined = undefined;
      if (node !== undefined) {
        subNode = node.lastChild;
      }
      if (subNode === undefined) {
        break;
      }
      node = subNode;
    }

    return node;
  }

  // 将一个字符串输出n次
  public repeatString(target: string, n: number): string {
    let total: string = '';
    for (let i = 0; i < n; i++) {
      total += target;
    }
    return total;
  }

  public visit(
    preOrderFunc: NodeCallback<T> | null = null,
    postOrderFunc: NodeCallback<T> | null = null,
    indexFunc: Indexer = IndexerL2R,
  ): void {
    if (preOrderFunc !== null) {
      preOrderFunc(this);
    }
    let arr: Array<TreeNode<T>> | undefined = this._children;
    if (arr !== undefined) {
      for (let i: number = 0; i < arr.length; i++) {
        let child: TreeNode<T> | undefined = this.getChildAt(
          indexFunc(arr.length, i),
        );
        if (child !== undefined) {
          child.visit(preOrderFunc, postOrderFunc, indexFunc);
        }
      }
    }

    if (postOrderFunc !== null) {
      postOrderFunc(this);
    }
  }

  public visitForward(
    preOrderFunc: NodeCallback<T> | null = null,
    postOrderFunc: NodeCallback<T> | null = null,
  ): void {
    if (preOrderFunc) {
      preOrderFunc(this);
    }
    let node: TreeNode<T> | undefined = this.firstChild;

    while (node !== undefined) {
      node.visitForward(preOrderFunc, postOrderFunc);
      node = node.nextSibling;
    }
    if (postOrderFunc) {
      postOrderFunc(this);
    }
  }

  public visitBackward(
    preOrderFunc: NodeCallback<T> | null = null,
    postOrderFunc: NodeCallback<T> | null = null,
  ): void {
    if (preOrderFunc) {
      preOrderFunc(this);
    }
    let node: TreeNode<T> | undefined = this.firstChild;

    while (node !== undefined) {
      node.visitBackward(preOrderFunc, postOrderFunc);
      node = node.prevSibling;
    }
    if (postOrderFunc) {
      postOrderFunc(this);
    }
  }
}

export type NodeCallback<T> = (node: TreeNode<T>) => void;

export interface IAdapter<T> {
  add(t: T): void;
  remove(): T | undefined;
  clear(): void;
  length: number;
  isEmpty: boolean;
}
export type Indexer = (len: number, idx: number) => number;
export function IndexerL2R(len: number, idx: number): number {
  return idx;
}
export function IndexerR2L(len: number, idx: number): number {
  return len - idx - 1;
}
export interface IEnumerator<T> {
  reset(): void;
  moveNext(): boolean;
  readonly current: T | undefined;
}

export interface IEnumerable<T> {
  getEnumerator(): IEnumerator<T>;
}
export abstract class AdapterBase<T> implements IAdapter<T> {
  protected _arr: Array<T>;

  public constructor() {
    this._arr = new Array<T>();
  }

  public add(t: T): void {
    this._arr.push(t);
  }

  public abstract remove(): T | undefined;

  public get length(): number {
    return this._arr.length;
  }

  public get isEmpty(): boolean {
    return this._arr.length <= 0;
  }

  public clear(): void {
    this._arr = new Array<T>();
  }

  public toString(): string {
    return this._arr.toString();
  }
}

export class Stack<T> extends AdapterBase<T> {
  public remove(): T | undefined {
    if (this._arr.length > 0) return this._arr.pop();
    else return undefined;
  }
}

export class Queue<T> extends AdapterBase<T> {
  public remove(): T | undefined {
    if (this._arr.length > 0) return this._arr.shift();
    else return undefined;
  }
}

export class NodeT2BEnumerator<
  T,
  IdxFunc extends Indexer,
  Aadpter extends IAdapter<TreeNode<T>>,
> implements IEnumerator<TreeNode<T>>
{
  private _node: TreeNode<T> | undefined; // 头节点, 指向输入的根节点
  private _adapter!: IAdapter<TreeNode<T>>; // 枚举器内部持有一个队列或堆栈的适配器, 用于存储遍历的元素, 指向泛型参数
  private _currNode!: TreeNode<T> | undefined; // 当前正在操作的节点类型
  private _indexer!: IdxFunc; // 当前的Indexer, 用于选择从左到右还是从右到左遍历, 指向泛型参数

  constructor(
    node: TreeNode<T> | undefined,
    func: IdxFunc,
    adapter: new () => Aadpter,
  ) {
    if (node === undefined) {
      return;
    }
    this._node = node;
    this._indexer = func;
    this._adapter = new adapter();
    this._adapter.add(this._node);
    this._currNode = undefined;
  }

  // 实现接口方法, reset枚举器
  public reset(): void {
    if (this._node === undefined) {
      return;
    }
    this._currNode = undefined;
    this._adapter.clear();
    this._adapter.add(this._node);
  }

  // 实现接口方法, false表示枚举结束
  public moveNext(): boolean {
    if (this._adapter.isEmpty) {
      return false;
    }
    // 弹出头部或尾部
    this._currNode = this._adapter.remove();
    if (this._currNode !== undefined) {
      let len: number = this._currNode.childCount;
      for (let i = 0; i < len; i++) {
        let childIdx: number = this._indexer(len, i);
        let child: TreeNode<T> | undefined =
          this._currNode.getChildAt(childIdx);
        if (child !== undefined) {
          this._adapter.add(child);
        }
      }
    }
    return true;
  }

  // 实现接口current
  public get current(): TreeNode<T> | undefined {
    return this._currNode;
  }
}

export class NodeB2TEnumerator<T> implements IEnumerator<TreeNode<T>> {
  private _iter: IEnumerator<TreeNode<T>>;
  private _arr!: Array<TreeNode<T> | undefined>;
  private _arrIdx!: number;

  constructor(iter: IEnumerator<TreeNode<T>>) {
    this._iter = iter;
    this.reset();
  }

  public reset(): void {
    this._arr = [];
    while (this._iter.moveNext()) {
      this._arr.push(this._iter.current);
    }

    this._arrIdx = this._arr.length;
  }

  public get current(): TreeNode<T> | undefined {
    if (this._arrIdx >= this._arr.length) {
      return undefined;
    } else {
      return this._arr[this._arrIdx];
    }
  }

  public moveNext(): boolean {
    this._arrIdx--;
    return this._arrIdx >= 0 && this._arrIdx < this._arr.length;
  }
}

export class NodeEnumeratorFactory {
  // 创建深度优先( stack )、从左到右 ( IndexerR2L ) 、从上到下的枚举器
  public static create_df_l2r_t2b_iter<T>(
    node: TreeNode<T> | undefined,
  ): IEnumerator<TreeNode<T>> {
    let iter: IEnumerator<TreeNode<T>> = new NodeT2BEnumerator(
      node,
      IndexerR2L,
      Stack,
    );
    return iter;
  }
  // 创建深度优先( stack )、从右到左( IndexerL2R )、从上到下的枚举器
  public static create_df_r2l_t2b_iter<T>(
    node: TreeNode<T> | undefined,
  ): IEnumerator<TreeNode<T>> {
    let iter: IEnumerator<TreeNode<T>> = new NodeT2BEnumerator(
      node,
      IndexerL2R,
      Stack,
    );
    return iter;
  }

  // 创建广度优先( Queue )、从左到右( IndexerL2R )、从上到下的枚举器
  public static create_bf_l2r_t2b_iter<T>(
    node: TreeNode<T> | undefined,
  ): IEnumerator<TreeNode<T>> {
    let iter: IEnumerator<TreeNode<T>> = new NodeT2BEnumerator(
      node,
      IndexerL2R,
      Queue,
    );
    return iter;
  }

  // 创建广度优先( Queue )、从右到左( IndexerR2L )、从上到下的枚举器
  public static create_bf_r2l_t2b_iter<T>(
    node: TreeNode<T> | undefined,
  ): IEnumerator<TreeNode<T>> {
    let iter: IEnumerator<TreeNode<T>> = new NodeT2BEnumerator(
      node,
      IndexerR2L,
      Queue,
    );
    return iter;
  }

  // 上面都是从上到下(先根)遍历
  // 下面都是从下到上(后根)遍历，是对上面的从上到下(先根)枚举器的包装

  // 创建深度优先、从左到右、从下到上的枚举器
  public static create_df_l2r_b2t_iter<T>(
    node: TreeNode<T> | undefined,
  ): IEnumerator<TreeNode<T>> {
    //向上转型，自动(向下转型，需要as或< >手动)
    let iter: IEnumerator<TreeNode<T>> = new NodeB2TEnumerator<T>(
      NodeEnumeratorFactory.create_df_r2l_t2b_iter(node),
    );
    return iter;
  }
  // 创建深度优先、从右到左、从下到上的枚举器
  public static create_df_r2l_b2t_iter<T>(
    node: TreeNode<T> | undefined,
  ): IEnumerator<TreeNode<T>> {
    let iter: IEnumerator<TreeNode<T>> = new NodeB2TEnumerator<T>(
      NodeEnumeratorFactory.create_df_l2r_t2b_iter(node),
    );
    return iter;
  }

  // 创建广度优先、从左到右、从下到上的枚举器
  public static create_bf_l2r_b2t_iter<T>(
    node: TreeNode<T> | undefined,
  ): IEnumerator<TreeNode<T>> {
    let iter: IEnumerator<TreeNode<T>> = new NodeB2TEnumerator<T>(
      NodeEnumeratorFactory.create_bf_r2l_t2b_iter(node),
    );
    return iter;
  }

  // 创建广度优先、从右到左、从下到上的枚举器
  public static create_bf_r2l_b2t_iter<T>(
    node: TreeNode<T> | undefined,
  ): IEnumerator<TreeNode<T>> {
    let iter: IEnumerator<TreeNode<T>> = new NodeB2TEnumerator<T>(
      NodeEnumeratorFactory.create_bf_l2r_t2b_iter(node),
    );
    return iter;
  }
}

export class LinkTreeNode<T> {
  private _parent: LinkTreeNode<T> | undefined;
  private _firstChild: LinkTreeNode<T> | undefined;
  private _lastChild: LinkTreeNode<T> | undefined;
  private _nextSibling: LinkTreeNode<T> | undefined;
  private _prevSibling: LinkTreeNode<T> | undefined;
  public name: string = '';
  public data: T | undefined;
}
