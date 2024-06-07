export const getRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min
export const getRandomBool = () => getRandom(0, 2) === 1

export const getDimensions = (size, innerWidth, innerHeight) => (
  { width: Math.ceil(innerWidth / size), height: Math.ceil(innerHeight / size) }
)

export const create2dArray = (width, height, fill) => (
  Array(height).fill(null).map((line, i) => Array(width).fill(null).map((cell, j) => fill(i, j)))
)

export const map2d = (arr2d, map) => arr2d.map((line, i) => line.map((cell, j) => map(cell, i, j)))

export const getNextGeneration = (board) => map2d(board, (cell, i, j) => {
  const liveCells = [
    [i - 1, j - 1], [i, j + 1], [i + 1, j - 1],
    [i - 1, j    ]/*[i, j  ]*/, [i + 1, j    ],
    [i - 1, j + 1], [i, j - 1], [i + 1, j + 1],
  ].reduce((counter, [x, y]) => {
    if (x < 0) x = board.length - 1
    if (x >= board.length) x = 0
    if (y < 0) y = board[x].length - 1
    if (y >= board[x].length) y = 0

    if (board[x][y] === false) return counter
    return counter + 1
  }, 0)

  if (cell && (liveCells < 2 || liveCells > 3)) return false
  if (!cell && liveCells === 3) return true
  return cell
})
