Algorithms.register({
  id: "shell",
  name: "Shell Sort",
  summary:
    "A faster take on insertion sort. It first compares values that are far apart, " +
    "then shrinks the gap step by step until it is comparing neighbours.",
  complexity: { best: "O(n log n)", average: "O(n^1.5)", worst: "O(n²)", space: "O(1)" },
  stable: false,

  *sort(array) {
    for (let gap = Math.floor(array.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < array.length; i++) {
        for (let j = i; j >= gap; j -= gap) {
          yield Step.compare(j - gap, j);
          if (array[j - gap] <= array[j]) break;
          yield Step.swap(array, j - gap, j);
        }
      }
    }
  },
});
