export function getEngine({ size, colorLife, colorDead }) {
  const ctx = document.getElementById('canvas').getContext('2d')
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight

  document.body.style.backgroundColor = colorDead

  const fill = (i, j, life) => {
    ctx.fillStyle = life ? colorLife : colorDead
    ctx.fillRect(j * size, i * size, size, size)
  }

  const fillBoard = (board) => {
    board.forEach((line, i) => line.forEach((cell, j) => fill(i, j, cell)))
  }

  return { fill, fillBoard }
}
