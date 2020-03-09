const _time = document.getElementById('time')
const _size = document.getElementById('size')

_time.value = 80
_size.value = 15

class Settings {
  get size() { return _size.value }
  get time() { return _time.value }
}

const settings = new Settings()

export default settings
