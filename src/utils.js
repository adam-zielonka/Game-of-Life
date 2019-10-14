function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function getDimensions(size, innerWidth, innerHeight) {
  const width = innerWidth / size
  const height = innerHeight / size
  const count = Math.ceil(width) * Math.ceil(height)

  return { count, width, height }
}

export function getRandomSet(count) {
  const set = []
  for (let i = 0; i < count; i++) set.push(getRandom(0, 2) === 1)
  return set
}

export function generateBoard(width, height, set) {
  const board = []

  for (let i = 0; i < height; i++) {
    board[i] = []
    for (let j = 0; j < width; j++) board[i][j] = set.pop()
  }

  return board
}

export function getColors() {
  let [colorLife, colorDead] = [
    ['black', 'white'],
    ['green', 'yellow'],
    ['red', 'blue'],
    ['orange', 'purple'],
  ][getRandom(0, 4)]
  if (getRandom(0, 2) === 0) [colorLife, colorDead] = [colorDead, colorLife]
  return { colorLife, colorDead }
}

export function game(board, fill) {
  return board.map((line, i) => line.map((cell, j) => {
    const count = [
      [i - 1, j - 1],
      [i - 1, j],
      [i - 1, j + 1],
      [i, j + 1],
      [i, j - 1],
      [i + 1, j - 1],
      [i + 1, j],
      [i + 1, j + 1],
    ].reduce((c, [x, y]) => (board[x] && board[x][y] ? c + 1 : c), 0)

    if (cell) {
      if (count < 2 || count > 3) {
        fill(i, j, false)
        return false
      }
    } else if (count === 3) {
      fill(i, j, true)
      return true
    }
    return cell
  }))
}
