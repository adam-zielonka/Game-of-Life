import {
  create2dArray, getNextGeneration, getDimensions, getRandomBool,
} from './utils'
import { getEngine } from './engine'
import Settings from './settings'

let timeout

function gameOfLife(initBoard, fillBoard) {
  function mainLoop(board) {
    fillBoard(board)
    timeout = setTimeout(() => mainLoop(getNextGeneration(board)), Settings.time)
  }

  mainLoop(initBoard)
}

function onReset() {
  clearTimeout(timeout)
  const { fillBoard } = getEngine(Settings.size)
  const { width, height } = getDimensions(Settings.size, window.innerWidth, window.innerHeight)
  const board = create2dArray(width, height, getRandomBool)
  gameOfLife(getNextGeneration(board), fillBoard)
}

document.getElementById('reset').onclick = onReset

onReset()
