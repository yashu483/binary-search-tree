'use strict';

import { Node } from './create-node';

class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(this.array);
  }

  #createBalancedBST(arr, start, end) {
    if (start > end) return null;

    let mid = start + Math.round((end - start) / 2);
    console.log(mid);

    const root = new Node(arr[mid]);
    root.left = this.#createBalancedBST(arr, start, mid - 1);
    root.right = this.#createBalancedBST(arr, mid + 1, end);
    return root;
  }
  buildTree(array) {
    return this.#createBalancedBST(array, 0, array.length - 1);
  }
  prettyPrint = (node = this.root, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  insert(value) {
    const insertRec = function insertRec(root, value) {
      if (root === null) {
        const node = new Node(value);
        return node;
      }

      if (root.data === value) {
        return root;
      }

      if (value < root.data) {
        root.left = insertRec(root.left, value);
      } else if (value > root.data) {
        root.right = insertRec(root.right, value);
      }
      return root;
    };
    insertRec(this.root, value);
  }
  delete(value) {
    const findSuccessor = function findSuccessor(curr) {
      curr = curr.right;
      while (curr !== null && curr.left !== null) {
        curr = curr.left;
      }
      return curr;
    };

    const deleteRec = function deleteRec(root, value) {
      if (root === null) {
        return root;
      }

      if (root.data > value) {
        root.left = deleteRec(root.left, value);
      } else if (root.data < value) {
        root.right = deleteRec(root.right, value);
      } else {
        if (root.left === null) {
          return root.right;
        }
        if (root.right === null) {
          return root.left;
        }
        const successor = findSuccessor(root);
        root.data = successor.data;
        root.right = deleteRec(root.right, successor.data);
      }
      return root;
    };
    deleteRec(this.root, value);
  }

  find(value) {
    let currentRoot = this.root;
    while (currentRoot.data !== value) {
      if (value < currentRoot.data) {
        currentRoot = currentRoot.left;
      } else {
        currentRoot = currentRoot.right;
      }
      if (currentRoot === null) {
        return null;
      }
    }

    return currentRoot;
  }
  levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback is required');
    }
    let currentRoot = this.root;
    let que = [currentRoot];
    while (que.length !== 0) {
      if (que[0] === null) {
        que.shift();
        currentRoot = que[0];
        continue;
      }
      que.push(currentRoot.left);
      que.push(currentRoot.right);

      let item = que.shift();

      callback(item);
      currentRoot = que[0];
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Error: argument to method should be a function');
    }

    const inOrder = function inOrder(root) {
      if (root.left === null && root.right === null) {
        callback(root);
      } else if (root.left !== null) {
        inOrder(root.left);

        callback(root);
      } else if (root.left === null) {
        callback(root);
      }
      if (root.right !== null) {
        inOrder(root.right);
      }
    };
    inOrder(this.root);
  }

  preOrderForEach(callback) {
    const preOrder = function preOrder(root) {
      if (root.left === null && root.right === null) {
        callback(root);
      } else if (root.left !== null) {
        callback(root);
        preOrder(root.left);
      } else if (root.left === null) {
        callback(root);
      }
      if (root.right !== null) {
        preOrder(root.right);
      }
    };
    preOrder(this.root);
  }

  postOrderForEach(callback) {
    const postOrder = function postOrder(root) {
      if (root.left === null && root.right === null) {
        callback(root);
      } else if (root.left !== null) {
        postOrder(root.left);
        if (root.right !== null) {
          postOrder(root.right);
          callback(root);
          return;
        }
        callback(root);
      } else if (root.left === null && root.right !== null) {
        postOrder(root.right);
        callback(root);
      }
    };
    postOrder(this.root);
  }
  #findHeight(root) {
    if (root === null) return 0;
    if (root.left === null && root.right === null) {
      return 0;
    } else if (root.left === null || root.right === null) {
      if (root.left === null) return this.#findHeight(root.right) + 1;
      return this.#findHeight(root.left) + 1;
    } else {
      let left = this.#findHeight(root.left);
      let right = this.#findHeight(root.right);
      return Math.max(left, right) + 1;
    }
  }
  height(value) {
    let currentRoot = this.root;
    while (currentRoot.data !== value) {
      if (value < currentRoot.data) {
        currentRoot = currentRoot.left;
      } else {
        currentRoot = currentRoot.right;
      }
      if (currentRoot === null) {
        return null;
      }
    }
    if (currentRoot === null) return null;

    return this.#findHeight(currentRoot);
  }

  depth(value) {
    let currentRoot = this.root;
    let count = 0;
    while (currentRoot.data !== value) {
      if (value < currentRoot.data) {
        count += 1;
        currentRoot = currentRoot.left;
      } else {
        count += 1;
        currentRoot = currentRoot.right;
      }
      if (currentRoot === null) {
        return null;
      }
    }
    if (currentRoot === null) return null;
    return count;
  }
  isBalanced() {
    const rightDepth = this.#findHeight(this.root.right);
    const leftDepth = this.#findHeight(this.root.left);
    console.log(leftDepth, rightDepth);
    const dif =
      Math.max(rightDepth, leftDepth) - Math.min(rightDepth, leftDepth);
    console.log(dif);
    if (dif > 1) return false;
    return true;
  }
}

export { Tree };
