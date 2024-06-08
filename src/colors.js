import Random from './random.js'

const COLORS_PAIRS = [
  ['green', 'yellow'],
  ['red', 'pink'],
  ['blue', 'turquoise'],
  ['orange', 'purple'],
]

function random() {
  const [color1, color2] = COLORS_PAIRS[Random.int(COLORS_PAIRS.length)]

  return Random.bool() ? [color1, color2] : [color2, color1]
}

export default {
  random,
}
