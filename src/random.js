function int(max) {
  return Math.floor(Math.random() * max)
}

function bool() {
  return int(2) === 1
}

export default {
  int,
  bool,
}
