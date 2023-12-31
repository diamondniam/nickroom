import { mobile_version  } from "./onload.js"
import { header_intro, header_hide, header_background_hide } from "./app.js"

const image = document.querySelector('.animation')
let imageInner = document.querySelector('.animation .desktop')
let imageInner_moible = document.querySelector('.animation .mobile')
const imagePosition = image.getBoundingClientRect().top
let animationHeight = parseInt(getComputedStyle(document.querySelector('.header')).getPropertyValue('height')) / 1.4

if (mobile_version) {
  animationHeight = parseInt(getComputedStyle(document.querySelector('.header')).getPropertyValue('height')) / 1.2
}

const animation_container = document.querySelector('.animation-container')

let filesCount = 36
if (mobile_version) {
  filesCount = 27
}

let screenHeight = screen.height
let frame = (animationHeight - (screenHeight)) / filesCount
let nextFrame = frame
let lastFrame = imagePosition
let frameNumber = 1

let header_intro_animation_counter = 0

function last() {
  nextFrame = lastFrame
  lastFrame -= frame
  frameNumber--
}

function next() {
  lastFrame = nextFrame
  nextFrame += frame
  frameNumber++
}

let header_background_hidden = false

function scrollPage() {
  let scroll = window.pageYOffset

  if (frameNumber <= filesCount && frameNumber > 0 && !mobile_version) {
    imageInner.src = `/nickroom/src/header/animation/header_animation_frame_${frameNumber}.png`
  } else if (frameNumber <= filesCount && frameNumber > 0 && mobile_version) {
    imageInner.src = `/nickroom/src/header/animation/mobile/header_mobile_animation_frame_${frameNumber}.png`
  }

  if (scroll >= imagePosition) {
    if (scroll > nextFrame) {
      next()
    } 
    else if (scroll < lastFrame) {
      last()
    }
  }

  if (mobile_version) {
    if (frameNumber >= filesCount) {
      imageInner.style.opacity = '0'
    } else {
      imageInner.style.opacity = '1'
    }
    if (document.querySelector('.poster-mobile').getBoundingClientRect().y - screen.height < 0) {
      header_background_hide()
      header_background_hidden = false
    } 
    else if (document.querySelector('.poster-mobile').getBoundingClientRect().y - screen.height < 200 &&
    document.querySelector('.poster-mobile').getBoundingClientRect().y - screen.height > 0 &&
    !header_background_hidden) {
      header_intro()
      header_background_hidden = true
    }
  }

  if (!mobile_version && frameNumber >= filesCount) {
    header_intro()
  }

  if (mobile_version && frameNumber == filesCount && !header_background_hidden) {
    header_intro()
    header_background_hidden = true
  }

  if (!mobile_version && frameNumber < 33) {
    header_hide()
  } else if (mobile_version && frameNumber < 23) {
    header_hide()
    header_background_hide()
    header_background_hidden = false
  }

  window.requestAnimationFrame(scrollPage)
}

setInterval(() => {
  header_intro_animation_counter++
  if (header_intro_animation_counter > 3) { header_intro_animation_counter = 1 }
  imageInner_moible.src = `/nickroom/src/header/header_background_${header_intro_animation_counter}.png`
}, 400);

scrollPage()

function preload_image(im_url) {
  let img = new Image();
  img.src = im_url;
}

if (mobile_version) {
  for (let i = 1; i <= filesCount; i++) {
    preload_image(`/nickroom/src/header/animation/mobile/header_mobile_animation_frame_${i}.png`)
  }
  for (let i = 1; i <= 3; i++) {
    preload_image(`/nickroom/src/mobile/poster_mobile_circle_${i}.png`)
    preload_image(`/nickroom/src/mobile/poster_mobile_circle_decrease_${i}.png`)
  }
} else {
  for (let i = 1; i <= filesCount; i++) {
    preload_image(`/nickroom/src/header/animation/header_animation_frame_${i}.png`)
  }
}