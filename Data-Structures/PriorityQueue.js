class PriorityQueue {
  #data_list;
  #size;

  constructor() {
    this.#data_list = [];
    this.#size = 0;
  }

  enqueue(priority, data) {
    let i = this.#size;
    this.#data_list[i] = { priority: priority, data: data };
    this.#size++;

    let parentIndex = Math.floor((i - 1) / 2);
    while (
      i != 0 &&
      this.#data_list[i].priority < this.#data_list[parentIndex].priority
    ) {
      let temp = this.#data_list[i];
      this.#data_list[i] = this.#data_list[parentIndex];
      this.#data_list[parentIndex] = temp;
      i = parentIndex;
      parentIndex = Math.floor((i - 1) / 2);
    }
  }

  dequeue() {
    if (this.#size == 0) return null;
    let i = 0;
    let data = this.#data_list[i].data;
    let priority = this.#data_list[i].priority;

    this.#data_list[i] = this.#data_list[this.#size - 1];
    this.#data_list[this.#size - 1] = null;
    this.#size--;

    let leftIndex = 2 * i + 1;
    while (leftIndex < this.#size) {
      let rightIndex = 2 * i + 2;

      let smallerIndex = leftIndex;
      if (
        rightIndex < this.#size &&
        this.#data_list[rightIndex] != null &&
        this.#data_list[rightIndex].priority <
          this.#data_list[leftIndex].priority
      ) {
        smallerIndex = rightIndex;
      }

      if (
        this.#data_list[smallerIndex].priority >= this.#data_list[i].priority
      ) {
        break;
      }

      let temp = this.#data_list[i];
      this.#data_list[i] = this.#data_list[smallerIndex];
      this.#data_list[smallerIndex] = temp;

      i = smallerIndex;
      leftIndex = 2 * i + 1;
    }
    return [data, priority];
  }

  hasData() {
    return this.#size > 0;
  }

  print() {
    var print_data = "";
    for (var i = 0; i < this.#size; i++) {
      print_data += this.#data_list[i].data + " - ";
    }
    console.log(print_data);
  }

  size() {
    return this.#size;
  }

  draw() {
    var levels_count = Math.ceil(Math.log2(this.#size + 1));
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
          str +=
            this.#data_list[j].data +
            "[" +
            this.#data_list[j].priority +
            "]" +
            " ".repeat(space_between);
        }
      }
      str += " ".repeat(space) + "\n";
      console.log(str);
    }
  }
}

const queue = new PriorityQueue();
queue.enqueue(5, 24);
queue.enqueue(5, 32);
queue.enqueue(3, 16);
queue.enqueue(3, 45);
queue.enqueue(1, 20);
queue.enqueue(1, 53);
queue.enqueue(2, 14);
queue.enqueue(2, 27);

queue.print();
queue.draw();

while (queue.hasData()) {
  var result = queue.dequeue();
  console.log(result[0] + "[" + result[1] + "]");
}
