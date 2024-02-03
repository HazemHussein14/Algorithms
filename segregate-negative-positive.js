function segregate(arr, start, end) {
  if (end <= start) return;

  const midPoint = Math.floor((start + end) / 2);

  segregate(arr, start, midPoint);
  segregate(arr, midPoint + 1, end);

  merge(arr, start, midPoint, end);
}

function merge(arr, start, midPoint, end) {
  const LEFT_LENGTH = midPoint - start + 1;
  const RIGHT_LENGTH = end - midPoint;

  const LEFT_ARRAY = new Array(LEFT_LENGTH);
  const RIGHT_ARRAY = new Array(RIGHT_LENGTH);

  for (let i = 0; i < LEFT_LENGTH; i++) {
    LEFT_ARRAY[i] = arr[start + i];
  }

  for (let j = 0; j < RIGHT_LENGTH; j++) {
    RIGHT_ARRAY[j] = arr[midPoint + 1 + j];
  }

  let i = 0, j = 0, k = start;

  while (i < LEFT_LENGTH && LEFT_ARRAY[i] <= 0) {
    arr[k] = LEFT_ARRAY[i];
    i++;
    k++;
  }

  while (j < RIGHT_LENGTH && RIGHT_ARRAY[j] <= 0) {
    arr[k] = RIGHT_ARRAY[j];
    j++;
    k++;
  }

  while (i < LEFT_LENGTH) {
    arr[k] = LEFT_ARRAY[i];
    i++;
    k++;
  }

  while (j < RIGHT_LENGTH) {
    arr[k] = RIGHT_ARRAY[j];
    j++;
    k++;
  }
}

const array = [6, -15, 12, 10, -9, -1];
segregate(array, 0, array.length - 1);
console.log(array);
