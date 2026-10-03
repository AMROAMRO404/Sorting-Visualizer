// Checks that every algorithm really sorts, and that the steps it yields
// are enough for the page to redraw the array correctly.
//
// Run with: node --test

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const jsDir = path.join(__dirname, "..", "js");
const algorithmFiles = fs.readdirSync(path.join(jsDir, "algorithms")).map((file) => `algorithms/${file}`);

// The scripts are written for the browser, so load them the way a page would.
const context = vm.createContext({});
for (const file of ["registry.js", "array-patterns.js", ...algorithmFiles]) {
  vm.runInContext(fs.readFileSync(path.join(jsDir, file), "utf8"), context, { filename: file });
}
const Algorithms = vm.runInContext("Algorithms", context);
const ArrayPatterns = vm.runInContext("ArrayPatterns", context);

const byNumber = (a, b) => a - b;

const inputs = {
  empty: [],
  "single value": [7],
  "two values": [9, 3],
  "already sorted": [1, 2, 3, 4, 5, 6],
  "all equal": [4, 4, 4, 4, 4],
};
for (const [name, pattern] of Object.entries(ArrayPatterns)) {
  for (const size of [5, 32, 150]) {
    inputs[`${name} (${size})`] = Array.from(pattern.make(size, 5, 100));
  }
}

// Applies the steps to a copy of the input, the same way the board does.
function replay(input, steps) {
  const shown = [...input];
  for (const step of steps) {
    for (const index of step.indices) {
      assert.ok(Number.isInteger(index) && index >= 0 && index < input.length, `index ${index} out of range`);
    }
    if (step.type === "swap") {
      const [i, j] = step.indices;
      [shown[i], shown[j]] = [shown[j], shown[i]];
    } else if (step.type === "write") {
      shown[step.indices[0]] = step.value;
    }
  }
  return shown;
}

test("all algorithms are registered", () => {
  assert.equal(Algorithms.list.length, algorithmFiles.length);
});

for (const algorithm of Algorithms.list) {
  test(algorithm.name, () => {
    for (const [name, input] of Object.entries(inputs)) {
      const expected = [...input].sort(byNumber);
      const array = [...input];
      const steps = [...algorithm.sort(array)];

      assert.deepEqual(array, expected, `${name}: array is not sorted`);
      assert.deepEqual(replay(input, steps), expected, `${name}: steps do not reproduce the sorted array`);
    }
  });
}

test("array patterns return whole numbers within range", () => {
  for (const [name, pattern] of Object.entries(ArrayPatterns)) {
    const values = pattern.make(50, 5, 100);
    assert.equal(values.length, 50, name);
    for (const value of values) {
      assert.ok(Number.isInteger(value) && value >= 5 && value <= 100, `${name}: ${value}`);
    }
  }
});
