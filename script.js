let timer;
let startTime;
let elapsedTime = 0;
let running = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

document.getElementById("start").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", recordLap);

function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;
  display.textContent = timeToString(elapsedTime);
}

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formatted = 
    `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}:${String(ms).padStart(2, "0")}`;
  return formatted;
}

function start() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    running = true;
  }
}

function pause() {
  if (running) {
    clearInterval(timer);
    running = false;
  }
}

function reset() {
  clearInterval(timer);
  running = false;
  elapsedTime = 0;
  display.textContent = "00:00:00";
  laps.innerHTML = "";
}

function recordLap() {
  if (running) {
    const li = document.createElement("li");
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
}
