let mobile_version = false; if (getComputedStyle(document.querySelector('.poster')).getPropertyValue('display') == 'none') { mobile_version = true }; export { mobile_version }

window.addEventListener('load', () => {
  const loader = document.querySelector('.loader')
  const body = document.querySelector('body')

  loader.classList.add('hide')

  loader.addEventListener('transitionend', () => {
    body.style.height = 'auto'
    body.style.overflow = 'auto'
  })
})