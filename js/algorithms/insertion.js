Algorithms.register({
  id: "insertion",
  name: "Insertion Sort",
  summary:
    "Builds a sorted section on the left, one value at a time. " +
    "Each new value slides left until it sits in the right place, like sorting cards in your hand.",
  complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
  stable: true,

  *sort(array) {
    for (let i = 1; i < array.length; i++) {
      for (let j = i; j > 0; j--) {
        yield Step.compare(j - 1, j);
        if (array[j - 1] <= array[j]) break;
        yield Step.swap(array, j - 1, j);
      }
    }
  },
});
