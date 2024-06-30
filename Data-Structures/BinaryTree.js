import Queue from "./Queue.js";
import tree from "pretty-tree";

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class NodeAndParent {
  constructor(node, parent, isLeft) {
    this.node = node;
    this.parent = parent;
    this.isLeft = isLeft;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  balance() {
    const nodes = [];
    this.inOrderToArray(this.root, nodes);
    this.root = this.recursiveBalance(0, nodes.length - 1, nodes);
  }

  inOrderToArray(node, nodes) {
    if (node == null) return;

    this.inOrderToArray(node.left, nodes);
    nodes.push(node.data);
    this.inOrderToArray(node.right, nodes);
  }

  recursiveBalance(start, end, nodes) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    const newNode = new TreeNode(nodes[mid]);
    newNode.left = this.recursiveBalance(start, mid - 1, nodes);
    newNode.right = this.recursiveBalance(mid + 1, end, nodes);
    return newNode;
  }

  // Binary Search Tree Insert
  BSInsert(data) {
    const newNode = new TreeNode(data);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;

    while (currentNode !== null) {
      if (currentNode.data > data) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          break;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          break;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  // Binary Search Tree Find
  #BSFind(data) {
    if (this.root === null) return null;

    let currentNode = this.root;

    while (currentNode) {
      if (currentNode.data === data) {
        return currentNode;
      } else if (currentNode.data > data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  // Binary Search Tree Node Exists or not
  BSIsExist(data) {
    return this.#BSFind(data) !== null;
  }

  // Binary Search Tree Find Node And Parent
  findNodeAndParent(data) {
    let currentNode = this.root;
    let parent = null;
    let nodeAndParent = null;
    let isLeft = false;

    while (currentNode) {
      if (currentNode.data === data) {
        nodeAndParent = new NodeAndParent(currentNode, parent, isLeft);
        break;
      } else if (currentNode.data > data) {
        parent = currentNode;
        isLeft = true;
        currentNode = currentNode.left;
      } else {
        parent = currentNode;
        isLeft = false;
        currentNode = currentNode.right;
      }
    }
    return nodeAndParent;
  }

  insert(data) {
    const newNode = new TreeNode(data);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    const q = new Queue();
    q.enqueue(this.root);
    while (q.hasData()) {
      let currentNode = q.dequeue();

      if (currentNode.left === null) {
        currentNode.left = newNode;
        break;
      } else {
        q.enqueue(currentNode.left);
      }

      if (currentNode.right === null) {
        currentNode.right = newNode;
        break;
      } else {
        q.enqueue(currentNode.right);
      }
    }
  }

  height() {
    return this.#internalHeight(this.root);
  }

  #internalHeight(node) {
    if (node === null) return 0;

    return (
      1 +
      Math.max(
        this.#internalHeight(node.left),
        this.#internalHeight(node.right)
      )
    );
  }

  preOrder() {
    console.log("pre order");
    this.#internalPreOrder(this.root);
  }

  #internalPreOrder(node) {
    if (node === null) return;

    console.log(node.data + " ->");
    this.#internalPreOrder(node.left);
    this.#internalPreOrder(node.right);
  }

  inOrder() {
    this.#internalInOrder(this.root);
    console.log("In order");
  }

  #internalInOrder(node) {
    if (node === null) return;

    this.#internalInOrder(node.left);
    console.log(node.data + " ->");
    this.#internalInOrder(node.right);
  }

  postOrder() {
    console.log("post order");
    this.#internalPostOrder(this.root);
  }

  #internalPostOrder(node) {
    if (node === null) return;

    this.#internalPostOrder(node.left);
    this.#internalPostOrder(node.right);
    console.log(node.data + " ->");
  }

  find(data) {
    if (this.root === null) return null;

    const q = new Queue();
    q.enqueue(this.root);

    while (q.hasData()) {
      let currentNode = q.dequeue();

      if (currentNode.data === data) {
        return currentNode;
      }

      if (typeof currentNode.data === "object") {
        for (const key in currentNode.data) {
          if (currentNode.data[key] === data) return currentNode;
        }
      }

      if (currentNode.left !== null) {
        q.enqueue(currentNode.left);
      }

      if (currentNode.right !== null) {
        q.enqueue(currentNode.right);
      }
    }

    return null;
  }

  delete(data) {
    if (this.root === null) return;

    const nodeToDelete = this.find(data);
    if (!nodeToDelete) return;

    let deepestNode = null;
    let deepestNodeParent = null;
    const q = new Queue();
    q.enqueue(this.root);

    while (q.hasData()) {
      let currentNode = q.dequeue();

      if (currentNode.left !== null) {
        q.enqueue(currentNode.left);
        deepestNodeParent = currentNode;
        deepestNode = currentNode.left;
      }

      if (currentNode.right !== null) {
        q.enqueue(currentNode.right);
        deepestNodeParent = currentNode;
        deepestNode = currentNode.right;
      }
    }

    if (nodeToDelete && deepestNode) {
      nodeToDelete.data = deepestNode.data;

      if (deepestNodeParent.right === deepestNode) {
        deepestNodeParent.right = null;
      } else {
        deepestNodeParent.left = null;
      }
    }
  }

  BSDelete(data) {
    const nodeAndParentInfo = this.findNodeAndParent(data);

    if (nodeAndParentInfo.node === null) return;

    if (
      (nodeAndParentInfo.node.left !== null) &
      (nodeAndParentInfo.node.right !== null)
    ) {
      this.#BSDelete_Has_Childs(nodeAndParentInfo.node);
    } else if (
      (nodeAndParentInfo.node.left !== null) ^
      (nodeAndParentInfo.node.right !== null)
    ) {
      this.#BSDelete_Has_One_Child(nodeAndParentInfo.node);
    } else {
      this.#BSDelete_Leaf(nodeAndParentInfo);
    }
  }

  #BSDelete_Has_Childs(nodeToDelete) {
    let currentNode = nodeToDelete.right;
    let parent = null;

    while (currentNode.left !== null) {
      parent = currentNode;
      currentNode = currentNode.left;
    }
    if (parent !== null) {
      parent.left = currentNode.right;
    } else {
      nodeToDelete.right = currentNode.right;
    }
    nodeToDelete.data = currentNode.data;
  }

  #BSDelete_Has_One_Child(nodeToDelete) {
    let nodeToReplace = null;
    if (nodeToDelete.left !== null) {
      nodeToReplace = nodeToDelete.left;
    } else {
      nodeToReplace = nodeToDelete.right;
    }
    nodeToDelete.data = nodeToReplace.data;
    nodeToDelete.left = nodeToReplace.left;
    nodeToDelete.right = nodeToReplace.right;
  }

  #BSDelete_Leaf(nodeToDelete) {
    if (nodeToDelete.parent === null) {
      this.root = null;
    } else {
      if (nodeToDelete.isLeft) {
        nodeToDelete.parent.left = null;
      } else {
        nodeToDelete.parent.right = null;
      }
    }
  }

  convertToPrettyTreeFormat(node) {
    if (!node) return null;
    return {
      label: node.data,
      nodes: [
        this.convertToPrettyTreeFormat(node.left),
        this.convertToPrettyTreeFormat(node.right),
      ].filter((child) => child !== null),
    };
  }

  print() {
    if (this.root === null) {
      console.log("The tree is empty.");
      return;
    }

    const treeForPrinting = this.convertToPrettyTreeFormat(this.root);
    const printedTree = tree(treeForPrinting);
    console.log(printedTree); // Final output
  }
}

