class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedListIterator {
  constructor(node) {
    this.currentNode = node;
  }

  data() {
    return this.currentNode.data;
  }

  next() {
    this.currentNode = this.currentNode.next;
    return this;
  }

  current() {
    return this.currentNode;
  }
}

class SingleLinkedList {
  constructor(unique) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.unique = unique ?? false;
  }

  find(_data) {
    for (let itr = this.begin(); itr.current() !== null; itr.next()) {
      if (itr.data() === _data) {
        return itr.current();
      }
    }
    return null;
  }

  isExist(node) {
    if (this.unique && this.find(node.data)) {
      return true;
    } else {
      return false;
    }
  }

  canInsert(node) {
    if (this.isExist(node)) {
      console.log("node already exists");
      return false;
    } else {
      return true;
    }
  }

  findParent(node) {
    for (let itr = this.begin(); itr.current() !== null; itr.next()) {
      if (itr.current().next === node) {
        return itr.current();
      }
    }
    return null;
  }

  insertLast(_data) {
    const newNode = new LinkedListNode(_data);

    if (!this.canInsert(newNode)) return;

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  insertAfter(node, _data) {
    const newNode = new LinkedListNode(_data);

    if (!this.canInsert(newNode)) return;

    newNode.next = node.next;
    node.next = newNode;
    if (newNode.next === null) {
      this.tail = newNode;
    }
    this.length++;
  }

  insertBefore(node, _data) {
    const newNode = new LinkedListNode(_data);

    if (!this.canInsert(newNode)) return;

    newNode.next = node;
    const parentNode = this.findParent(node);

    if (parentNode === null) {
      this.head = newNode;
    } else {
      parentNode.next = newNode;
    }
    this.length++;
  }

  deleteNode(node) {
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else if (this.head === node) {
      this.head = node.next;
    } else {
      const parentNode = this.findParent(node);

      if (this.tail === node) {
        this.tail = parentNode;
      } else {
        parentNode.next = node.next;
      }
      node = null;
      this.length--;
    }
  }

  printList() {
    let output = "";
    for (let itr = this.begin(); itr.current() !== null; itr.next()) {
      output += itr.data() + " -> ";
    }
    console.log(output);
  }

  begin() {
    const itr = new LinkedListIterator(this.head);
    return itr;
  }
}

const list = new SingleLinkedList(true);

list.insertLast(1);
list.insertLast(2);
list.insertLast(3);

// list.insertAfter(list.find(2), 2);

// list.insertBefore(list.find(68), 100);

// list.deleteNode(list.find(1));

list.printList();

// console.log("head: " + list.head.data);
