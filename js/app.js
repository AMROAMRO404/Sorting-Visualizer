// Wires the page controls to the algorithms and plays their steps back.

const MIN_VALUE = 5;
const MAX_VALUE = 100;
const MIN_STEPS_PER_SECOND = 2;
const MAX_STEPS_PER_SECOND = 1000;
const MAX_FRAME_MS = 100; // keeps the animation from jumping after the tab was in the background

const els = {
  algorithm: document.querySelector("#algorithm"),
  pattern: document.querySelector("#pattern"),
  size: document.querySelector("#size"),
  sizeValue: document.querySelector("#size-value"),
  speed: document.querySelector("#speed"),
  speedValue: document.querySelector("#speed-value"),
  sound: document.querySelector("#sound"),
  play: document.querySelector("#play"),
  step: document.querySelector("#step"),
  reset: document.querySelector("#reset"),
  newArray: document.querySelector("#new-array"),
  bars: document.querySelector("#bars"),
  comparisons: document.querySelector("#comparisons"),
  writes: document.querySelector("#writes"),
  time: document.querySelector("#time"),
  status: document.querySelector("#status"),
  infoName: document.querySelector("#info-name"),
  infoSummary: document.querySelector("#info-summary"),
  infoBest: document.querySelector("#info-best"),
  infoAverage: document.querySelector("#info-average"),
  infoWorst: document.querySelector("#info-worst"),
  infoSpace: document.querySelector("#info-space"),
  infoStable: document.querySelector("#info-stable"),
};

const board = new Board(els.bars);
const beeper = new Beeper();

const state = {
  status: "idle", // idle | running | paused | done
  original: [], // the unsorted array, kept so a run can be replayed
  steps: null, // generator of the current run
  comparisons: 0,
  writes: 0,
  elapsedMs: 0,
  stepBudget: 0, // steps owed to the animation, can be fractional
  lastFrame: 0,
  frameId: null,
};

// ---------- Run control ----------

function newArray() {
  const pattern = ArrayPatterns[els.pattern.value];
  state.original = pattern.make(Number(els.size.value), MIN_VALUE, MAX_VALUE);
  reset();
}

// Stops any run and shows the unsorted array again.
function reset() {
  cancelAnimationFrame(state.frameId);
  state.status = "idle";
  state.steps = null;
  state.comparisons = 0;
  state.writes = 0;
  state.elapsedMs = 0;
  board.render(state.original, MAX_VALUE);
  updateView();
}

function beginRun() {
  if (state.status === "done") reset();
  const algorithm = Algorithms.get(els.algorithm.value);
  state.steps = algorithm.sort([...state.original]);
}

function play() {
  if (state.status === "idle" || state.status === "done") beginRun();
  state.status = "running";
  state.lastFrame = performance.now();
  state.stepBudget = 1; // take the first step right away
  state.frameId = requestAnimationFrame(frame);
  updateView();
}

function pause() {
  cancelAnimationFrame(state.frameId);
  state.status = "paused";
  updateView();
}

function togglePlay() {
  if (state.status === "running") pause();
  else play();
}

// Advances a single step and stays paused.
function stepOnce() {
  if (state.status === "done") return;
  if (state.status === "idle") beginRun();
  cancelAnimationFrame(state.frameId);
  state.status = "paused";
  if (!advance()) finish();
  updateView();
}

function frame(now) {
  const elapsed = Math.min(now - state.lastFrame, MAX_FRAME_MS);
  state.lastFrame = now;
  state.elapsedMs += elapsed;
  state.stepBudget += (elapsed * stepsPerSecond()) / 1000;

  while (state.stepBudget >= 1) {
    state.stepBudget -= 1;
    if (!advance()) {
      finish();
      updateView();
      return;
    }
  }

  updateStats();
  state.frameId = requestAnimationFrame(frame);
}

