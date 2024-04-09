import SingleLinkedList from "./SingleLinkedList.js";

class Queue {
  #data_list;
  constructor() {
    this.#data_list = new SingleLinkedList();
  }

  enqueue(_data) {
    this.#data_list.insertLast(_data);
  }

  dequeue() {
    const node_data = this.#data_list.head.data;
    this.#data_list.deleteHead();
    return node_data;
  }

  peek() {
    if (this.#data_list.head == null) return;
    return this.#data_list.head.data;
  }

  hasData() {
    return this.#data_list.length > 0;
  }

  size() {
    return this.#data_list.length;
  }

  print() {
    this.#data_list.printList();
  }
}

const queue = new Queue();

console.log("hasData: " + queue.hasData());
queue.enqueue(8);
queue.enqueue(16);
queue.enqueue(32);
queue.enqueue(64);
console.log("hasData: " + queue.hasData());
console.log("size: " + queue.size());
queue.print();

while (queue.hasData()) {
  console.log("peek: " + queue.peek());
  console.log("dequeue: " + queue.dequeue());
  console.log("size: " + queue.size());
  queue.print();
}
