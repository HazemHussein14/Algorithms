import { PriorityQueue } from "./DataStructures.js";

class HeapNode {
  constructor(data, freq, left = null, right = null) {
    this.data = data;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

const INTERNAL_CHAR = "\0";

function calculateFrequency(message) {
  const freq = {};
  for (const char of message) {
    if (!freq[char]) {
      freq[char] = 1;
    } else {
      freq[char] += 1;
    }
  }
  return freq;
}

function buildHuffmanTree(freqObj) {
  const queue = new PriorityQueue();
  const freqKeys = Object.keys(freqObj);

  freqKeys.forEach((key) => {
    const node = new HeapNode(key, freqObj[key]);
    queue.enqueue(node, freqObj[key]);
  });

  while (queue.items.length > 1) {
    const left = queue.dequeue();
    const right = queue.dequeue();
    const newFreq = left.freq + right.freq;
    const top = new HeapNode(INTERNAL_CHAR, newFreq, left, right);
    queue.enqueue(top, newFreq);
  }

  return queue.dequeue();
}

function generateCodes(node, str = "", codes = {}) {
  if (node === null) return;

  if (node.data !== INTERNAL_CHAR) {
    codes[node.data] = str;
  }

  generateCodes(node.left, str + "0", codes);
  generateCodes(node.right, str + "1", codes);

  return codes;
}

function huffmanEncoding(message) {
  const freq = calculateFrequency(message);
  const huffmanTree = buildHuffmanTree(freq);
  const codes = generateCodes(huffmanTree);
  console.log(codes);
}

let message =
  "The output from Huffman's algorithm can be viewed as a variable length code table for encoding a source symbol. The algorithm derives this table from the estimated probability or frequency of occurrence for each possible value of the source symbol. as in other entropy encoding methods, more common symbols are generally represented using fewer bits than less common symbols. Huffman's method can be efficiently implemented, finding a code in time linear to the number of input weights if these weights are sorted. However, although optimal among methods encoding symbols separately, Huffman coding is not always optimal among all compression methods it is replaced with arithmetic coding or asymmetric numeral systems if better compression ratio is required.";
message = "interne is awesome";
huffmanEncoding(message);
