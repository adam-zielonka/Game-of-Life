//Statki
function createHTMLBoard(id, plansza, ships, opponent=false){
  var html = `<table class="table-responsive table-sm">`;
  for(var i=0;i<=10;i++){
    html+= "<tr>"
    for(var j=0;j<=10;j++){
      var button = ""
      if(j == 0 && i == 0){
        button = "&nbsp;"
      } else if (i == 0) {
        button = j
      } else if (j == 0) {
        button = numberToChar(i)
      } else {
        var buttonID = id+numberToChar(i)+j
        var enabled = opponent ? "" : "disabled"
        button = `<button type="button" class="btn btn-info watter" style="opacity: 1" onclick="fire(this,${i},${j},${plansza},${ships},${opponent})" ${enabled}
         id="${buttonID}" >&nbsp;</button>`
      }
      html+= "<td>" +  button + "</td>"
    }
    html+= "</tr>"
  }
  html += "</table>"
  document.getElementById(id).innerHTML = html
}

function colorBoard(name, board, opponent, end=false) {
  for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
      var color = !end ? opponent ? getOpponentColor(board[i][j]) : getColor(board[i][j]) : getEndColor(board[i][j])
      var element = document.getElementById(name+numberToChar(i+1)+(j+1))
      if((board[i][j] == 2 || board[i][j] == 3) && opponent)
        element.disabled = true
      element.classList.remove("btn-info");
      element.classList.remove("btn-danger");
      element.classList.remove("btn-dark");
      element.classList.remove("btn-light");
      element.className += " " + color;
    }
  }
}

function numberToChar(number) {
  switch (number) {
    case 1: return "A"
    case 2: return "B"
    case 3: return "C"
    case 4: return "D"
    case 5: return "E"
    case 6: return "F"
    case 7: return "G"
    case 8: return "H"
    case 9: return "I"
    case 10: return "J"
    default: return ""
  }
}

function charToNumber(char) {
  switch (char) {
    case "A": return 0
    case "B": return 1
    case "C": return 2
    case "D": return 3
    case "E": return 4
    case "F": return 5
    case "G": return 6
    case "H": return 7
    case "I": return 8
    case "J": return 9
    default: return 10
  }
}

function getColor(id) {
  switch (id) {
    case 1: return "btn-dark"
    case 2: return "btn-light"
    case 3: return "btn-danger"
    default: return "btn-info"
  }
}

function getOpponentColor(id) {
  switch (id) {
    case 2: return "btn-light"
    case 3: return "btn-success"
    default: return "btn-info"
  }
}

function getEndColor(id) {
  switch (id) {
    case 1: return "btn-dark"
    case 2: return "btn-light"
    case 3: return "btn-success"
    default: return "btn-info"
  }
}

function getBoardName(id, y){
   return id.substring(0, id.length - (y == 10 ? 3 : 2))
}

function fire(s,x,y,plansza, ships, opponent){
  if(!endGame) {
    console.log((!opponent ? "Opponent: " : "Me: ")+numberToChar(x)+y)
    var playAgain = true
    switch (plansza[x-1][y-1]) {
      case 0:
        plansza[x-1][y-1] = 2
        playAgain = false
        break;
      case 1:
        plansza[x-1][y-1] = 3
        if(!opponent) {
          ai.last = []
          ai.last[0] = x-1
          ai.last[1] = y-1
          ai.masts.push(ai.last)
        }
        break;
    }
    endGame = shipsStatus(ships,plansza,opponent)
    if(endGame) {
      colorBoard(my.boardName, my.board, false, true)
      colorBoard(ai.boardName, ai.board, false)
    } else {
      colorBoard(getBoardName(s.id,y),plansza,opponent)
      if((!playAgain && opponent) || (playAgain && !opponent)) playAI()
    }
  }
}

function getXY(id) {
  return [charToNumber(id.substring(0,1)), id.substring(1)-1]
}

function listShips(ships){
  for (var ship of ships) {
    var log = ship.length+" "
    for (var mast of ship) {
      log += mast + ": [" + getXY(mast) + "], "
    }
    console.log(log);
  }
}

var endGame = false

function shipsStatus(ships, board, opponent){
  var win = true
  var counter = 0
  for (var ship of ships) {
    var test = true;
    for (var mast of ship) {
      var xy = getXY(mast)
      if(board[xy[0]][xy[1]] == 1) test = false
    }
    if(test) {
      shipDown(ship, board)
      counter++
    }
    else win = false
  }
  if(!opponent){
    if(ai.counter != counter){
      ai.last = undefined
      ai.masts = []
      ai.counter = counter
    }
  }
  return win
}

