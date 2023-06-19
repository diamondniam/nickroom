import { mobile_version } from "./onload.js"

const body = document.querySelector('body')

const header = document.querySelector('.header')
const header_elements = header.querySelectorAll('div')
const header_title = header.querySelector('.title')
const header_button = header.querySelector('.button')
const header_road_left = header.querySelector('.road-left')
const header_road_right = header.querySelector('.road-right')
const header_cart_left = header.querySelector('.cart-left')
const header_cart_right = header.querySelector('.cart-right')
const animation = header.querySelector('.animation-container')

header_title.querySelector('img').style.transform = 'scale(1.3)'

header_elements.forEach(element => {
  element.style.visibility = 'hidden'
})

header.querySelector('.animation').style.visibility = 'visible'

header_button.style.transform = 'translateY(100px)'

header_cart_left.style.transform = 'translateX(-50px)'
header_cart_right.style.transform = 'translate(-50px, 20px)'

function header_intro() {
  setTimeout(() => {
    setTimeout(() => {
      header_title.style.visibility = 'visible'
      header_title.style.opacity = '1'
      header_title.querySelector('img').style.transform = 'scale(1)'
    }, 200)
  
    setTimeout(() => {
      header_button.style.visibility = 'visible'
      header_button.style.opacity = '1'
      header_button.style.transform = 'translateY(0px)'
  
      header_road_right.style.visibility = 'visible'
      header_road_right.style.opacity = '1'
    }, 400)
  
    setTimeout(() => {
      header_road_left.style.visibility = 'visible'
      header_road_left.style.opacity = '1'
    }, 700);
  
    setTimeout(() => {
      header_cart_left.style.opacity = '1'
      header_cart_left.style.visibility = 'visible'
      header_cart_left.style.transform = 'translateX(0px)'
  
      setTimeout(() => {
        header_cart_left.style.animationName = 'shaker'
      }, 800)
    }, 800)
  
    setTimeout(() => {
      header_cart_right.style.opacity = '1'
      header_cart_right.style.visibility = 'visible'
      header_cart_right.style.transform = 'translate(0px)'
  
      setTimeout(() => {
        header_cart_right.style.animationName = 'shaker'
      }, 800)
    }, 900)
  }, 300);
}

function header_background_hide() {
  header_road_right.style.opacity = '0'
  header_road_left.style.opacity = '0'
  header_cart_left.style.opacity = '0'
  header_cart_right.style.opacity = '0'
}

function header_background_show() {
  header_road_right.style.opacity = '1'
  header_road_left.style.opacity = '1'
  header_cart_left.style.opacity = '1'
  header_cart_right.style.opacity = '1'
}

function header_hide() {
  header_title.style.opacity = '0'
  header_button.style.opacity = '0'
}

const streaming = document.querySelector('.streaming')
const platforms = streaming.querySelector('.platforms')
const links = platforms.querySelectorAll('.a')

let streaming_position

setTimeout(() => {
  streaming_position = streaming.getBoundingClientRect().y
}, 100)

header_button.onclick = () => {
  streaming.scrollIntoView()
}


links.forEach(link => {
  link.onmouseover = () => {
    link.style.transform = 'scale(1.03)'
  }
  link.onmouseout = () => {
    link.style.transform = 'scale(1)'
  }
})

const world = document.querySelector('.world')

const poster = document.querySelector('.poster')
const noise = document.querySelector('.noise')
const display = document.querySelector('.display')
const display_image = display.querySelector('.image img')
const display_title = display.querySelector('.title')
const display_description = display.querySelector('.description')
const display_cancel = display.querySelector('.cancel')
const display_listen = display.querySelector('.listen')

const rodeo = poster.querySelector('.rodeo')
const ada = poster.querySelector('.ada')
const dymka = poster.querySelector('.dymka')
const mouse = poster.querySelector('.mouse')
const israeli = poster.querySelector('.israeli')
const mbm = poster.querySelector('.mbm')
const krasota = poster.querySelector('.krasota')
const marks = [poster.querySelector('.krasota'), poster.querySelector('.ada'), poster.querySelector('.mbm'), poster.querySelector('.mouse'), poster.querySelector('.dymka'), poster.querySelector('.israeli'), poster.querySelector('.rodeo')]

function scrollOff() {
  let scrollY = window.scrollY
  window.onscroll = () => {
    scrollTo({
      top: scrollY,
      behavior: 'instant'
    })
  }
}

function scrollOn() {
  window.onscroll = () => { }
}

const poster_background = poster.querySelector('.background').querySelector('img')
let poster_counter = 1

setInterval(() => {
  poster_counter++
  if (poster_counter > 3) {
    poster_counter = 1
  }
  poster_background.src = `/nickroom/src/poster/poster_frame_${poster_counter}.png`
}, 1000)

