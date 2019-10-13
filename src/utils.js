function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getDimensions(size, innerWidth, innerHeight) {
  const width = innerWidth / size
  const height = innerHeight / size
  const count = Math.ceil(width) * Math.ceil(height)

  return { count, width, height }
}

export function getRandomSet(count) {
  const set = []
  for(let i = 0; i < count; i++) set.push(getRandom(0, 2) === 1)
  return set
}

export function generateBoard(width, height, set) {
  const board = []

  for(let i = 0; i < height; i++) {
    board[i] = []
    for(let j = 0; j < width; j++)
      board[i][j] = set.pop()
  }

  return board
}

export function getColors() {
  let colorLife, colorDead
  switch (getRandom(1, 5)) {
    case 1:
      colorLife = "green"
      colorDead = "yellow"
      break
    case 2:
      colorLife = "red"
      colorDead = "blue"
      break
    case 3:
      colorLife = "orange"
      colorDead = "purple"
      break
    default:
      colorLife = "black"
      colorDead = "white"
  }
  if(getRandom(0, 2) === 0) [colorLife, colorDead] = [colorDead, colorLife]
  return { colorLife, colorDead }
}

function checkNeighbor(board, i, j) {
  return board[i] && board[i][j]
}

export function game(board, fill) {
  const result = board.map(item => item.slice())
  for (let i = 0; i < board.length; i++) {
    for (let j = 0, count = 0; j < board[i].length; j++, count = 0) {
      if(checkNeighbor(board, i - 1, j - 1)) count++
      if(checkNeighbor(board, i - 1, j    )) count++
      if(checkNeighbor(board, i - 1, j + 1)) count++
      if(checkNeighbor(board, i    , j + 1)) count++
      if(checkNeighbor(board, i    , j - 1)) count++
      if(checkNeighbor(board, i + 1, j - 1)) count++
      if(checkNeighbor(board, i + 1, j    )) count++
      if(checkNeighbor(board, i + 1, j + 1)) count++
      
      if (board[i][j]) {
        if (count < 2 || count > 3) {
          result[i][j] = false
          fill(i, j, false)
        }
      } else {
        if (count == 3) {
          result[i][j] = true
          fill(i, j, true)
        }
      }
    }
  }
  return result
}
