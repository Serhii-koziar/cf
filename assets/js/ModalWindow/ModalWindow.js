export default class ModalWindow {
  constructor(...components) {
    this.components = components
    this.init()
  }

  init() {
    this.components = this.components.map(Component => {
      return new Component()
    })
  }
}
