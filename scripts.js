document.addEventListener('DOMContentLoaded', function() {
    let playerName = '';
    while (!playerName.trim()) {
        playerName = prompt("Introduce yourself:");
        if (!playerName.trim()) {
            alert("Name cannot be empty. Please enter your name.");
        }
    }
    document.getElementById('prompt').innerText = `Welcome, ${playerName}!`;

    const cardValues = {
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'J': 2,
        'Q': 3,
        'K': 4,
        'A': 11
    };

    let playerCards = [];
    let computerCards = [];
    let playerPoints = 0;
    let computerPoints = 0;
    let isPlayerTurn = true;
    let playerRounds = 0;
    let computerRounds = 0;

    function initializeGame() {
        document.getElementById('draw-card').addEventListener('click', drawCardHandler);
        document.getElementById('pass').addEventListener('click', passHandler);
        document.getElementById('restart').addEventListener('click', restartGame);
    }

    function drawCardHandler() {
        if (playerRounds < 3 && playerPoints <= 21 && computerPoints <= 21) {
            drawCard();
        }
        if (!isPlayerTurn && computerRounds < 3 && computerPoints <= 21) {
            setTimeout(computerMove, 1000);
        }
    }

    function passHandler() {
        if (isPlayerTurn && playerRounds < 3 && playerPoints <= 21) {
            isPlayerTurn = false;
            playerRounds++;
            if (computerRounds < 3 && computerPoints <= 21) {
                setTimeout(computerMove, 1000);
            }
        }
    }

    initializeGame();

    function drawCard() {
        let card = getRandomCard();
        if (isPlayerTurn) {
            playerCards.push(card);
            playerPoints += cardValues[card];
            playerRounds++;
        } else {
            computerCards.push(card);
            computerPoints += cardValues[card];
            computerRounds++;
        }
        updateResults();

        if (playerPoints === 21) {
            endGame(`${playerName} won!`);
            return;
        } else if (playerPoints > 21) {
            endGame("You lose!");
            return;
        } else if (computerPoints === 21) {
            endGame("You lose!");
            return;
        } else if (computerPoints > 21) {
            endGame(`${playerName} won!`);
            return;
        }

        isPlayerTurn = !isPlayerTurn;
        if (playerRounds === 3 && computerRounds === 3) {
            determineWinner();
        }
    }

    function computerMove() {
        if (computerPoints < 17 && computerRounds < 3) {
            drawCard();
        } else {
            isPlayerTurn = true;
            computerRounds++;
            if (playerRounds === 3 && computerRounds === 3) {
                determineWinner();
            }
        }
    }

    function getRandomCard() {
        const cards = Object.keys(cardValues);
        return cards[Math.floor(Math.random() * cards.length)];
    }

    function updateResults() {
        document.getElementById('player-cards').innerHTML = playerCards.map(card => `<img src="css/img/${card}.jpg" alt="${card}">`).join('');
        document.getElementById('computer-cards').innerHTML = computerCards.map(card => `<img src="css/img/${card}.jpg" alt="${card}">`).join('');
        document.getElementById('player-points').innerText = playerPoints;
        document.getElementById('computer-points').innerText = computerPoints;
    }

    function determineWinner() {
        if (playerPoints > computerPoints && playerPoints <= 21) {
            endGame(`${playerName} won!`);
        } else if (computerPoints > playerPoints && computerPoints <= 21) {
            endGame("You lose!");
        } else {
            endGame("Draw!");
        }
    }

    function endGame(message) {
        document.getElementById('winner').innerText = message;
        document.getElementById('draw-card').disabled = true;
        document.getElementById('pass').disabled = true;

        document.getElementById('draw-card').style.display = 'none';
        document.getElementById('pass').style.display = 'none';
        document.getElementById('restart').style.display = 'block';
    }

    function restartGame() {
        playerCards = [];
        computerCards = [];
        playerPoints = 0;
        computerPoints = 0;
        isPlayerTurn = true;
        playerRounds = 0;
        computerRounds = 0;
        updateResults();
        document.getElementById('winner').innerText = '';

        document.getElementById('draw-card').style.display = 'inline-block';
        document.getElementById('pass').style.display = 'inline-block';
        document.getElementById('restart').style.display = 'none';

        document.getElementById('draw-card').disabled = false;
        document.getElementById('pass').disabled = false;
    }
    document.getElementById('restart').style.display = 'none';
});
