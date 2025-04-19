// Game State
const gameState = {
    currentPlayer: 'X',
    gridSize: 3,
    gameBoard: [],
    isGameOver: false,
    audioEnabled: {
        music: true,
        sound: true
    }
};

// DOM Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const gameBoard = document.getElementById('game-board');
const currentPlayerDisplay = document.getElementById('current-player');
const gameStatus = document.getElementById('game-status');
const startGameButton = document.getElementById('start-game');
const playAgainButton = document.getElementById('play-again');
const newGameButton = document.getElementById('new-game');
const musicToggle = document.getElementById('music-toggle');
const soundToggle = document.getElementById('sound-toggle');

// Audio Elements
const backgroundMusic = document.getElementById('background-music');
const moveSound = document.getElementById('move-sound');
const winSound = document.getElementById('win-sound');
const drawSound = document.getElementById('draw-sound');

// Initialize the game
function init() {
    setupEventListeners();
    loadAudioSettings();
}

// Set up event listeners
function setupEventListeners() {
    // Grid size selection
    document.querySelectorAll('.grid-option').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.grid-option').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            gameState.gridSize = parseInt(button.dataset.size);
            startGameButton.disabled = false;
        });
    });

    // Start game button
    startGameButton.addEventListener('click', startGame);

    // Play again button
    playAgainButton.addEventListener('click', resetGame);

    // New game button
    newGameButton.addEventListener('click', () => {
        gameScreen.classList.remove('active');
        startScreen.classList.add('active');
    });

    // Audio controls
    musicToggle.addEventListener('click', toggleBackgroundMusic);
    soundToggle.addEventListener('click', toggleSoundEffects);
}

// Start a new game
function startGame() {
    startScreen.classList.remove('active');
    gameScreen.classList.add('active');
    resetGame();
    if (gameState.audioEnabled.music) {
        backgroundMusic.play().catch(() => {
            // Handle autoplay restrictions
            console.log('Autoplay prevented. User interaction required.');
        });
    }
}

// Reset the game state
function resetGame() {
    gameState.currentPlayer = 'X';
    gameState.isGameOver = false;
    gameState.gameBoard = Array(gameState.gridSize).fill().map(() => Array(gameState.gridSize).fill(''));
    
    currentPlayerDisplay.textContent = "Player X's Turn";
    gameStatus.textContent = '';
    
    createGameBoard();
}

// Create the game board
function createGameBoard() {
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${gameState.gridSize}, 1fr)`;
    
    for (let row = 0; row < gameState.gridSize; row++) {
        for (let col = 0; col < gameState.gridSize; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => handleCellClick(row, col));
            gameBoard.appendChild(cell);
        }
    }
}

// Handle cell click
function handleCellClick(row, col) {
    if (gameState.isGameOver || gameState.gameBoard[row][col] !== '') return;

    gameState.gameBoard[row][col] = gameState.currentPlayer;
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    cell.textContent = gameState.currentPlayer;
    cell.classList.add(gameState.currentPlayer.toLowerCase());

    if (gameState.audioEnabled.sound) {
        moveSound.currentTime = 0;
        moveSound.play();
    }

    if (checkWin(row, col)) {
        handleWin();
    } else if (checkDraw()) {
        handleDraw();
    } else {
        gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerDisplay.textContent = `Player ${gameState.currentPlayer}'s Turn`;
    }
}

// Check for win
function checkWin(row, col) {
    const player = gameState.gameBoard[row][col];
    const size = gameState.gridSize;

    // Check row
    if (gameState.gameBoard[row].every(cell => cell === player)) {
        highlightWinningLine('row', row);
        return true;
    }

    // Check column
    if (gameState.gameBoard.every(row => row[col] === player)) {
        highlightWinningLine('col', col);
        return true;
    }

    // Check diagonal
    if (row === col) {
        if (gameState.gameBoard.every((row, i) => row[i] === player)) {
            highlightWinningLine('diag', 0);
            return true;
        }
    }

    // Check anti-diagonal
    if (row + col === size - 1) {
        if (gameState.gameBoard.every((row, i) => row[size - 1 - i] === player)) {
            highlightWinningLine('diag', 1);
            return true;
        }
    }

    return false;
}

// Highlight winning line
function highlightWinningLine(type, index) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const size = gameState.gridSize;

        if (
            (type === 'row' && row === index) ||
            (type === 'col' && col === index) ||
            (type === 'diag' && index === 0 && row === col) ||
            (type === 'diag' && index === 1 && row + col === size - 1)
        ) {
            cell.classList.add('winning-line');
        }
    });
}

