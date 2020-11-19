document.addEventListener("DOMContentLoaded", function () {
    const game = new GameOfLife(10, 10);
    const playButton = document.querySelector("#play");
    const pauseButton = document.querySelector('#pause');
    function GameOfLife(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.cells = [];
        this.board = document.querySelector("#board");
        this.divPosition = function (x, y) {
            var index = x + y * game.width;
            return game.cells[index];
        };
        this.createBoard = function () {
            game.board.style.width = (game.width * 10) + 'px';
            game.board.style.height = (game.height * 10) + 'px';
            const divNumber = game.width * game.height;
            for (let i = 0; i < divNumber; i++) {
                var div = document.createElement('div');
                board.appendChild(div)
            }
            game.cells = board.querySelectorAll('div');
            game.cells.forEach(function (div) {
                div.addEventListener('click', function () {
                    this.classList.toggle('live');
                })
            })
        };
        this.computeCellNextState = function (x, y) {
            const div = game.divPosition(x, y);
            const neighborsList = [];
            neighborsList.push(game.divPosition(x - 1, y - 1));
            neighborsList.push(game.divPosition(x, y - 1));
            neighborsList.push(game.divPosition(x + 1, y - 1));
            neighborsList.push(game.divPosition(x - 1, y));
            neighborsList.push(game.divPosition(x + 1, y));
            neighborsList.push(game.divPosition(x - 1, y + 1));
            neighborsList.push(game.divPosition(x, y + 1));
            neighborsList.push(game.divPosition(x + 1, y + 1));
            let livingNeighbors = 0;
            neighborsList.forEach(function (neighbor) {
                if (!(typeof neighbor == 'undefined') && neighbor.classList.contains('live')) {
                    livingNeighbors += 1
                }
            });
            if (div.classList.contains('live') && livingNeighbors < 2 || div.classList.contains('live') && livingNeighbors > 3) {
                return 0
            } else if (div.classList.contains('live') && livingNeighbors === 2 || div.classList.contains('live') && livingNeighbors === 3) {
                return 1
            } else if (!div.classList.contains('live') && livingNeighbors === 3) {
                return 1
            } else {
                return 0
            }
        };
        this.computeNextGeneration = function () {
            const futureBoardState = [];
            for (let y = 0; y < 10; y++) {
                for (let x = 0; x < 10; x++) {
                    futureBoardState.push(game.computeCellNextState(x, y))
                }
            }
            return futureBoardState;
        };
        this.printNextGeneration = function () {
            const boardState = game.computeNextGeneration();
            for (let i = 0; i < 100; i++) {
                if (boardState[i] > 0) {
                    game.cells[i].classList.add('live')
                } else {
                    if (game.cells[i].classList.contains('live')) {
                        game.cells[i].classList.remove('live')
                    }
                }
            }
        }
    }
    game.createBoard();
    function init() {
        let playInterval = 0;
        playButton.addEventListener('click', function () {
            playInterval = setInterval(function () {
                game.printNextGeneration();
            }, 1000);
        });
        pauseButton.addEventListener('click', function () {
            clearInterval(playInterval)
        });
    }
    init();
});









