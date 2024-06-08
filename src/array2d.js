function create(width, height, fill) {
  return Array(height).fill(null).map(
    (line, i) => Array(width).fill(null).map((cell, j) => fill(i, j))
  )
}

function map(arr, map) {
  return arr.map((line, i) => line.map((cell, j) => map(cell, i, j)))
}

export default { 
  create, 
  map,
}
