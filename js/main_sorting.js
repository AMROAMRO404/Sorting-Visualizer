let array = [];
let NumberOfBars = 30;
function createNewArray() {
  enabledInputs();
  document.querySelector("#bars").innerHTML = ""; // to delete the past bars
  array = [];
  for (let i = 0; i < NumberOfBars; i++) {
    array.push(Math.floor(Math.random() * 270) + 5);
  }
  const bars = document.querySelector("#bars");
  for (let i = 0; i < NumberOfBars; i++) {
    const bar = document.createElement("div");
    bar.style.height = `${array[i] * 2}px`;
    bar.classList.add("bar");
    bar.classList.add("vertical_line");
    bar.classList.add(`bar_No${i}`);
    bars.appendChild(bar);
  }
}

let delay = 50;
function setDelay(milisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, milisec);
  });
}

const speedBtn = document.querySelector("#speed_sorting");
speedBtn.addEventListener("input", async function () {
  delay = parseInt(speedBtn.value);
});

const sizeBtn = document.querySelector("#array_size");
sizeBtn.addEventListener("input", async function () {
  NumberOfBars = parseInt(sizeBtn.value);
  createNewArray();
});

const new_arrayBtn = document.querySelector("#new_array");
new_arrayBtn.addEventListener("click", async function () {
  createNewArray();
});

function disabledInputs() {
  document.querySelector("#time_sorting").disabled = true;
  document.querySelector("#navbarDropdown").disabled = true;
  document.querySelector("#speed_sorting").disabled = true;
  document.querySelector("#array_size").disabled = true;
}
function enabledInputs() {
  document.querySelector("#time_sorting").disabled = false;
  document.querySelector("#speed_sorting").disabled = false;
  document.querySelector("#array_size").disabled = false;
  document.querySelector("#navbarDropdown").disabled = false;
}

function writeTime(end, start) {
  console.log(`start ${start}`);
  console.log(`end ${end}`);
  console.log(`totalDelay ${totalDelay}`);
  let time = end - start - totalDelay;
  console.log(`time : ${time}`);
  document.querySelector(
    "#model_text"
  ).innerHTML = `Execution time: ${time} ms`;
}
let totalDelay = 0;
