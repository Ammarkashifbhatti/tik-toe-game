document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');

    if (startButton) {
        startButton.addEventListener('click', () => {
            const player1 = player1Input.value || 'Player 1';
            const player2 = player2Input.value || 'Player 2';
            localStorage.setItem('player1', player1);
            localStorage.setItem('player2', player2);
            window.location.href = 'game.html';
        });
    }

    const player1 = localStorage.getItem('player1');
    const player2 = localStorage.getItem('player2');
    const statusDisplay = document.getElementById('status');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');

    if (player1 && player2 && statusDisplay && cells.length > 0 && restartButton) {
        let currentPlayer = player1;
        let gameActive = true;
        let gameState = ['', '', '', '', '', '', '', '', ''];

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        statusDisplay.textContent = `${currentPlayer}'s turn`;

        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });

        restartButton.addEventListener('click', handleRestartGame);

        function handleCellClick(event) {
            const clickedCell = event.target;
            const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

            if (gameState[clickedCellIndex] !== '' || !gameActive) {
                return;
            }

            gameState[clickedCellIndex] = currentPlayer;
            clickedCell.textContent = currentPlayer === player1 ? 'X' : 'O';

            if (checkWinner()) {
                statusDisplay.textContent = `${currentPlayer} wins!`;
                gameActive = false;
            } else if (!gameState.includes('')) {
                statusDisplay.textContent = `It's a draw!`;
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                statusDisplay.textContent = `${currentPlayer}'s turn`;
            }
        }

        function checkWinner() {
            let roundWon = false;
            for (let i = 0; i < winningConditions.length; i++) {
                const winCondition = winningConditions[i];
                let a = gameState[winCondition[0]];
                let b = gameState[winCondition[1]];
                let c = gameState[winCondition[2]];
                if (a === '' || b === '' || c === '') {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break;
                }
            }
            return roundWon;
        }

        function handleRestartGame() {
            gameActive = true;
            currentPlayer = player1;
            gameState = ['', '', '', '', '', '', '', '', ''];
            statusDisplay.textContent = `${currentPlayer}'s turn`;
            cells.forEach(cell => cell.textContent = '');
        }
    }
});