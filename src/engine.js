import Colors from './colors'
import Settings from './settings'

const ctx = document.getElementById('canvas').getContext('2d')
let lastBoard, colorLife, colorDead = null
let size = Settings.size

function renderCell(i, j, life) {
  if (lastBoard && lastBoard[i][j] === life) return
  ctx.fillStyle = life ? colorLife : colorDead
  ctx.fillRect(j * size, i * size, size, size)
}

function render(board) {
  board.forEach((line, i) => line.forEach((cell, j) => renderCell(i, j, cell)))
  lastBoard = board
}

function restart() {
  size = Settings.size
  ;[colorLife, colorDead] = Colors.random()

  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight
  document.body.style.backgroundColor = colorDead
}

export default {
  render,
  restart,
}
