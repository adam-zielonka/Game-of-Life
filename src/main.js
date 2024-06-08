import {
  create2dArray, getNextGeneration, getDimensions, getRandomBool,
} from './utils'
import Engine from './engine'
import Settings from './settings'

let timeout

function mainLoop(board) {
  Engine.render(board)
  timeout = setTimeout(() => mainLoop(getNextGeneration(board)), Settings.time)
}

function gameOfLife() {
  clearTimeout(timeout)
  Engine.restart()
  const { width, height } = getDimensions(Settings.size, window.innerWidth, window.innerHeight)
  const board = create2dArray(width, height, getRandomBool)
  mainLoop(getNextGeneration(board))
}

document.getElementById('reset').onclick = gameOfLife

gameOfLife()
