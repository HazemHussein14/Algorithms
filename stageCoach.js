const labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const data = [
  [0, 2, 4, 3, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 7, 4, 6, 0, 0, 0],
  [0, 0, 0, 0, 3, 2, 4, 0, 0, 0],
  [0, 0, 0, 0, 4, 1, 5, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 6, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 3, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const n = data.length;

const states = [];

states[n - 1] = { from: "", to: "", cost: 0 };

for (let i = n - 2; i >= 0; i--) {
  states[i] = { from: labels[i], to: "", cost: Number.MAX_SAFE_INTEGER };
  for (let j = i + 1; j < n; j++) {
    if (data[i][j] == 0) continue;

    const newCost = data[i][j] + states[j].cost;

    if (newCost < states[i].cost) {
      states[i].to = labels[j];
      states[i].cost = newCost;
    }
  }
}

console.log(states);

const path = ["A"];
let i = 0;
let j = 0;

while (i < states.length) {
  if (states[i].from == path[j]) {
    path[j + 1] = states[i].to;
    j++;
  }
  i++;
}

console.log("Minimum Cost:", states[0].cost);
console.log("Minimum path:", path);