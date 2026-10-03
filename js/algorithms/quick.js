Algorithms.register({
  id: "quick",
  name: "Quick Sort",
  summary:
    "Picks one value as the \"pivot\", moves smaller values to its left and larger ones to its right, " +
    "then does the same for each side. Usually the fastest of the group.",
  complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)", space: "O(log n)" },
  stable: false,

  *sort(array) {
    yield* quickSort(array, 0, array.length - 1);

    function* quickSort(array, low, high) {
      if (low > high) return;
      if (low === high) {
        yield Step.sorted(low);
        return;
      }
      const pivotIndex = yield* partition(array, low, high);
      yield* quickSort(array, low, pivotIndex - 1);
      yield* quickSort(array, pivotIndex + 1, high);
    }

    // Uses the middle value as the pivot and returns its final position.
    function* partition(array, low, high) {
      const middle = Math.floor((low + high) / 2);
      yield Step.pivot(middle);
      // Park the pivot at the end so it stays out of the way.
      if (middle !== high) yield Step.swap(array, middle, high);

      let boundary = low; // everything left of the boundary is smaller than the pivot
      for (let i = low; i < high; i++) {
        yield Step.compare(i, high);
        if (array[i] < array[high]) {
          if (i !== boundary) yield Step.swap(array, i, boundary);
          boundary++;
        }
      }

      if (boundary !== high) yield Step.swap(array, boundary, high);
      yield Step.sorted(boundary);
      return boundary;
    }
  },
});
