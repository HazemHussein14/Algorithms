import KeyValuePair from "./KeyValuePair.js";

class Dictionary {
  constructor(initialSize = 3) {
    this.initialSize = initialSize;
    this.entries = new Array(this.initialSize);
    this.entriesCount = 0;
  }

  resizeOrNot() {
    if (this.entriesCount < this.entries.length - 1) return;

    const newSize = this.entries.length + this.initialSize;
    console.log(`[resize] from ${this.entries.length} to ${newSize}`);
    const newArray = new Array(newSize);

    for (let i = 0; i < this.entries.length; i++) {
      newArray[i] = this.entries[i];
    }
    this.entries = newArray;
  }

  size() {
    return this.entriesCount;
  }

  set(key, value) {
    for (let i = 0; i < this.entries.length; i++) {
      if (this.entries[i] && this.entries[i].key === key) {
        this.entries[i].value = value;
        return;
      }
    }

    this.resizeOrNot();

    const newPair = new KeyValuePair(key, value);
    this.entries[this.entriesCount] = newPair;
    this.entriesCount++;
  }

  get(key) {
    for (let i = 0; i < this.entries.length; i++) {
      if (this.entries[i] && this.entries[i].key === key) {
        return this.entries[i].value;
      }
    }
    return null;
  }

  remove(key) {
    for (let i = 0; i < this.entries.length; i++) {
      if (this.entries[i] && this.entries[i].key === key) {
        this.entries[i] = this.entries[this.entriesCount - 1];
        this.entries[this.entriesCount - 1] = null;
        this.entriesCount--;
        return true;
      }
    }
    return false;
  }

  print() {
    console.log("--------------");
    console.log(`[size] ${this.size()}`);
    for (let i = 0; i < this.entries.length; i++) {
      if (this.entries[i]) {
        console.log(`[${i}] ${this.entries[i].key} : ${this.entries[i].value}`);
      } else {
        console.log(`[${i}]`);
      }
      console.log("===========");
    }
  }
}

const dic = new Dictionary();
// dic.print();
dic.set("Sinar", "sinar@gmail.com");
dic.set("Elvis", "elvis@gmail.com");
// dic.print();

dic.set("Tane", "tane@gmail.com");
dic.set("Gerti", "gerti@gmail.com");
dic.set("Arist", "arist@gmail.com");
dic.print();

// console.log(dic.get("Tane"));
// console.log(dic.get("Sinar"));
// console.log(dic.get("Elviaaa"));

dic.remove("Sinar");
dic.remove("Elvis");
dic.remove("Tane");
dic.remove("Gerti");
dic.remove("Arist");
dic.print();

dic.set("Sinar", "sinar@gmail.com");
dic.print();
