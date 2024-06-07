const timeInput = document.getElementById('time')
const sizeInput = document.getElementById('size')

timeInput.value = 80
sizeInput.value = 15

export default {
  get size() { return sizeInput.value },
  get time() { return timeInput.value },
}