if (!mobile_version) {
  marks.forEach(mark => {
    mark.onclick = () => {
      scrollOff()
  
      poster.style.filter = 'brightness(70%) blur(3px)'
      poster.style.transition = 'filter 1s'
      world.style.filter = 'brightness(70%) blur(3px)'
      world.style.transition = 'filter 1s'
      streaming.style.filter = 'brightness(70%) blur(3px)'
      streaming.style.transition = 'filter 1s'
  
      noise.classList.add('active')
      display.classList.add('active')
  
      display_image.src = `/nickroom/src/poster/poster_display_${mark.className}.png`
      display_title.innerHTML = mark.id.toUpperCase()
      display_description.innerHTML = mark.querySelector('p').innerHTML
  
      if (
        mark.classList.contains('ada') ||
        mark.classList.contains('mbm')
      ) {
        display_listen.style.display = 'block'
        display_listen.querySelector('a').href = mark.querySelector('a').href
      }
    }
  })
  
  display_cancel.onclick = () => {
    scrollOn()
  
    poster.style.filter = 'brightness(100%) blur(0px)'
    world.style.filter = 'brightness(100%) blur(0px)'
    world.style.transition = 'filter 1s'
    streaming.style.filter = 'brightness(100%) blur(0px)'
    streaming.style.transition = 'filter 1s'
  
    noise.classList.remove('active')
    display.classList.remove('active')
  
    display_listen.style.display = 'none'
  }
}

const selections_class = document.querySelector('.selections')
const selections = selections_class.querySelectorAll('.selection')
const selection_ada = selections_class.querySelector('.ada')
const selection_rodeo = selections_class.querySelector('.rodeo')
const selection_mbm = selections_class.querySelector('.mbm')
const selection_krasota = selections_class.querySelector('.krasota')
const selection_mouse = selections_class.querySelector('.mouse')
const selection_dymka = selections_class.querySelector('.dymka')
const selection_israeli = selections_class.querySelector('.israeli')
var selection_margin = 20

selections.forEach(selection => {
  selection.onmouseover = () => {
    window.onscroll = () => {}
    poster_information.style.visibility = 'hidden'
    poster_information.style.opacity = '0'
    poster.style.filter = 'brightness(1)'
    world.style.filter = 'brightness(1)'

    selections.forEach(selection => {
      selection.style.opacity = '0'
      selection.style.visibility = 'hidden'
    })
  }
})

const poster_mobile = document.querySelector('.poster-mobile')
const poster_mobile_circles = poster_mobile.querySelectorAll('.circle img')
const posters_mobile = poster_mobile.querySelectorAll('.poster')
const poster_mobile_text = poster_mobile.querySelector('.text')
const poster_mobile_content = poster_mobile.querySelector('.content')
let poster_mobile_counter = 0
let poster_mobile_back_counter = 0

const poster_information = document.querySelector('.poster-information')

window.onload = () => {
  selection_ada.style.top = (parseInt(getComputedStyle(ada).getPropertyValue('top')) + (poster.getBoundingClientRect().y + scrollY) - selection_margin) + 'px'
  selection_ada.style.left = (parseInt(getComputedStyle(ada).getPropertyValue('left')) - selection_margin) + 'px'
  selection_rodeo.style.top = (parseInt(getComputedStyle(rodeo).getPropertyValue('top')) + (poster.getBoundingClientRect().y + scrollY) - selection_margin) + 'px'
  selection_rodeo.style.left = (parseInt(getComputedStyle(rodeo).getPropertyValue('left')) - selection_margin) + 'px'
  selection_israeli.style.top = (parseInt(getComputedStyle(israeli).getPropertyValue('top')) + (poster.getBoundingClientRect().y + scrollY) - selection_margin) + 'px'
  selection_israeli.style.left = (parseInt(getComputedStyle(israeli).getPropertyValue('left')) - selection_margin) + 'px'
  selection_krasota.style.top = (parseInt(getComputedStyle(krasota).getPropertyValue('top')) + (poster.getBoundingClientRect().y + scrollY) - selection_margin) + 'px'
  selection_krasota.style.left = (parseInt(getComputedStyle(krasota).getPropertyValue('left')) - selection_margin) + 'px'
  selection_dymka.style.top = (parseInt(getComputedStyle(dymka).getPropertyValue('top')) + (poster.getBoundingClientRect().y + scrollY) - selection_margin) + 'px'
  selection_dymka.style.left = (parseInt(getComputedStyle(dymka).getPropertyValue('left')) - selection_margin) + 'px'
  selection_mouse.style.top = (parseInt(getComputedStyle(mouse).getPropertyValue('top')) + (poster.getBoundingClientRect().y + scrollY) - selection_margin) + 'px'
  selection_mouse.style.left = (parseInt(getComputedStyle(mouse).getPropertyValue('left')) - selection_margin) + 'px'
  selection_mbm.style.top = (parseInt(getComputedStyle(mbm).getPropertyValue('top')) + (poster.getBoundingClientRect().y + scrollY) - selection_margin) + 'px'
  selection_mbm.style.left = (parseInt(getComputedStyle(mbm).getPropertyValue('left')) - selection_margin) + 'px'
}

