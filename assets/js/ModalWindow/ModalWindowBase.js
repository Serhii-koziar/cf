export default class ModalWindowBase {
  constructor() {
    this.constants = {
      MODAL_ID: 'modal-window',
      MODAL_ACTIVE_CLASS: 'modal-window--active',
      MODAL_ITEM_CLASS: 'modal-window__item',
      MODAL_ITEM_ACTIVE_CLASS: 'modal-window__item--active',
      MODAL_CLOSE_BTN: 'modal-window__close-icon',
      MODAL_CLOSE_FADER: 'modal-window__fader',
    }
    this.$modal = document.getElementById(this.constants.MODAL_ID)
    this.scrollbarWidth = getScrollbarWidth()
    this.type = 'base'
    this.init()
  }

  init() {
    document.addEventListener('click', event => {
      if (this.shouldModalClose(event)) {
        this.closeModal(event)
      }
    })
  }

  shouldModalClose(event) {
    if (this.type === this.$modal.dataset.curentTypeOfModal &&
        ( event.target.closest(`.${this.constants.MODAL_CLOSE_BTN}`) ||
            event.target.closest(`.${this.constants.MODAL_CLOSE_FADER}`))) {
      return true
    } else {
      return false
    }
  }

  openModal(currentModalId) {
    console.log('open')
    console.log(this.$modal.dataset.curentTypeOfModal)
    this.$modal.dataset.curentTypeOfModal = this.type
    this.$modal.classList.add(this.constants.MODAL_ACTIVE_CLASS)
    this.$modal.querySelector(`#${currentModalId}`)
        .classList
        .add(this.constants.MODAL_ITEM_ACTIVE_CLASS)
    this.hideScroll()
  }

  closeModal(event) {
    console.log('close')
    this.$modal.dataset.curentTypeOfModal = ''
    this.$modal.classList.remove(this.constants.MODAL_ACTIVE_CLASS)
    this.$modal.querySelector(`.${this.constants.MODAL_ITEM_ACTIVE_CLASS}`)
        .classList
        .remove(this.constants.MODAL_ITEM_ACTIVE_CLASS)
    this.showScroll()
  }

  hideScroll() {
    // removing scroll
    document.documentElement.style.overflowY = 'hidden'
    // compensating scroll width
    document.documentElement.style.paddingRight = `${this.scrollbarWidth}px`
    // compensating scroll for header (header is fixed)
    // eslint-disable-next-line max-len
    document.getElementById('header').style.paddingRight = `${this.scrollbarWidth}px`
    // eslint-disable-next-line max-len
    // getting header transition params (if dont remove them the menu will be jumping)
    const header = document.getElementById('header')
    this.headerTransition = window.getComputedStyle(header).transition
    document.getElementById('header').style.transition = 'none'
  }

  showScroll(event) {
    // showing scroll
    document.documentElement.style.overflowY = 'auto'
    // removing compensation of scroll width
    document.documentElement.style.paddingRight = 0
    document.getElementById('header').style.paddingRight = 0
    // computing when header should have transition params
    // eslint-disable-next-line max-len
    const modalTransitionDuration = window.getComputedStyle(this.$modal).transitionDuration
    const timeout = modalTransitionDuration.slice(0, -1) * 1000
    // adding transition params for header after 'timeout'
    setTimeout(() => {
      document.getElementById('header').style.transition = this.headerTransition
    }, timeout)
  }
}

function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}
