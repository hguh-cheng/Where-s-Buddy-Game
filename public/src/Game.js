import { levels } from './LevelData.js';

export class Game {
    constructor(levels = levels) {
        this.levels = levels;
        this.currentLevel = 0;
        this.gameBoard = document.getElementById('game-board');
        this.gameImage = document.getElementById('game-image');
        this.levelTitle = document.getElementById('level-title');
        this.gameOverModal = document.getElementById('game-over-modal');
        this.restartBtn = document.getElementById('restart-btn');

        this.initializeGame();
    }

    initializeGame() {
        this.loadLevel(this.currentLevel);
        this.gameImage.addEventListener('click', this.handleClick.bind(this));
        this.restartBtn.addEventListener('click', this.restartGame.bind(this));
    }

    loadLevel(levelIndex) {
        const level = this.levels[levelIndex];
        this.gameImage.src = level.image;
        this.levelTitle.textContent = `Find the Character - Level ${levelIndex + 1}`;
    }

    handleClick(event) {
        const rect = this.gameImage.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const target = this.levels[this.currentLevel].targetPosition;

        if (
            x >= target.x &&
            x <= target.x + target.width &&
            y >= target.y &&
            y <= target.y + target.height
        ) {
            this.advanceLevel();
        }
    }

    advanceLevel() {
        this.currentLevel++;
        if (this.currentLevel < this.levels.length) {
            this.loadLevel(this.currentLevel);
        } else {
            this.endGame();
        }
    }

    endGame() {
        this.gameOverModal.classList.remove('hidden');
    }

    restartGame() {
        this.currentLevel = 0;
        this.loadLevel(this.currentLevel);
        this.gameOverModal.classList.add('hidden');
    }
}