// Check for draw
function checkDraw() {
    return gameState.gameBoard.every(row => row.every(cell => cell !== ''));
}

// Confetti Animation
function startConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    window.addEventListener('resize', () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    });

    const confettiColors = [
        '#fde132', '#009bde', '#ff6b00', '#ff3cac', '#a8ff78', '#43e97b', '#38f9d7'
    ];

    function randomColor() {
        return confettiColors[Math.floor(Math.random() * confettiColors.length)];
    }

    function ConfettiParticle() {
        this.x = Math.random() * W;
        this.y = Math.random() * H - H;
        this.r = Math.random() * 6 + 4;
        this.d = Math.random() * 100 + 10;
        this.color = randomColor();
        this.tilt = Math.floor(Math.random() * 10) - 10;
        this.tiltAngleIncremental = (Math.random() * 0.07) + .05;
        this.tiltAngle = 0;
        this.opacity = 1;

        this.draw = function() {
            ctx.beginPath();
            ctx.lineWidth = this.r;
            ctx.strokeStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.moveTo(this.x + this.tilt + (this.r / 3), this.y);
            ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }

    let confettiParticles = [];
    let confettiCount = 100;
    for (let i = 0; i < confettiCount; i++) {
        confettiParticles.push(new ConfettiParticle());
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < confettiParticles.length; i++) {
            confettiParticles[i].draw();
        }
        updateConfetti();
    }

    function updateConfetti() {
        for (let i = 0; i < confettiParticles.length; i++) {
            let p = confettiParticles[i];
            p.y += (Math.cos(p.d) + 3 + p.r / 2) * 2;
            p.x += Math.sin(0.01 * p.d);

            p.tiltAngle += p.tiltAngleIncremental;
            p.tilt = Math.sin(p.tiltAngle) * 15;

            if (p.y > H) {
                confettiParticles[i] = new ConfettiParticle();
                confettiParticles[i].x = Math.random() * W;
                confettiParticles[i].y = -10;
            }
        }
    }

    let startTime = Date.now();
    let fadeStartTime = startTime + 3000; // Start fading after 3 seconds
    let endTime = startTime + 5000; // End after 5 seconds total

    function animateConfetti() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        
        if (currentTime >= endTime) {
            cancelAnimationFrame(animationFrame);
            ctx.clearRect(0, 0, W, H);
            return;
        }

        // Apply fade-out effect
        if (currentTime >= fadeStartTime) {
            const fadeProgress = (currentTime - fadeStartTime) / 2000; // 2 second fade
            confettiParticles.forEach(particle => {
                particle.opacity = 1 - fadeProgress;
            });
        }

        drawConfetti();
        animationFrame = requestAnimationFrame(animateConfetti);
    }

    animateConfetti();
}

// Handle win
function handleWin() {
    gameState.isGameOver = true;
    const playerSymbol = gameState.currentPlayer;
    const playerClass = playerSymbol.toLowerCase();
    gameStatus.innerHTML = `Player <span class="player-${playerClass}">${playerSymbol}</span> Wins!`;
    if (gameState.audioEnabled.sound) {
        winSound.currentTime = 0;
        winSound.play();
    }
    startConfetti();
}

// Handle draw
function handleDraw() {
    gameState.isGameOver = true;
    gameStatus.textContent = "It's a Draw!";
    if (gameState.audioEnabled.sound) {
        drawSound.currentTime = 0;
        drawSound.play();
    }
}

// Audio controls
function toggleBackgroundMusic() {
    gameState.audioEnabled.music = !gameState.audioEnabled.music;
    musicToggle.classList.toggle('muted');
    if (gameState.audioEnabled.music) {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
    }
    saveAudioSettings();
}

function toggleSoundEffects() {
    gameState.audioEnabled.sound = !gameState.audioEnabled.sound;
    soundToggle.classList.toggle('muted');
    saveAudioSettings();
}

// Save audio settings to localStorage
function saveAudioSettings() {
    localStorage.setItem('ticTacToeAudioSettings', JSON.stringify(gameState.audioEnabled));
}

// Load audio settings from localStorage
function loadAudioSettings() {
    const savedSettings = localStorage.getItem('ticTacToeAudioSettings');
    if (savedSettings) {
        gameState.audioEnabled = JSON.parse(savedSettings);
        if (!gameState.audioEnabled.music) musicToggle.classList.add('muted');
        if (!gameState.audioEnabled.sound) soundToggle.classList.add('muted');
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 