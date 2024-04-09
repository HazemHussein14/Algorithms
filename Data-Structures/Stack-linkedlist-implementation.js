import SingleLinkedList from "./SingleLinkedList.js";

class Stack {
  #data_list;
  constructor(unique) {
    this.#data_list = new SingleLinkedList(unique ?? false);
  }
  push(_data) {
    this.#data_list.insertFirst(_data);
  }

  pop() {
    const head_data = this.#data_list.head.data;
    this.#data_list.deleteHead();
    return head_data;
  }

  peek() {
    return this.#data_list.head.data;
  }

  isEmpty() {
    return this.#data_list.length <= 0;
  }

  size() {
    return this.#data_list.length;
  }

  print() {
    this.#data_list.printList();
  }
}

const stack = new Stack();
console.log("is Empty: ", stack.isEmpty());
stack.push(1);
stack.push(2);
stack.push(3);
// console.log("is Empty: ", stack.isEmpty());
// console.log("size: ", stack.size());
// stack.print()
// console.log("pop: ", stack.pop());
// stack.print()
// console.log("peek ", stack.peek());
// stack.print()

while (!stack.isEmpty()) {
  console.log("pop: ", stack.pop());
  console.log("size: ", stack.size());
  stack.print();
}
