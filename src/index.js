function game(board) {
    const result = board.map(item => item.slice())
    let n = board.length
    for (let i = 0; i < n; i++) {
        let m = board[i].length
        for (let j = 0, count = 0; j < m; j++, count = 0) {
            if (i - 1 >= 0 && j - 1 >= 0 && board[i - 1][j - 1]) count++
            if (i - 1 >= 0 && board[i - 1][j]) count++
            if (i - 1 >= 0 && j + 1 < m && board[i - 1][j + 1]) count++
            if (j + 1 < m && board[i][j + 1]) count++
            if (j - 1 >= 0 && board[i][j - 1]) count++
            if (i + 1 < n && j + 1 < m && board[i + 1][j + 1]) count++
            if (i + 1 < n && j - 1 >= 0 && board[i + 1][j - 1]) count++
            if (i + 1 < n && board[i + 1][j]) count++
            if (board[i][j]) {
                if (count < 2 || count > 3) {
                    result[i][j] = false
                    fill(i, j, false)
                }
            } else {
                if (count == 3) {
                    result[i][j] = true
                    fill(i, j, true)
                }
            }
        }
    }
    return result
}

function fill(i, j, life) {
    ctx.fillStyle = colorInverse ? (life ? colorLife : colorDead) : (!life ? colorLife : colorDead)
    ctx.fillRect(j * size, i * size, size, size)
}

function setSize(newSize) {
    size = newSize > 0 ? newSize : 1
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
    for (var i = 0; i < board.length; i++)
        for (var j = 0; j < board[i].length; j++)
            fill(i, j, board[i][j])
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function get50() {
    const boxes = Math.ceil(window.innerHeight / size) * Math.ceil(window.innerWidth / size)

    const arr = []
    for(let i = 0; i < boxes/2; i++ ){
        arr.push(false)
    }
    for(let i = boxes/2; i < boxes; i++ ){
        arr.push(true)
    }

    return shuffle(arr)
}

function generateBoard(size) {

    const arr = get50()

    var board = []
    for (var i = 0; i < window.innerHeight / size; i++) {
        board[i] = []
        for (var j = 0; j < window.innerWidth / size; j++)
            board[i][j] = arr.pop() //getRandom(0, 2) == 1
    }

    return board
}

function gameOfLife() {
    board = game(board)
    setTimeout(gameOfLife, time)
}

function setColors() {
    colorInverse = getRandom(0, 2) == 0 ? false : true
    switch (getRandom(1, 5)) {
        case 1:
            colorLife = "green"
            colorDead = "yellow"
            break;
        case 2:
            colorLife = "red"
            colorDead = "blue"
            break;
        case 3:
            colorLife = "orange"
            colorDead = "purple"
            break;
        default:
            colorLife = "black"
            colorDead = "white"
    }
    document.body.style.backgroundColor = !colorInverse ? colorLife : colorDead
}

const ctx = document.getElementById('canvas').getContext('2d')
var size = 15, time = 80
var colorLife, colorDead, colorInverse
setColors()
var board = generateBoard(size)
setSize(size)
gameOfLife()