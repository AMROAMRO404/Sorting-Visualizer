Algorithms.register({
  id: "merge",
  name: "Merge Sort",
  summary:
    "Splits the list in half, sorts each half, then merges the two sorted halves back together. " +
    "It is reliably fast, but needs extra memory for the merging.",
  complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
  stable: true,

  *sort(array) {
    yield* mergeSort(array, 0, array.length - 1);

    function* mergeSort(array, low, high) {
      if (low >= high) return;
      const middle = Math.floor((low + high) / 2);
      yield* mergeSort(array, low, middle);
      yield* mergeSort(array, middle + 1, high);
      yield* merge(array, low, middle, high);
    }

    // Merges the sorted ranges array[low..middle] and array[middle+1..high].
    function* merge(array, low, middle, high) {
      const left = array.slice(low, middle + 1);
      const right = array.slice(middle + 1, high + 1);
      let i = 0;
      let j = 0;
      let target = low;

      while (i < left.length && j < right.length) {
        yield Step.compare(low + i, middle + 1 + j);
        if (left[i] <= right[j]) {
          yield Step.write(array, target++, left[i++]);
        } else {
          yield Step.write(array, target++, right[j++]);
        }
      }
      while (i < left.length) yield Step.write(array, target++, left[i++]);
      while (j < right.length) yield Step.write(array, target++, right[j++]);
    }
  },
});
