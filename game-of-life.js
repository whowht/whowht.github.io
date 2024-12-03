const canvas = document.getElementById("game-of-life-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cellSize = 10;
const cols = Math.floor(canvas.width / cellSize);
const rows = Math.floor(canvas.height / cellSize);

let grid = Array.from({ length: rows }, () =>
  Array.from({ length: cols }, () => Math.random() > 0.8 ? 1 : 0)
);

const drawGrid = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      ctx.fillStyle = grid[y][x] ? "#1e90ff" : "#121212";
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
};

const updateGrid = () => {
  const nextGen = grid.map((row, y) =>
    row.map((cell, x) => {
      const neighbors = [
        grid[y - 1]?.[x - 1],
        grid[y - 1]?.[x],
        grid[y - 1]?.[x + 1],
        grid[y]?.[x - 1],
        grid[y]?.[x + 1],
        grid[y + 1]?.[x - 1],
        grid[y + 1]?.[x],
        grid[y + 1]?.[x + 1],
      ].filter(Boolean).reduce((a, b) => a + b, 0);

      return neighbors === 3 || (neighbors === 2 && cell) ? 1 : 0;
    })
  );
  grid = nextGen;
};

const gameLoop = () => {
  drawGrid();
  updateGrid();
  requestAnimationFrame(gameLoop);
};

gameLoop();
