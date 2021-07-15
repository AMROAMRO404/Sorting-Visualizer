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
let currentTime;
function updateDisplay(currentTime) {
  document.getElementById(
    "timer"
  ).innerHTML = `Excution time: ${currentTime}, may there is an additional delay `;
}
