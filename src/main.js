import {
  create2dArray, getNextGeneration, getDimensions, getRandomBool,
} from './utils'
import { getEngine } from './engine'
import Settings from './settings'

let timeout

function mainLoop(board, fillBoard) {
  fillBoard(board)
  timeout = setTimeout(() => mainLoop(getNextGeneration(board), fillBoard), Settings.time)
}

function gameOfLife() {
  clearTimeout(timeout)
  const { fillBoard } = getEngine(Settings.size)
  const { width, height } = getDimensions(Settings.size, window.innerWidth, window.innerHeight)
  const board = create2dArray(width, height, getRandomBool)
  mainLoop(getNextGeneration(board), fillBoard)
}

document.getElementById('reset').onclick = gameOfLife

gameOfLife()
