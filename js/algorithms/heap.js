Algorithms.register({
  id: "heap",
  name: "Heap Sort",
  summary:
    "Arranges the list into a \"heap\", a structure that keeps the largest value at the front. " +
    "It then repeatedly moves that largest value to the end and repairs the heap.",
  complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(1)" },
  stable: false,

  *sort(array) {
    const length = array.length;

    // Build the heap, starting from the last value that has children.
    for (let root = Math.floor(length / 2) - 1; root >= 0; root--) {
      yield* siftDown(array, root, length);
    }

    for (let end = length - 1; end > 0; end--) {
      yield Step.swap(array, 0, end);
      yield Step.sorted(end);
      yield* siftDown(array, 0, end);
    }

    // Pushes array[root] down until both of its children are smaller.
    function* siftDown(array, root, size) {
      while (true) {
        const left = 2 * root + 1;
        const right = left + 1;
        let largest = root;

        if (left < size) {
          yield Step.compare(left, largest);
          if (array[left] > array[largest]) largest = left;
        }
        if (right < size) {
          yield Step.compare(right, largest);
          if (array[right] > array[largest]) largest = right;
        }
        if (largest === root) return;

        yield Step.swap(array, root, largest);
        root = largest;
      }
    }
  },
});