let poster_mobile_mbm = {
  start: 1,
  decrease_start: 0,
  circle: poster_mobile.querySelector('.mbm').querySelector('.circle').querySelector('img'),
  title: mbm.id.toUpperCase(),
  description: mbm.querySelector('p').innerHTML,
  element: poster_mobile.querySelector('.mbm')
}
let poster_mobile_rodeo = {
  start: 3,
  decrease_start: 0,
  circle: poster_mobile.querySelector('.rodeo').querySelector('.circle').querySelector('img'),
  title: rodeo.id.toUpperCase(),
  description: rodeo.querySelector('p').innerHTML,
  element: poster_mobile.querySelector('.rodeo')
}
let poster_mobile_krasota =  {
  start: 2,
  decrease_start: 0,
  circle: poster_mobile.querySelector('.krasota').querySelector('.circle').querySelector('img'),
  title: krasota.id.toUpperCase(),
  description: krasota.querySelector('p').innerHTML,
  element: poster_mobile.querySelector('.krasota')
}
let poster_mobile_israeli = {
  start: 1,
  decrease_start: 0,
  circle: poster_mobile.querySelector('.israeli').querySelector('.circle').querySelector('img'),
  title: israeli.id.toUpperCase(),
  description: israeli.querySelector('p').innerHTML,
  element: poster_mobile.querySelector('.israeli')
}
let poster_mobile_ada = {
  start: 3,
  decrease_start: 0,
  circle: poster_mobile.querySelector('.ada').querySelector('.circle').querySelector('img'),
  title: ada.id.toUpperCase(),
  description: ada.querySelector('p').innerHTML,
  element: poster_mobile.querySelector('.ada')
}

const availability = document.querySelector('.availability')

links.forEach(link => {
  link.onclick = () => {
    availability.classList.add('show')
  }
})

var theme_audio = new Audio('/sound/web_theme.mp3')
theme_audio.loop = true

const 
    player = document.querySelector('.player'),
    player_image = player.querySelector('img'),
    player_text = player.querySelector('.text')

let player_animation,
    player_animation_cycle = 1,
    player_animation_playing = false

player_image.onclick = () => {
  if (!player_animation_playing) {
    theme_audio.play()

    clearInterval(player_animation)
    player_animation = setInterval(() => {
      player_animation_cycle++
      if (player_animation_cycle == 4) { clearInterval(player_animation) }
      player_image.src = `/src/player/player_frame_${player_animation_cycle}.png`
    }, 200)

    player_animation_playing = true
  } else {
    theme_audio.pause()
    theme_audio.currentTime = 0

    clearInterval(player_animation)
    player_animation = setInterval(() => {
      player_animation_cycle--
      if (player_animation_cycle == 1) { clearInterval(player_animation) }
      player_image.src = `/src/player/player_frame_${player_animation_cycle}.png`
    }, 200)

    player_animation_playing = false
  }
}

let 
    player_text_animation,
    player_text_width = 0

player_image.onmouseover = () => {
  clearInterval(player_text_animation)
  player_text.style.opacity = '1'
  player_text.style.visibility = 'visible'
  player_text_animation = setInterval(() => {
    player_text_width+=15
    if (player_text_width >= 160) {
      clearInterval(player_text_animation)
    }
    player_text.style.width = player_text_width + 'px'
  }, 100)
}

player_image.onmouseout = () => {
  clearInterval(player_text_animation)
  player_text_animation = setInterval(() => {
    player_text_width-=15
    if (player_text_width <= 0) {
      player_text.style.opacity = '0'
      player_text.style.visibility = 'hidden'
      clearInterval(player_text_animation)
    }
    player_text.style.width = player_text_width + 'px'
  }, 80)
}

let infromation_started = false

if (!mobile_version) {
  window.onscroll = () => {
    poster_information.style.display = 'block'
  
    if (poster.getBoundingClientRect().y < 200) {
      poster.style.filter = 'brightness(70%)'
      poster.style.transition = 'filter 1s'
      world.style.filter = 'brightness(70%)'
      world.style.transition = 'filter 1s'
      poster_information.style.opacity = '1'
      poster_information.style.visibility = 'visible'
      selections.forEach(selection => {
        selection.style.opacity = '1'
        selection.style.visibility = 'visible'
      })
      infromation_started = true
    }
    if (poster.getBoundingClientRect().y < -200 || poster.getBoundingClientRect().y > 200) {
      poster_information.style.visibility = 'hidden'
      poster_information.style.opacity = '0'
      poster.style.filter = 'brightness(1)'
      world.style.filter = 'brightness(1)'
      streaming.style.filter = 'brightness(1)'
      selections.forEach(selection => {
        selection.style.opacity = '0'
        selection.style.visibility = 'hidden'
      })
    }

    if (header.getBoundingClientRect().y + (header.getBoundingClientRect().height - 500) < 0) {
      player_image.style.visibility = 'hidden'
      player_image.style.opacity = '0'
    } else {
      player_image.style.visibility = 'visible'
      player_image.style.opacity = '1'
    }
  }
}

export { 
  poster, world, selections, poster_mobile_ada, poster_mobile_krasota, poster_mobile_rodeo, poster_mobile_israeli, poster_mobile_mbm, poster_mobile_circles, poster_mobile, poster_information, posters_mobile, header_title, player_image,

  header_hide, header_background_hide, header_background_show, header_intro, scrollOff, scrollOn, mobile_version 
}