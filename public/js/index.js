const renderBoard = () => {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            let cellValue = getCellValue(x, y, board);
            let tile = document.querySelector(`.tile[x="${x}"][y="${y}"]`);

            if (cellValue) {
                tile.classList.remove("tile__dead");
                tile.classList.add("tile__alive");
            }
            else {
                tile.classList.remove("tile__alive");
                tile.classList.add("tile__dead");
            }
        }
    }
}


window.onresize = () => {
    pseudoTileSize = document.body.clientWidth <= 768 && document.body.clientHeight <= 1024 ?
    30 : 45;

    columns = Math.floor(document.body.clientWidth / pseudoTileSize);
    rows = Math.floor((document.body.clientHeight - 60) / pseudoTileSize);

    createGrid()
    board = initializeBoard(columns, rows, 20); 
    renderBoard();
};

window.onload = () => {
    let paused = false;

    let pauseButton = document.querySelector("#pause");
    pauseButton && pauseButton.addEventListener("click", () => {
        paused = !paused;
        pauseButton.innerHTML = paused? "Resume": "Pause";
        nextButton.disabled = !paused;
    });

    let nextButton = document.querySelector("#next");
    if (nextButton) nextButton.disabled = true;
    nextButton && nextButton.addEventListener("click", () => {
        if (paused) {
            board = nextGeneration(board);
            renderBoard();
        }
    });

    let resetButton = document.querySelector("#reset");
    resetButton && resetButton.addEventListener("click", () => {
        board = initializeBoard(columns, rows, 20);
        renderBoard();
    })

    let clearButton = document.querySelector("#clear");
    clearButton && clearButton.addEventListener("click", () => {
        board = initializeBoard(columns, rows, 0);
        renderBoard();
    });

    setInterval(() => {
        if (document.hidden || paused) {
            return;
        }
        board = nextGeneration(board);
        renderBoard();
    }, 300);
}
