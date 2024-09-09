let board;
let score = 0;
const rows = 4, columns = 4;
let placeTwoNext = true; // Control the type of tile to place

window.onload = setGame;

function setGame() {
    board = Array.from({ length: rows }, () => Array(columns).fill(0));
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            updateTile(tile, board[r][c]);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function updateTile(tile, num) {
    tile.innerText = num ? num.toString() : '';
    tile.className = num ? `tile x${num}` : 'tile';
}

document.addEventListener('keyup', e => {
    const moves = {
        ArrowLeft: slideLeft,
        ArrowRight: slideRight,
        ArrowUp: slideUp,
        ArrowDown: slideDown
    };
    if (moves[e.code]) {
        moves[e.code]();
        setTwo();
        document.getElementById("score").innerText = score;
    }
});

function filterZero(row) {
    return row.filter(num => num !== 0);
}

function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            score += row[i];
            row[i + 1] = 0;
        }
    }
    row = filterZero(row);
    while (row.length < columns) row.push(0);
    return row;
}

function slideLeft() {
    board = board.map(row => slide(row));
    updateBoard();
}

function slideRight() {
    board = board.map(row => slide(row.reverse()).reverse());
    updateBoard();
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        const col = board.map(row => row[c]);
        const newCol = slide(col);
        for (let r = 0; r < rows; r++) board[r][c] = newCol[r];
    }
    updateBoard();
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        const col = board.map(row => row[c]).reverse();
        const newCol = slide(col).reverse();
        for (let r = 0; r < rows; r++) board[r][c] = newCol[r];
    }
    updateBoard();
}

function setTwo() {
    const emptyTiles = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === 0) emptyTiles.push([r, c]);
        }
    }
    if (emptyTiles.length > 0) {
        // Determine tile to place
        const [r, c] = emptyTiles[0];
        board[r][c] = placeTwoNext ? 2 : 4;
        const tile = document.getElementById(`${r}-${c}`);
        updateTile(tile, board[r][c]);
        placeTwoNext = !placeTwoNext; // Toggle between placing 2 and 4
    }
}

function updateBoard() {
    board.forEach((row, r) => row.forEach((num, c) => updateTile(document.getElementById(`${r}-${c}`), num)));
}