const bTree = new BinaryTree();
// bTree.insert("A");
// bTree.insert("B");
// bTree.insert("C");
// bTree.insert("D");
// bTree.insert("E");
// bTree.insert("F");
// bTree.insert("G");
// bTree.insert("H");
// bTree.insert("I");

// console.log("Height " + bTree.height());

// console.log(bTree.find("D"));

// bTree.print();

// console.log("----------");
// bTree.delete("C");
// bTree.print();

// bTree.BSInsert(1);
// bTree.BSInsert(2);
// bTree.BSInsert(3);
// bTree.BSInsert(4);
// bTree.BSInsert(5);
// bTree.BSInsert(6);

// bTree.BSInsert(1);
// bTree.BSInsert(4);
// bTree.BSInsert(2);
// bTree.BSInsert(3);
// bTree.BSInsert(6);
// bTree.BSInsert(5);

// bTree.BSInsert(4);
// bTree.BSInsert(6);
// bTree.BSInsert(7);
// bTree.BSInsert(5);
// bTree.BSInsert(2);
// bTree.BSInsert(1);
// bTree.BSInsert(3);

// console.log(bTree.BSIsExist(10));

// console.log(bTree.findNodeAndParent(3));
// bTree.BSDelete(4);
// bTree.print();

// bTree.BSDelete(6);
// bTree.print();

// bTree.BSDelete(3);
// bTree.print();

// bTree.BSDelete(5);
// bTree.print();

// bTree.BSDelete(7);
// bTree.print();

// bTree.BSDelete(2);
// bTree.print();

// bTree.BSDelete(1);
// bTree.print();

bTree.BSInsert(1);
bTree.BSInsert(2);
bTree.BSInsert(3);
bTree.BSInsert(4);
bTree.BSInsert(5);
bTree.BSInsert(6);
bTree.BSInsert(7);
bTree.print();

bTree.balance();
bTree.print();