function shipDown(ship, board) {
  for (var mast of ship) {
    var xy = getXY(mast)
    setMishits(xy[0],xy[1],board)
  }
}

function setMishits(i, j, board){
  if(i-1>=0 && j-1>=0 && board[i-1][j-1] == 0) board[i-1][j-1] = 2
  if(i-1>=0 &&           board[i-1][j] == 0) board[i-1][j] = 2
  if(i-1>=0 && j+1<10 && board[i-1][j+1] == 0) board[i-1][j+1] = 2
  if(j+1<10 &&           board[i][j+1] == 0) board[i][j+1] = 2
  if(j-1>=0 &&           board[i][j-1] == 0) board[i][j-1] = 2
  if(i+1<10 && j+1<10 && board[i+1][j+1] == 0) board[i+1][j+1] = 2
  if(i+1<10 && j-1>=0 && board[i+1][j-1] == 0) board[i+1][j-1] = 2
  if(i+1<10 &&           board[i+1][j] == 0) board[i+1][j] = 2
}

function generateBoard(ships) {
  var board = []
  for(var i=0; i<10; i++) {
    board[i] = []
    for(var j=0; j<10; j++)
      board[i][j] = 0
  }
  for (var ship of ships) {
    for (var mast of ship) {
      var xy = getXY(mast)
      board[xy[0]][xy[1]] = 1
    }
  }
  return board
}

function pushLast(){}

var my = {}
function setMY(boardName, board, ships){
  my.boardName = boardName
  my.board = board
  my.ships = ships
}

var ai = {}
function setAI(boardName, board, ships){
  ai.boardName = boardName
  ai.board = board
  ai.ships = ships
  ai.counter = 0
  ai.masts = []
}

function maxMin(xy) {
  var maxMin = {}
  maxMin.max = ai.masts[0][xy]
  maxMin.min = ai.masts[0][xy]
  for (var i = 1; i < ai.masts.length; i++) {
    if (ai.masts[i][xy] > maxMin.max) maxMin.max = ai.masts[i][xy]
    if (ai.masts[i][xy] < maxMin.min) maxMin.min = ai.masts[i][xy]
  }
  return maxMin
}

function around(i, j, board, counter=0) {
  if(ai.masts.length < 2) {
    var x = getRandom(1, 5)
    switch (x) {
      case 1: if(i-1>=0 && (board[i-1][j] == 0 || board[i-1][j] == 1)) return [i-1,j]
      case 2: if(i+1<10 && (board[i+1][j] == 0 || board[i+1][j] == 1)) return [i+1,j]
      case 3: if(j-1>=0 && (board[i][j-1] == 0 || board[i][j-1] == 1)) return [i,j-1]
      case 4: if(j+1<10 && (board[i][j+1] == 0 || board[i][j+1] == 1)) return [i,j+1]
      default: {
        if(i-1>=0 && (board[i-1][j] == 0 || board[i-1][j] == 1)) return [i-1,j]
        if(i+1<10 && (board[i+1][j] == 0 || board[i+1][j] == 1)) return [i+1,j]
        if(j-1>=0 && (board[i][j-1] == 0 || board[i][j-1] == 1)) return [i,j-1]
        return [getRandom(0, 10), getRandom(0, 10)]
      }
    }
  } else {
    console.log(ai.masts)
    if (ai.masts[0][0] == ai.masts[1][0]) {
      console.log("x");
      var x = ai.masts[0][0]
      var y = maxMin(1)
      console.log(y);
      if(y.min-1>=0 && (board[x][y.min-1] == 0 || board[x][y.min-1] == 1)) return [x,y.min-1]
      if(y.max+1<10 && (board[x][y.max+1] == 0 || board[x][y.max+1] == 1)) return [x,y.max+1]
      ai.last = undefined
      ai.masts = []
      return [getRandom(0, 10), getRandom(0, 10)]
    } else {
      console.log("y");
      var x = maxMin(0)
      var y = ai.masts[0][1]
      console.log(x);
      if(x.min-1>=0 && (board[x.min-1][y] == 0 || board[x.min-1][y] == 1)) return [x.min-1,y]
      if(x.max+1<10 && (board[x.max+1][y] == 0 || board[x.max+1][y] == 1)) return [x.max+1,y]
      ai.last = undefined
      ai.masts = []
      return [getRandom(0, 10), getRandom(0, 10)]
    }
  }
}

