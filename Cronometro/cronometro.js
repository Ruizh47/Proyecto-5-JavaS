let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const chronoDisplay = document.getElementById('chrono-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');

// Función para dar formato al tiempo
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return (
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds
    );
}

// Actualizar la pantalla del cronómetro
function updateDisplay() {
    chronoDisplay.textContent = formatTime(elapsedTime);
}

// Iniciar el cronómetro
function startChrono() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime; // Ajustar por el tiempo ya transcurrido
        intervalId = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 1000); // Actualizar cada segundo
        isRunning = true;
        startBtn.textContent = 'Reanudar';
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

// Pausar el cronómetro
function pauseChrono() {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true;
    }
}

// Reiniciar el cronómetro
function resetChrono() {
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    updateDisplay();
    startBtn.textContent = 'Iniciar';
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    lapList.innerHTML = ''; // Limpiar la lista de vueltas
}

// Anotar una vuelta
function recordLap() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapList.appendChild(lapItem);
}

// Eventos para los botones
startBtn.addEventListener('click', startChrono);
pauseBtn.addEventListener('click', pauseChrono);
resetBtn.addEventListener('click', resetChrono);
lapBtn.addEventListener('click', recordLap);

// Iniciar el cronómetro en cero al cargar la página
updateDisplay();
