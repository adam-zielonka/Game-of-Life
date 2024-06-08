export const getDimensions = (size, innerWidth, innerHeight) => (
  { width: Math.ceil(innerWidth / size), height: Math.ceil(innerHeight / size) }
)

export const create2dArray = (width, height, fill) => (
  Array(height).fill(null).map((line, i) => Array(width).fill(null).map((cell, j) => fill(i, j)))
)

export const map2d = (arr2d, map) => arr2d.map((line, i) => line.map((cell, j) => map(cell, i, j)))
