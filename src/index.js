import { render } from 'mobx-jsx'
import {
  create2dArray, getNextGeneration, getDimensions, getRandomBool,
} from './utils'
import { getEngine, getColors } from './engine'
import Settings from './settings'
import Panel from './settingsPanel'

let timeout

const gameOfLife = (board, time, fillBoard) => {
  const mainLoop = (b) => {
    fillBoard(b)
    timeout = setTimeout(() => mainLoop(getNextGeneration(b)), Settings.time)
  }

  mainLoop(board)
}

const onReset = () => {
  clearTimeout(timeout)
  const { time, size } = Settings
  const [colorLife, colorDead] = getColors()
  const { fillBoard } = getEngine({ size, colorLife, colorDead })
  const { width, height } = getDimensions(size, window.innerWidth, window.innerHeight)
  const board = create2dArray(width, height, getRandomBool)
  gameOfLife(getNextGeneration(board), time, fillBoard)
}

onReset()

render(() => <Panel onReset={onReset} />, document.getElementById('settings'))
