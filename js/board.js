// Draws the array as a row of bars and shows each sorting step on them.

class Board {
  static LABEL_LIMIT = 20; // values are printed on the bars up to this many bars
  static ACTIVE_CLASSES = ["is-compare", "is-write"];

  constructor(container) {
    this.container = container;
    this.values = [];
    this.bars = [];
    this.maxValue = 1;
    this.active = []; // bars highlighted by the latest step
    this.pivotIndex = null;
  }

  // Replaces all bars with a fresh, unhighlighted set.
  render(values, maxValue) {
    this.values = [...values];
    this.maxValue = maxValue;
    this.active = [];
    this.pivotIndex = null;

    const showLabels = values.length <= Board.LABEL_LIMIT;
    this.container.classList.toggle("has-labels", showLabels);
    this.container.classList.toggle("is-dense", values.length > 60);

    this.bars = values.map((value) => {
      const bar = document.createElement("div");
      bar.className = "bar";
      this.paint(bar, value, showLabels);
      return bar;
    });
    this.container.replaceChildren(...this.bars);
  }

  // Shows one step produced by an algorithm (see Step in registry.js).
  apply(step) {
    this.clearActive();
    const [first, second] = step.indices;

    switch (step.type) {
      case "compare":
        this.highlight(step.indices, "is-compare");
        break;

      case "swap": {
        const firstValue = this.values[first];
        this.setValue(first, this.values[second]);
        this.setValue(second, firstValue);
        // The pivot marker follows the pivot value when it moves.
        if (this.pivotIndex === first) this.setPivot(second);
        else if (this.pivotIndex === second) this.setPivot(first);
        this.highlight(step.indices, "is-write");
        break;
      }

      case "write":
        this.setValue(first, step.value);
        this.highlight(step.indices, "is-write");
        break;

      case "pivot":
        this.setPivot(first);
        break;

      case "sorted":
        if (this.pivotIndex === first) this.setPivot(null);
        this.bars[first].classList.add("is-sorted");
        break;
    }
  }

  // Turns every bar green, sweeping from left to right.
  markAllSorted() {
    this.clearActive();
    this.setPivot(null);
    const sweepMs = 600;
    this.bars.forEach((bar, i) => {
      bar.style.transitionDelay = `${Math.round((i / this.bars.length) * sweepMs)}ms`;
      bar.classList.add("is-sorted");
    });
  }

  valueAt(index) {
    return this.values[index];
  }

  setValue(index, value) {
    this.values[index] = value;
    this.paint(this.bars[index], value, this.values.length <= Board.LABEL_LIMIT);
  }

  paint(bar, value, showLabel) {
    bar.style.height = `${(value / this.maxValue) * 100}%`;
    if (showLabel) bar.textContent = value;
  }

  setPivot(index) {
    if (this.pivotIndex !== null) this.bars[this.pivotIndex].classList.remove("is-pivot");
    this.pivotIndex = index;
    if (index !== null) this.bars[index].classList.add("is-pivot");
  }

  highlight(indices, className) {
    for (const index of indices) this.bars[index].classList.add(className);
    this.active = indices;
  }

  clearActive() {
    for (const index of this.active) this.bars[index].classList.remove(...Board.ACTIVE_CLASSES);
    this.active = [];
  }
}
