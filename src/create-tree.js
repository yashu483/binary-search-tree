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
}

export { Tree };
