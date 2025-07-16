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
}

export { Tree };
