import Board from './board'
import Engine from './engine'
import Settings from './settings'

let timeout, board

function mainLoop() {
  Engine.render(board.next().value)
  timeout = setTimeout(mainLoop, Settings.time)
}

function gameOfLife() {
  clearTimeout(timeout)
  Engine.restart()
  board = Board.generator()
  mainLoop()
}

document.getElementById('reset').onclick = gameOfLife

gameOfLife()
