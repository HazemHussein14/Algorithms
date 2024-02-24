import { sort } from "./knapsack-sort.js";

class Item {
  constructor(name, value, weight) {
    this.name = name;
    this.value = value;
    this.weight = weight;
    this.ratio = value / weight;
  }
}

class KnapSack {
  constructor(maxCapacity) {
    this.maxCapacity = maxCapacity;
    this.currentCapacity = 0;
    this.totalValue = 0;
    this.items = [];
  }

  addItem(newItem) {
    if (newItem.weight > this.maxCapacity - this.currentCapacity) {
      let diff = this.maxCapacity - this.currentCapacity;
      newItem.weight = diff;
      newItem.value = diff * newItem.ratio;
    }
    this.items.push(newItem);
    this.currentCapacity += newItem.weight;
    this.totalValue += newItem.value;
  }
}

const values = [4, 9, 12, 11, 6, 5];
const weights = [1, 2, 10, 4, 3, 5];
const items = [];

for (let i = 0; i < values.length; i++) {
  let newItem = new Item("#" + [i], values[i], weights[i]);
  items.push(newItem);
}

sort(items, 0, items.length - 1);

console.log("items after sort", items);

const bag = new KnapSack(12);
let j = 0;
while (bag.currentCapacity < bag.maxCapacity) {
  bag.addItem(items[j]);
  j++;
}

console.log("final result", bag);
