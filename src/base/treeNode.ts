export class TreeNode<T> {
  private _parent: TreeNode<T> | undefined;
  private _children: TreeNode<T>[] | undefined;
  public name: string;
  public data: T | undefined;

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

  public getChildAt(index: number): TreeNode<T> | undefined {
    if (this._children === undefined || this._children.length === 0) {
      return undefined;
    }
  }
}
