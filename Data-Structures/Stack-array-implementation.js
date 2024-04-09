class Stack {
  #data_list;
  #top_index;
  constructor() {
    this.#data_list = [];
    this.#top_index = -1;
  }
  push(_data) {
    this.#data_list.push(_data);
    this.#top_index++;
  }

  pop() {
    if (this.#top_index == -1) return;

    const head_data = this.#data_list.splice(this.#top_index, 1)[0];
    this.#top_index--;
    return head_data;
  }

  peek() {
    return this.#data_list[this.#top_index];
  }

  isEmpty() {
    return this.#data_list.length <= 0;
  }

  size() {
    return this.#data_list.length;
  }

  print() {
    let print_data = "";

    for (let i = this.#top_index; i >= 0; i--) {
      print_data += this.#data_list[i] + " -> ";
    }
    console.log(print_data);
  }
}

const stack = new Stack();
console.log("is Empty: ", stack.isEmpty());
stack.push(12);
stack.push(23);
stack.push(34);
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
