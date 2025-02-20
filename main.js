document.addEventListener('DOMContentLoaded', () => {
    const distanceInput = document.getElementById('distance');
    const speedInput = document.getElementById('speed');
    const calculateButton = document.getElementById('calculate');
    const clearButton = document.getElementById('clear');
    const timeResult = document.getElementById('time-result');
    const currentTimeDisplay = document.getElementById('current-time');
    const arrivalTimeDisplay = document.getElementById('arrival-time');

    function updateCurrentTime() {
        const now = new Date();
        currentTimeDisplay.textContent = now.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);

    function calculateTime() {
        const distance = parseFloat(distanceInput.value);
        const speed = parseFloat(speedInput.value);

        if (isNaN(distance) || isNaN(speed) || distance <= 0 || speed <= 0) {
            timeResult.textContent = 'Ingrese valores válidos';
            arrivalTimeDisplay.textContent = '--/--/---- --:--:--';
            return;
        }

        const timeInSeconds = (distance / speed) * 3600;
        const arrivalTime = new Date(Date.now() + timeInSeconds * 1000);
        timeResult.textContent = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
        arrivalTimeDisplay.textContent = arrivalTime.toLocaleString('es-ES');
    }

    function clearFields() {
        distanceInput.value = '';
        speedInput.value = '';
        timeResult.textContent = '--:--:--';
        arrivalTimeDisplay.textContent = '--/--/---- --:--:--';
    }

    calculateButton.addEventListener('click', calculateTime);
    clearButton.addEventListener('click', clearFields);
});
