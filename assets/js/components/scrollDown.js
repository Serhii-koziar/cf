export function scrollDown() {
  let arrow = document.querySelector('.scrollDown')
  let windowHeight = window.innerHeight;
  arrow.addEventListener('click', (e) => {
    scrollBy({
      top: e.target.closest('section').nextElementSibling.getBoundingClientRect().top,
      left:0,
      behaviour: "smooth"
    })
  })
}
