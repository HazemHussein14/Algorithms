class Heap {
  #data_list;
  #size;

  constructor() {
    this.#data_list = [];
    this.#size = 0;
  }

  insert(data) {
    let i = this.#size;
    this.#data_list[i] = data;
    this.#size++;

    let parentIndex = Math.floor((i - 1) / 2);
    while (i != 0 && this.#data_list[i] < this.#data_list[parentIndex]) {
      this.#data_list[i] = this.#data_list[parentIndex];
      this.#data_list[parentIndex] = data;
      i = parentIndex;
      parentIndex = Math.floor((i - 1) / 2);
    }
  }

  pop() {
    if (this.#size == 0) return null;
    let i = 0;
    let data = this.#data_list[i];

    this.#data_list[i] = this.#data_list[this.#size - 1];
    this.#data_list[this.#size - 1] = null;
    this.#size--;

    let leftIndex = 2 * i + 1;
    while (leftIndex < this.#size) {
      let rightIndex = 2 * i + 2;

      let smallerIndex = leftIndex;
      if (
        this.#data_list[rightIndex] != null &&
        this.#data_list[rightIndex] < this.#data_list[leftIndex]
      ) {
        smallerIndex = rightIndex;
      }

      if (this.#data_list[smallerIndex] >= this.#data_list[i]) {
        break;
      }

      let temp = this.#data_list[i];
      this.#data_list[i] = this.#data_list[smallerIndex];
      this.#data_list[smallerIndex] = temp;

      leftIndex = 2 * i + 1;
      i = smallerIndex;
    }
    return data;
  }

  print() {
    var print_data = "";
    for (var i = 0; i < this.#size; i++) {
      print_data += this.#data_list[i] + " - ";
    }
    console.log(print_data);
  }

  size() {
    return this.#size;
  }

  draw() {
    var levels_count = Math.log2(this.#size) + 1;
    var line_width = Math.pow(2, levels_count - 1);

    var j = 0;
    for (var i = 0; i < levels_count; i++) {
      var nodes_count = Math.pow(2, i);
      var space = Math.ceil(line_width - nodes_count / 2);
      var space_between = Math.ceil(levels_count / nodes_count);
      space_between = space_between < 1 ? 1 : space_between;
      var k = j;
      var str = " ".repeat(space + space_between);
      for (; j < k + nodes_count; j++) {
        if (j == this.#size) {
          break;
        }
        if (this.#data_list[j]) {
          str += this.#data_list[j] + " ".repeat(space_between);
        }
      }
      str += " ".repeat(space) + "\n";
      console.log(str);
    }
  }
}

const heap = new Heap();
heap.insert(24);
heap.insert(32);
heap.insert(16);
heap.insert(45);
heap.insert(20);
heap.insert(53);
heap.insert(14);
heap.insert(27);

// heap.print();
heap.draw();

console.log(heap.pop());
heap.draw();

console.log(heap.pop());
heap.draw();

console.log(heap.pop());
heap.draw();

console.log(heap.pop());
heap.draw();

console.log(heap.pop());
heap.draw();

console.log(heap.pop());
heap.draw();

console.log(heap.pop());
heap.draw();

console.log(heap.pop());
heap.draw();

console.log(heap.pop());
heap.draw();

heap.insert(45);
heap.insert(20);
heap.insert(53);
heap.insert(14);

heap.draw();