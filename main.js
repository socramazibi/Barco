document.addEventListener('DOMContentLoaded', () => { const distanceInput = document.getElementById('distance'); const speedInput = document.getElementById('speed'); const calculateButton = document.getElementById('calculate'); const timeResult = document.getElementById('time-result'); const currentTimeDisplay = document.getElementById('current-time'); const arrivalTimeDisplay = document.getElementById('arrival-time');

function formatDateTime(date) { const day = String(date.getDate()).padStart(2, '0'); const month = String(date.getMonth() + 1).padStart(2, '0'); const year = date.getFullYear(); const hours = String(date.getHours()).padStart(2, '0'); const minutes = String(date.getMinutes()).padStart(2, '0'); const seconds = String(date.getSeconds()).padStart(2, '0'); return ${day}/${month}/${year} ${hours}:${minutes}:${seconds}; }

function updateCurrentTime() { const now = new Date(); currentTimeDisplay.textContent = formatDateTime(now); }

updateCurrentTime(); setInterval(updateCurrentTime, 1000);

function calculateTime() { const distance = parseFloat(distanceInput.value); const speed = parseFloat(speedInput.value);

if (isNaN(distance) || isNaN(speed) || distance <= 0 || speed <= 0) {
  timeResult.textContent = 'Ingrese valores válidos';
  arrivalTimeDisplay.textContent = '--/--/---- --:--:--';
  return;
}

const timeInSeconds = (distance / speed) * 3600;
const hours = Math.floor(timeInSeconds / 3600);
const minutes = Math.floor((timeInSeconds % 3600) / 60);
const seconds = Math.floor(timeInSeconds % 60);

timeResult.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

const now = new Date();
const arrivalTime = new Date(now.getTime() + timeInSeconds * 1000);
arrivalTimeDisplay.textContent = formatDateTime(arrivalTime);

}

calculateButton.addEventListener('click', calculateTime); [distanceInput, speedInput].forEach(input => { input.addEventListener('keypress', (e) => { if (e.key === 'Enter') { calculateTime(); } }); }); });
