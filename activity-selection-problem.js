function activitySelection(start, end) {
  const results = [0];
  let j = 0;

  for (let i = 1; i < start.length; i++) {
    if (start[i] >= end[j]) {
      results.push(i);
      j = i;
    }
  }
  console.log(results);
}

const start = [9, 10, 11, 12, 13, 15];
const end = [11, 11, 12, 14, 15, 16];
activitySelection(start, end);