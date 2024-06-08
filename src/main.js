import Board from './board.js'
import Engine from './engine.js'
import Settings from './settings.js'

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

function init() {
  Engine.restart()
  board = Board.generator()
  Engine.render(board.next().value)
}

document.getElementById('reset').onclick = gameOfLife
document.getElementById('confirm').onclick = () => {
  document.getElementById('warning').remove()
  mainLoop()
}

init()
