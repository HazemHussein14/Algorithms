import Queue from "./Queue.js";

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
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

  print() {
    if (this.root === null) {
      console.log("The tree is empty.");
      return;
    }

    const q = new Queue();
    q.enqueue({ node: this.root, level: 0 });
    let currentLevel = 0;
    let output = "";

    while (q.hasData()) {
      let { node, level } = q.dequeue();

      if (level > currentLevel) {
        console.log(output);
        output = "";
        currentLevel = level;
      }

      output += node.data + " ";

      if (node.left !== null) {
        q.enqueue({ node: node.left, level: level + 1 });
      }

      if (node.right !== null) {
        q.enqueue({ node: node.right, level: level + 1 });
      }
    }

    if (output.length > 0) {
      console.log(output);
    }
  }
}

const tree = new BinaryTree();
tree.insert("A");
tree.insert("B");
tree.insert("C");
tree.insert("D");
tree.insert("E");
tree.insert("F");
tree.insert("G");
tree.insert("H");
tree.insert("I");

console.log("Height " + tree.height());

console.log(tree.find("D"));

tree.print();

console.log("----------");
tree.delete("C");
tree.print();
