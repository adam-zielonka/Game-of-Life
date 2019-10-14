import {
  createBoard, createSet, getNextGeneration, getDimensions, getColors, getRandomBool,
} from './utils'
import { getEngine } from './engine'

function gameOfLife(board, time, fillBoard) {
  const mainLoop = (b) => {
    fillBoard(b)
    setTimeout(() => mainLoop(getNextGeneration(b)), time)
  }

  mainLoop(board)
}

const size = 15
const time = 80
const { colorLife, colorDead } = getColors()
const { fillBoard } = getEngine({ size, colorLife, colorDead })
const { count, width, height } = getDimensions(size, window.innerWidth, window.innerHeight)
const board = createBoard(width, height, createSet(count, getRandomBool))

gameOfLife(getNextGeneration(board), time, fillBoard)
