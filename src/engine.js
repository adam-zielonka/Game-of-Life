import { getRandom, getRandomBool } from './utils'

export function getColors() {
  const [color1, color2] = [
    ['green', 'yellow'],
    ['red', 'pink'],
    ['blue', 'turquoise'],
    ['orange', 'purple'],
  ][getRandom(0, 4)]

  return getRandomBool() ? [color1, color2] : [color2, color1]
}

export function getEngine({ size, colorLife, colorDead }) {
  const ctx = document.getElementById('canvas').getContext('2d')
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight

  document.body.style.backgroundColor = colorDead

  let lastBoard = null

  const fill = (i, j, life) => {
    if (lastBoard && lastBoard[i][j] === life) return
    ctx.fillStyle = life ? colorLife : colorDead
    ctx.fillRect(j * size, i * size, size, size)
  }

  const fillBoard = (board) => {
    board.forEach((line, i) => line.forEach((cell, j) => fill(i, j, cell)))
    lastBoard = board
  }

  return { fillBoard }
}