// Plays the next step. Returns false when the algorithm has finished.
function advance() {
  const { value: step, done } = state.steps.next();
  if (done) return false;

  board.apply(step);
  if (step.type === "compare") state.comparisons += 1;
  if (step.type === "swap") state.writes += 2;
  if (step.type === "write") state.writes += 1;
  if (step.type !== "pivot" && step.type !== "sorted") {
    beeper.play(board.valueAt(step.indices[0]) / MAX_VALUE);
  }
  return true;
}

function finish() {
  state.status = "done";
  state.steps = null;
  board.markAllSorted();
}

// The speed slider is exponential, so both slow and fast speeds are easy to pick.
function stepsPerSecond() {
  const position = (Number(els.speed.value) - 1) / (Number(els.speed.max) - 1);
  const range = MAX_STEPS_PER_SECOND / MIN_STEPS_PER_SECOND;
  return MIN_STEPS_PER_SECOND * Math.pow(range, position);
}

// ---------- Display ----------

const STATUS_TEXT = {
  idle: "Ready",
  running: "Sorting…",
  paused: "Paused",
  done: "Sorted",
};

const PLAY_LABEL = {
  idle: "Start",
  running: "Pause",
  paused: "Resume",
  done: "Start again",
};

function updateView() {
  els.play.textContent = PLAY_LABEL[state.status];
  els.step.disabled = state.status === "done";
  els.reset.disabled = state.status === "idle";
  els.status.textContent = STATUS_TEXT[state.status];
  els.status.dataset.status = state.status;
  updateStats();
}

function updateStats() {
  els.comparisons.textContent = state.comparisons.toLocaleString();
  els.writes.textContent = state.writes.toLocaleString();
  els.time.textContent = `${(state.elapsedMs / 1000).toFixed(1)} s`;
}

function updateSliderLabels() {
  els.sizeValue.textContent = els.size.value;
  els.speedValue.textContent = `${Math.round(stepsPerSecond())} steps/s`;
}

function showAlgorithmInfo() {
  const algorithm = Algorithms.get(els.algorithm.value);
  els.infoName.textContent = algorithm.name;
  els.infoSummary.textContent = algorithm.summary;
  els.infoBest.textContent = algorithm.complexity.best;
  els.infoAverage.textContent = algorithm.complexity.average;
  els.infoWorst.textContent = algorithm.complexity.worst;
  els.infoSpace.textContent = algorithm.complexity.space;
  els.infoStable.textContent = algorithm.stable ? "Yes" : "No";
}

function fillSelect(select, options) {
  for (const { value, label } of options) {
    select.add(new Option(label, value));
  }
}

// ---------- Events ----------

els.play.addEventListener("click", togglePlay);
els.step.addEventListener("click", stepOnce);
els.reset.addEventListener("click", reset);
els.newArray.addEventListener("click", newArray);
els.pattern.addEventListener("change", newArray);
els.speed.addEventListener("input", updateSliderLabels);
els.sound.addEventListener("change", () => beeper.setEnabled(els.sound.checked));

els.size.addEventListener("input", () => {
  updateSliderLabels();
  newArray();
});

els.algorithm.addEventListener("change", () => {
  showAlgorithmInfo();
  reset();
});

const SHORTCUTS = {
  " ": togglePlay,
  ArrowRight: stepOnce,
  s: stepOnce,
  r: reset,
  n: newArray,
};

document.addEventListener("keydown", (event) => {
  // Leave keys alone while a control is focused, so it keeps its normal behaviour.
  if (event.target instanceof Element && event.target.closest("input, select, button, a")) return;
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  const action = SHORTCUTS[event.key.length === 1 ? event.key.toLowerCase() : event.key];
  if (!action) return;
  event.preventDefault();
  action();
});

// ---------- Start up ----------

fillSelect(
  els.algorithm,
  Algorithms.list.map(({ id, name }) => ({ value: id, label: name }))
);
fillSelect(
  els.pattern,
  Object.entries(ArrayPatterns).map(([value, { label }]) => ({ value, label }))
);
updateSliderLabels();
showAlgorithmInfo();
newArray();
