// Shared building blocks for every algorithm file.
//
// An algorithm is a generator function that sorts a plain array of numbers
// in place and yields one "step" each time it does something worth showing.
// The algorithms know nothing about the page: app.js plays the steps back
// at whatever speed the user picked.

const Step = {
  // Two values are being compared.
  compare(i, j) {
    return { type: "compare", indices: [i, j] };
  },

  // Swaps array[i] and array[j].
  swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
    return { type: "swap", indices: [i, j] };
  },

  // Overwrites array[index] with value.
  write(array, index, value) {
    array[index] = value;
    return { type: "write", indices: [index], value };
  },

  // array[index] was chosen as the pivot.
  pivot(index) {
    return { type: "pivot", indices: [index] };
  },

  // array[index] has reached its final position.
  sorted(index) {
    return { type: "sorted", indices: [index] };
  },
};

const Algorithms = {
  list: [],

  // definition: { id, name, summary, complexity: { best, average, worst, space }, stable, sort }
  register(definition) {
    this.list.push(definition);
  },

  get(id) {
    return this.list.find((algorithm) => algorithm.id === id);
  },
};
