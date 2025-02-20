document.addEventListener('DOMContentLoaded', () => {
  // Increment visit counter in localStorage
  const visits = parseInt(localStorage.getItem('visitCount') || '0') + 1;
  localStorage.setItem('visitCount', visits);
  document.getElementById('visit-count').textContent = visits;

  const distanceInput = document.getElementById('distance');
  const speedInput = document.getElementById('speed');
  const calculateButton = document.getElementById('calculate');
  const timeResult = document.getElementById('time-result');
  const currentTimeDisplay = document.getElementById('current-time');
  const arrivalTimeDisplay = document.getElementById('arrival-time');

  // Update current time every second
  function updateCurrentTime() {
    const now = new Date();
    currentTimeDisplay.textContent = now.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Initial current time display and start interval
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);

  function calculateTime() {
    const distance = parseFloat(distanceInput.value);
    const speed = parseFloat(speedInput.value);

    if (isNaN(distance) || isNaN(speed)) {
      timeResult.textContent = 'Ingrese valores válidos';
      arrivalTimeDisplay.textContent = '--:--';
      return;
    }

    if (speed <= 0) {
      timeResult.textContent = 'La velocidad debe ser mayor a 0';
      arrivalTimeDisplay.textContent = '--:--';
      return;
    }

    // Calculate time in hours
    const timeInHours = distance / speed;
    
    // Convert to hours and minutes
    const hours = Math.floor(timeInHours);
    const minutes = Math.round((timeInHours - hours) * 60);

    // Format the trip duration
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    
    timeResult.textContent = `${formattedHours}:${formattedMinutes}`;

    // Calculate arrival time
    const now = new Date();
    const arrivalTime = new Date(now.getTime() + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000));
    
    arrivalTimeDisplay.textContent = arrivalTime.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  calculateButton.addEventListener('click', calculateTime);

  // Allow Enter key to trigger calculation
  [distanceInput, speedInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        calculateTime();
      }
    });
  });
});