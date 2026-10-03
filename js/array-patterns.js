// The different kinds of starting arrays the user can pick from.
// Each make(size, min, max) returns `size` whole numbers between min and max.

const ArrayPatterns = (() => {
  function randomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  // Evenly spaced values from min up to max.
  function ascending(size, min, max) {
    const step = size > 1 ? (max - min) / (size - 1) : 0;
    return Array.from({ length: size }, (_, i) => Math.round(min + i * step));
  }

  return {
    random: {
      label: "Random",
      make: (size, min, max) => Array.from({ length: size }, () => randomInt(min, max)),
    },

    nearlySorted: {
      label: "Nearly sorted",
      make(size, min, max) {
        const values = ascending(size, min, max);
        // Nudge a few values a short distance out of place.
        const swaps = Math.max(1, Math.round(size / 10));
        for (let n = 0; n < swaps; n++) {
          const i = randomInt(0, size - 1);
          const j = Math.min(size - 1, i + randomInt(1, 3));
          [values[i], values[j]] = [values[j], values[i]];
        }
        return values;
      },
    },

    reversed: {
      label: "Reversed",
      make: (size, min, max) => ascending(size, min, max).reverse(),
    },

    fewUnique: {
      label: "Few unique values",
      make(size, min, max) {
        const levels = ascending(5, min, max);
        return Array.from({ length: size }, () => levels[randomInt(0, levels.length - 1)]);
      },
    },
  };
})();
