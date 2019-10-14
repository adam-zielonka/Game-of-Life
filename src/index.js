import {
  create2dArray, getNextGeneration, getDimensions, getRandomBool,
} from './utils'
import { getEngine, getColors } from './engine'

function gameOfLife(board, time, fillBoard) {
  const mainLoop = (b) => {
    fillBoard(b)
    setTimeout(() => mainLoop(getNextGeneration(b)), time)
  }

  mainLoop(board)
}

const size = 15
const time = 80
const [colorLife, colorDead] = getColors()
const { fillBoard } = getEngine({ size, colorLife, colorDead })
const { width, height } = getDimensions(size, window.innerWidth, window.innerHeight)
const board = create2dArray(width, height, getRandomBool)

gameOfLife(getNextGeneration(board), time, fillBoard)
