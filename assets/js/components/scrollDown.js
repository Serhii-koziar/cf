export function scrollDown() {
  let arrow = document.querySelector('.scrollDown')
  let windowHeight = window.innerHeight;
  arrow.addEventListener('click', () => {
    scrollBy({
      top: windowHeight,
      left:0,
      behaviour: "smooth"
    })
  })
}
