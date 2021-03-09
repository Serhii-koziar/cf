import ModalWindowBase from './ModalWindowBase';

export default class ModalVideoWindow extends ModalWindowBase {
  constructor() {
    super();
    this.constants = {
      ...this.constants,
      MODAL_VIDEO_ID: 'modal-video',
      MODAL_CALL_VIDEO_SELECTOR: '[data-video-src]',
    }
    this.type = 'videoModal'
    this.$modalVideo = document.getElementById(this.constants.MODAL_VIDEO_ID)
  }

  init() {
    super.init()
    document.addEventListener('click', event => {
      if (event.target.closest(this.constants.MODAL_CALL_VIDEO_SELECTOR)) {
        this.callModalVideoHandler(event)
      }
    })
  }

  callModalVideoHandler(event) {
    event.preventDefault()
    // eslint-disable-next-line max-len
    const target = event.target.closest(this.constants.MODAL_CALL_VIDEO_SELECTOR)
    const dataSrc = target.dataset.videoSrc
    this.$modalVideo.querySelector('iframe')
        .setAttribute('src', `${dataSrc}?autoplay=1`)
    this.openModal(this.constants.MODAL_VIDEO_ID)
  }

  closeModal(event) {
    this.$modal.querySelector(`#${this.constants.MODAL_VIDEO_ID}`)
        .querySelector('iframe')
        .setAttribute('src', '')
    super.closeModal(event)
  }
}
