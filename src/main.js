import {
  create2dArray, getNextGeneration, getDimensions, getRandomBool,
} from './utils'
import { getEngine, getColors } from './engine'
import Settings from './settings'

let timeout

const gameOfLife = (board, fillBoard) => {
  const mainLoop = (b) => {
    fillBoard(b)
    timeout = setTimeout(() => mainLoop(getNextGeneration(b)), Settings.time)
  }

  mainLoop(board)
}

const onReset = () => {
  clearTimeout(timeout)
  const { size } = Settings
  const [colorLife, colorDead] = getColors()
  const { fillBoard } = getEngine({ size: Settings.size, colorLife, colorDead })
  const { width, height } = getDimensions(size, window.innerWidth, window.innerHeight)
  const board = create2dArray(width, height, getRandomBool)
  gameOfLife(getNextGeneration(board), fillBoard)
}

document.getElementById('reset').onclick = onReset

onReset()
