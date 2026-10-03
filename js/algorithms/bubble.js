Algorithms.register({
  id: "bubble",
  name: "Bubble Sort",
  summary:
    "Walks through the list again and again, swapping neighbours that are in the wrong order. " +
    "After each pass the largest remaining value has \"bubbled\" to the end.",
  complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
  stable: true,

  *sort(array) {
    for (let end = array.length - 1; end > 0; end--) {
      let swapped = false;
      for (let i = 0; i < end; i++) {
        yield Step.compare(i, i + 1);
        if (array[i] > array[i + 1]) {
          yield Step.swap(array, i, i + 1);
          swapped = true;
        }
      }
      yield Step.sorted(end);
      // A pass without swaps means everything is already in order.
      if (!swapped) return;
    }
  },
});
