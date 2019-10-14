import {
  createBoard, createSet, game, getDimensions, getColors, getRandomBool,
} from './utils'
import { getEngine } from './engine'

function gameOfLife(time, board, fill) {
  setTimeout(() => gameOfLife(time, game(board, fill), fill), time)
}

const size = 15
const time = 80
const { colorLife, colorDead } = getColors()
const { fill, fillBoard } = getEngine({ size, colorLife, colorDead })
const { count, width, height } = getDimensions(size, window.innerWidth, window.innerHeight)
const board = createBoard(width, height, createSet(count, getRandomBool))

fillBoard(board)
gameOfLife(time, game(board, fill), fill)
