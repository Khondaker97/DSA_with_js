class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.height = 0;
  }
  insert(data, node) {
    if (node == null) return new Node(data);
    if (data < node.data) {
      node.left = this.insert(data, node.left);
    } else if (data > node.data) {
      node.right = this.insert(data, node.right);
    }
    node.height =
      Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    if (this.getBalance(node) == 2 && this.getBalance(node.left) >= 0) {
      return this.rightRotate(node);
    } else if (this.getBalance(node) == 2 && this.getBalance(node.left) < 0) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    } else if (
      this.getBalance(node) == -2 &&
      this.getBalance(node.right) <= 0
    ) {
      return this.leftRotate(node);
    } else if (this.getBalance(node) == -2 && this.getBalance(node.right) > 0) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }
    return node;
  }
  delete(data, node) {
    if (data < node.data && node.left) {
      node.left = this.delete(data, node.left);
    } else if (data > node.data && node.right) {
      node.right = this.delete(data, node.right);
    } else {
      if (node.data === data) {
        if (node.left && node.right) {
          let minVal = this.findMin(node.right);
          node.data = minVal;
          node.right = this.delete(minVal, node.right);
        } else if (node.left) {
          return node.left;
        } else if (node.right) {
          return node.right;
        } else return null;
      }
      node.height =
        Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
      if (this.getBalance(node) == 2 && this.getBalance(node.left) >= 0) {
        return this.rightRotate(node);
      } else if (this.getBalance(node) == 2 && this.getBalance(node.left) < 0) {
        node.left = this.leftRotate(node.left);
        return this.rightRotate(node);
      } else if (
        this.getBalance(node) == -2 &&
        this.getBalance(node.right) <= 0
      ) {
        return this.leftRotate(node);
      } else if (
        this.getBalance(node) == -2 &&
        this.getBalance(node.right) > 0
      ) {
        node.right = this.rightRotate(node.right);
        return this.leftRotate(node);
      }
      return node;
    }
  }
}
class AVL {
  constructor() {
    this.root = null;
  }
  getHeight(node) {
    return node == null ? -1 : node.height;
  }
  getBalance(node) {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }
  leftRotate(x) {
    const y = x.right;
    const yLeftChild = y.left;
    y.left = x;
    x.right = yLeftChild;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(r.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    return y;
  }
  rightRotate(x) {
    const y = x.left;
    const yRightChild = y.right;
    y.right = x;
    x.left = yRightChild;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(r.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    return y;
  }
  insert(data) {
    if (this.root) {
      this.root = this.root.insert(data, this.root);
    } else {
      this.root = new Node(data);
    }
  }
  delete(data) {
    if (this.root) {
      this.root = this.root.delete(data, this.root);
    }
  }
}