function playAI(){
  var s = {}
  if(!ai.last) {
    var x = getRandom(1, 11)
    var y = getRandom(1, 11)
  } else {
    var xy = around(ai.last[0],ai.last[1], ai.board)
    var x = xy[0]+1
    var y = xy[1]+1
  }
  s.id = ai.boardName + numberToChar(x) + y
  fire(s, x, y, ai.board, ai.ships, false)
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function setShip(masts, board) {
  //console.log("START GEN: "+masts)
  var result = []
  var tries = 0
  while(tries<100) {
    ++tries
    result = []
    var x = getRandom(0, 10)
    var y = getRandom(0, 10)
    var vh = getRandom(0, 2)
    if(vh == 0) {
      if(x+masts > 10) continue
      var ok = true
      for (var i = 0; i < masts; i++) {
        if(x+i<10 && board[x+i][y]) ok = false
      }
      if(!ok) continue
      for (var i = -1; i < masts+1; i++) {
        for (var j = -1; j <= 1; j++) {
          if(x+i>=0 && y+j>=0 && x+i<10 && y+j<10) board[x+i][y+j] = true
        }
      }
      for (var i = 0; i < masts; i++) {
        result.push(`${numberToChar(x+i+1)}${y+1}`)
      }
      tries = 0
      break
    } else {
      if(y+masts > 10) continue
      var ok = true
      for (var i = 0; i < masts; i++) {
        if(y+i<10 && board[x][y+i]) ok = false
      }
      if(!ok) continue
      for (var j = -1; j < masts+1; j++) {
        for (var i = -1; i <= 1; i++) {
          if(x+i>=0 && y+j>=0 && x+i<10 && y+j<10) board[x+i][y+j] = true
        }
      }
      for (var i = 0; i < masts; i++) {
        result.push(`${numberToChar(x+1)}${y+i+1}`)
      }
      tries = 0
      break
    }
  }
  return result
}

function generateShips(){
  var ships = []
  var tries = 0
  while (true) {
    console.log("GEN #"+(++tries))
    var board = []
    for (var i = 0; i < 10; i++) {
      board[i] = []
      for (var j = 0; j < 10; j++) {
        board[i][j] = false
      }
    }
    ships = []
    ships.push(setShip(4, board)); if(ships[ships.length-1].length < 1) continue
    ships.push(setShip(3, board)); if(ships[ships.length-1].length < 1) continue
    ships.push(setShip(3, board)); if(ships[ships.length-1].length < 1) continue
    ships.push(setShip(2, board)); if(ships[ships.length-1].length < 1) continue
    ships.push(setShip(2, board)); if(ships[ships.length-1].length < 1) continue
    ships.push(setShip(2, board)); if(ships[ships.length-1].length < 1) continue
    ships.push(setShip(1, board)); if(ships[ships.length-1].length < 1) continue
    ships.push(setShip(1, board)); if(ships[ships.length-1].length < 1) continue
    ships.push(setShip(1, board)); if(ships[ships.length-1].length < 1) continue
    ships.push(setShip(1, board)); if(ships[ships.length-1].length < 1) continue
    break
  }
  console.log(ships)
  return ships
}

var statki
var statki2
var plansza
var planszaAI

function firstRun(){
  statki = [
    ['B2','B3','B4','C2','D2','E2','E3','E4','F4','G4','H4','H3','H2'],
    ['B6','C6','D6','E6','F6','G6','H6','E7','B8','C8','D8','E8','F8','G8','H8'],
    ['B10','C10','D10','E10','F10','G10','H10']
  ]
  statki2 = [
    ['B1','C1','D1','E1','F1','G1','H1'],
    ['B3','C3','D3','E3','F3','G3','H3','B4','B5','C5','D5','D4'],
    ['B7','B8','B9','C7','D7','E7','E8','E9','F9','G9','H9','H8','H7']
  ]
  plansza = generateBoard(statki)
  planszaAI = generateBoard(statki2)
  createHTMLBoard("myBoard","plansza", "statki")
  colorBoard("myBoard",plansza)
  createHTMLBoard("aiBoard","planszaAI", "statki2")
  colorBoard("aiBoard",planszaAI)
}

function startGame(){
  endGame = false
  statki = generateShips()
  statki2 = generateShips()
  plansza = generateBoard(statki)
  planszaAI = generateBoard(statki2)
  createHTMLBoard("myBoard","plansza", "statki")
  colorBoard("myBoard",plansza)
  createHTMLBoard("aiBoard","planszaAI", "statki2", true)
  setAI("myBoard", plansza, statki)
  setMY("aiBoard", planszaAI, statki2)
}