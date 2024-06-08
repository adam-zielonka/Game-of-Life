import { create2dArray, getDimensions, map2d } from './utils'
import Settings from './settings'
import Random from './random'

const getNextGeneration = (board) => map2d(board, (cell, i, j) => {
  const aroundCells = [
    [i - 1, j - 1], [i, j + 1], [i + 1, j - 1],
    [i - 1, j    ]/*[i, j  ]*/, [i + 1, j    ],
    [i - 1, j + 1], [i, j - 1], [i + 1, j + 1],
  ]

  let livingCells = 0
  for (let [x, y] of aroundCells) {
    if (x < 0) x = board.length - 1
    if (x >= board.length) x = 0
    if (y < 0) y = board[x].length - 1
    if (y >= board[x].length) y = 0

    if (board[x][y]) livingCells++
  }

  if (cell && (livingCells < 2 || livingCells > 3)) return false
  if (!cell && livingCells === 3) return true
  return cell
})

function *generator() {
  const { width, height } = getDimensions(Settings.size, window.innerWidth, window.innerHeight)
  let board = create2dArray(width, height, Random.bool)

  while (true) { 
    board = getNextGeneration(board)
    yield board
  }
}

export default {
  generator
}
