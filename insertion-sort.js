let key = 0;

function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    key = array[i];
    for (j = i - 1; j >= 0; j--) {
      if (array[j] > key) {
        array[j + 1] = array[j];
      } else {
        break;
      }
    }
    array[j + 1] = key;
  }
  console.log(array);
}

insertionSort([9, 4, 5, 1]);
