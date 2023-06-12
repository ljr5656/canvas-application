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
    if (index >= 0 && index < this._children.length) {
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
}
