var startTime, interval;

function startFun() {
  document.getElementById("timer").innerHTML =
    "Excution time: 0 milliseconds, may there is an additional delay";
  startTime = Date.now();
  interval = setInterval(function () {
    updateDisplay(Date.now() - startTime);
  });
}

function stop() {
  clearInterval(interval);
}

function updateDisplay(currentTime) {
  document.getElementById("timer").innerHTML =
    `Excution time: ${currentTime} milliseconds ` +
    ", may there is an additional delay";
}
