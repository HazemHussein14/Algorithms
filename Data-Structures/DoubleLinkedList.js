class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.back = null;
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

class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  find(_data) {
    for (let itr = this.begin(); itr.current() !== null; itr.next()) {
      if (itr.data() === _data) {
        return itr.current();
      }
    }
    return null;
  }

  begin() {
    const itr = new LinkedListIterator(this.head);
    return itr;
  }

  insertAfter(node, _data) {
    const newNode = new LinkedListNode(_data);

    newNode.next = node.next;
    newNode.back = node;
    node.next = newNode;
    if (newNode.next == null) {
      this.tail = newNode;
    } else {
      newNode.next.back = newNode;
    }
    this.length++;
  }

  insertLast(_data) {
    const newNode = new LinkedListNode(_data);

    if (this.tail == null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.back = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  deleteNode(node) {
    if (node === this.head && node === this.tail) {
      this.head = null;
      this.tail = null;
    } else if (node.back === null) {
      this.head = node.next;
      node.next.back = null;
    } else if (this.next === null) {
      this.tail = node.back;
      node.back.next = null;
    } else {
      node.back.next = node.next;
      node.next.back = node.back;
    }
    node = null
    this.length--;
  }

  insertBefore(node, _data) {
    const newNode = new LinkedListNode(_data);
    newNode.next = node;
    if (node === this.head) {
      this.head = newNode;
    } else {
      node.back.next = newNode;
    }
    node.back = newNode;
    this.length++;
  }

  copyList() {
    return { ...this };
  }

  printList() {
    let output = "";
    for (let itr = this.begin(); itr.current() !== null; itr.next()) {
      output += itr.data() + " -> ";
    }
    console.log(output);
  }
}

const list = new DoubleLinkedList();

list.insertLast("a");
list.insertLast("b");
list.insertLast("c");

// list.insertAfter(list.find("c"), "D");

// list.insertBefore(list.find('D'), 'zzz');

// list.deleteNode(list.find("c"));
const copiedList = list.copyList();
list.printList();
console.log(copiedList.length);

// console.log("head: " + list.head.data);
