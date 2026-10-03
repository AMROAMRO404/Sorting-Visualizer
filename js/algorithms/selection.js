Algorithms.register({
  id: "selection",
  name: "Selection Sort",
  summary:
    "Finds the smallest remaining value and moves it to the front, then repeats with the rest of the list. " +
    "It makes very few swaps but always does the same number of comparisons.",
  complexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
  stable: false,

  *sort(array) {
    for (let start = 0; start < array.length - 1; start++) {
      let smallest = start;
      for (let i = start + 1; i < array.length; i++) {
        yield Step.compare(smallest, i);
        if (array[i] < array[smallest]) smallest = i;
      }
      if (smallest !== start) yield Step.swap(array, start, smallest);
      yield Step.sorted(start);
    }
  },
});
