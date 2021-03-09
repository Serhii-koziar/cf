import ModalWindowBase from './ModalWindowBase';

export default class ModalContentWindow extends ModalWindowBase {
  constructor() {
    super()
    this.constants = {
      ...this.constants,
      MODAL_CALL_DUE_TO_ANCHOR_SELECTOR: '[href^="#"]',
      MODAL_CALL_DUE_TO_DATA_ATTR_SELECTOR: '[data-modal-id]',
    }
    this.type = 'contentModal'
  }

  init() {
    super.init()
    document.addEventListener('click', event => {
      if (event.target.closest(this.constants.MODAL_CALL_DUE_TO_ANCHOR_SELECTOR)) {
        this.callModalDueToAnchor(event)
      } else if (event.target.closest(this.constants.MODAL_CALL_DUE_TO_DATA_ATTR_SELECTOR)) {
        this.callModalDueToDataAttr(event)
      }
    })
  }

  callModalDueToAnchor(event) {
    event.preventDefault()
    const target = event.target.closest(this.constants.MODAL_CALL_DUE_TO_ANCHOR_SELECTOR)
    const id = target.hash.slice(1)
    if (this.$modal.contains(document.getElementById(id))) {
      this.openModal(id)
    }
  }

  callModalDueToDataAttr(event) {
    event.preventDefault()
    const target = event.target.closest(this.constants.MODAL_CALL_DUE_TO_DATA_ATTR_SELECTOR)
    const id = target.dataset.modalId
    this.openModal(id)
  }
}
