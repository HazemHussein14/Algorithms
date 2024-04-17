import KeyValuePair from "./KeyValuePair.js";

class HashTable {
  constructor() {
    this.initialSize = 3;
    this.entriesCount = 0;
    this.entries = new Array(this.initialSize);
  }

  getHash(key) {
    const OffsetBasis = 2166136261;
    const FNVPrime = 16777619;

    let data = Buffer.from(key, "ascii");
    let hashValue = OffsetBasis;

    for (let i = 0; i < data.length; i++) {
      hashValue = hashValue ^ data[i];
      hashValue = (hashValue * FNVPrime) >>> 0; // Use unsigned 32-bit integer
    }

    console.log(`[hash]: ${key.toString()} ${hashValue} ${hashValue.toString(16)} ${hashValue % this.entries.length >>> 0}`);

    return hashValue % this.entries.length >>> 0;
  }

  collisionHandling(key, hash, set) {
    let newHash;
    for (let i = 1; i < this.entries.length; i++) {
      newHash = (hash + i) % this.entries.length;
      console.log(`[coll] ${key.toString()} ${hash}, new hash: ${newHash}`);

      if (
        set &&
        (!this.entries[newHash] || this.entries[newHash].key === key)
      ) {
        return newHash;
      } else if (!set && this.entries[newHash].key === key) {
        return newHash;
      }
    }
    return -1;
  }

  addToEntries(key, value) {
    let hash = this.getHash(key);

    if (this.entries[hash] && this.entries[hash].key !== key) {
      hash = this.collisionHandling(key, hash, true);
    }

    if (hash === -1) {
      throw new Error("Invalid HashTable!!");
    }

    if (!this.entries[hash]) {
      const newPair = new KeyValuePair(key, value);
      this.entries[hash] = newPair;
      this.entriesCount++;
    } else if (this.entries[hash].key === key) {
      this.entries[hash].value = value;
    } else {
      throw new Error("Invalid HashTable!!");
    }
  }

  resizeOrNot() {
    if (this.entriesCount < this.entries.length) return;

    const newSize = this.entries.length * 2;
    console.log(`[resize] from ${this.entries.length} to ${newSize}`);

    const entriesCopy = JSON.parse(JSON.stringify(this.entries));
    this.entries = new Array(newSize);
    this.entriesCount = 0

    for (let i = 0; i < entriesCopy.length; i++) {
      if (entriesCopy[i] === null) continue;
      this.addToEntries(entriesCopy[i].key, entriesCopy[i].value);
    }
  }

  set(key, value) {
    this.resizeOrNot();
    this.addToEntries(key, value);
  }

  get(key) {
    let hash = this.getHash(key);

    if (this.entries[hash] !== null && this.entries[hash].key !== key) {
      hash = this.collisionHandling(key, hash, false);
    }

    if (hash === -1 || this.entries[hash] === null) {
      return "key not found";
    }

    if (this.entries[hash].key === key) {
      return this.entries[hash].value;
    } else {
      throw new Error("Invalid HashTable!!");
    }
  }

  size() {
    return this.entriesCount;
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

const table = new HashTable();

table.print();
table.set("Sinar", "sinar@gmail.com");
table.set("Elvis", "elvis@gmail.com");
table.set("Tane", "tane@gmail.com");
table.print();

console.log("[get] " + table.get("Sinar"))

table.set("Gerti", "gerti@gmail.com")
table.set("Arist", "arist@gmail.com")
table.print()
console.log("[get] " + table.get("Sinar"))
