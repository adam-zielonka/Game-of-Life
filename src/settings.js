import { observable } from 'mobx'

class Settings {
  @observable size = 15

  @observable time = 80
}

const settings = new Settings()

export default settings
