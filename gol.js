const canvas = document.getElementById("gol-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cellSize = 10;
let cols = Math.floor(canvas.width / cellSize);
let rows = Math.floor(canvas.height / cellSize);
let grid = Array.from({ length: rows }, () =>
  Array.from({ length: cols }, () => Math.random() > 0.8 ? 1 : 0)
);

let speed = 100;
let cellColor = "#1e90ff";

const drawGrid = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x]) {
        ctx.fillStyle = cellColor;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
};

const updateGrid = () => {
  grid = grid.map((row, y) =>
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

      return neighbors === 3 || (cell && neighbors === 2) ? 1 : 0;
    })
  );
};

document.getElementById("speed-up").addEventListener("click", () => {
  speed = Math.max(speed - 20, 20);
});

document.getElementById("slow-down").addEventListener("click", () => {
  speed = Math.min(speed + 20, 1000);
});

document.getElementById("change-color").addEventListener("click", () => {
  cellColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
});

const loop = () => {
  drawGrid();
  updateGrid();
  setTimeout(loop, speed);
};

loop();
