function sort(array, start, end) {
  // Base case
  if (end <= start) return;

  // MidPoint
  const midPoint = Math.floor((start + end) / 2);

  // Sort first and second halves
  sort(array, start, midPoint);
  sort(array, midPoint + 1, end);

  // Merge the sorted halves
  merge(array, start, midPoint, end);
}

function merge(array, start, midPoint, end) {
  const LEFT_LENGTH = midPoint - start + 1; // Length of the left array
  const RIGHT_LENGTH = end - midPoint; // Length of the right array

  // create two temporary arrays
  const LEFT_ARRAY = new Array(LEFT_LENGTH);
  const RIGHT_ARRAY = new Array(RIGHT_LENGTH);

  // fill the two arrays with their values
  for (let i = 0; i < LEFT_LENGTH; i++) {
    LEFT_ARRAY[i] = array[start + i];
  }

  for (let j = 0; j < RIGHT_LENGTH; j++) {
    RIGHT_ARRAY[j] = array[midPoint + 1 + j];
  }

  // Merge and sort the two arrays
  let i = 0,
    j = 0;
  let k = start;

  while (i < LEFT_LENGTH && j < RIGHT_LENGTH) {
    if (LEFT_ARRAY[i].ratio > RIGHT_ARRAY[j].ratio) {
      array[k] = LEFT_ARRAY[i];
      i++;
    } else {
      array[k] = RIGHT_ARRAY[j];
      j++;
    }
    k++;
  }

  while (i < LEFT_LENGTH) {
    array[k] = LEFT_ARRAY[i];
    i++;
    k++;
  }

  while (j < RIGHT_LENGTH) {
    array[k] = RIGHT_ARRAY[j];
    j++;
    k++;
  }
}

export { sort };
