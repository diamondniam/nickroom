import { poster, world, selections, poster_mobile_ada, poster_mobile_krasota, poster_mobile_rodeo, poster_mobile_israeli, poster_mobile_mbm, poster_mobile_circles, poster_mobile, poster_information, posters_mobile } from "./app.js"

import { mobile_version } from "./onload.js"

let infromation_started = false

window.onscroll = () => {
  poster_information.style.display = 'block'

  if (!mobile_version) {
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
  }
}

poster_mobile_mbm.element.querySelector('.title').innerHTML = poster_mobile_mbm.title
poster_mobile_mbm.element.querySelector('.description').innerHTML = poster_mobile_mbm.description
poster_mobile_rodeo.element.querySelector('.title').innerHTML = poster_mobile_rodeo.title
poster_mobile_rodeo.element.querySelector('.description').innerHTML = poster_mobile_rodeo.description
poster_mobile_krasota.element.querySelector('.title').innerHTML = poster_mobile_krasota.title
poster_mobile_krasota.element.querySelector('.description').innerHTML = poster_mobile_krasota.description
poster_mobile_ada.element.querySelector('.title').innerHTML = poster_mobile_ada.title
poster_mobile_ada.element.querySelector('.description').innerHTML = poster_mobile_ada.description
poster_mobile_israeli.element.querySelector('.title').innerHTML = poster_mobile_israeli.title
poster_mobile_israeli.element.querySelector('.description').innerHTML = poster_mobile_israeli.description

function do_animation(who) {
  return function() {
    who.circle.src = `/nickroom/src/mobile/poster_mobile_circle_${who.start}.png`
    who.start++
    if (who.start > 3) {
      who.start = 1
    }
  }
}

function do_decrease(who) {
  return function() {
    who.decrease_start++
    if (who.decrease_start > 3) {
      who.decrease_start = 1
      who.circle.style.display = 'none'
    }
    who.circle.src = `/nickroom/src/mobile/poster_mobile_circle_decrease_${who.decrease_start}.png`
  }
}

var poster_mobile_mbm_animation = setInterval((do_animation(poster_mobile_mbm)), 650);
var poster_mobile_rodeo_animation = setInterval((do_animation(poster_mobile_rodeo)), 680);
var poster_mobile_israeli_animation = setInterval((do_animation(poster_mobile_israeli)), 710);
var poster_mobile_krasota_animation = setInterval((do_animation(poster_mobile_krasota)), 690);
var poster_mobile_ada_animation = setInterval((do_animation(poster_mobile_ada)), 700);

var poster_mobile_rodeo_animation_decrease
var poster_mobile_israeli_animation_decrease
var poster_mobile_krasota_animation_decrease
var poster_mobile_ada_animation_decrease
var poster_mobile_mbm_animation_decrease

var circles_transform_values = {
  from_left: getComputedStyle(poster_mobile.querySelector('.rodeo').querySelector('img')).getPropertyValue('transform'),
  ada: getComputedStyle(poster_mobile.querySelector('.ada').querySelector('img')).getPropertyValue('transform'),
  krasota: getComputedStyle(poster_mobile.querySelector('.krasota').querySelector('img')).getPropertyValue('transform')
}

posters_mobile.forEach((poster, index) => {
  index++
  if (index % 2) {
    poster.querySelector('.text').style.transform = `translateX(${screen.width / 2}px)`
  } else {
    poster.querySelector('.text').style.transform = `translateX(-${screen.width / 2}px)`
  }
})

poster_mobile_circles.forEach(circle => {
  circle.onclick = (e) => {
    let target = e.target
    
    posters_mobile.forEach(poster => {
      poster.classList.remove('current')
      if (!poster.classList.contains('current')) {
        poster.querySelector('.text').style.transform = `translateX(${screen.width/2}px)`
        poster.querySelector('.circle img').style.display = 'inline'
        poster.querySelector('.artwork').querySelector('img').style.transform = circles_transform_values.from_left

        if (poster == poster_mobile.querySelector('.mbm')) {
          clearInterval(poster_mobile_mbm_animation)
          poster_mobile_mbm_animation = setInterval((do_animation(poster_mobile_mbm)), 650);
        }
        if (poster == poster_mobile.querySelector('.rodeo')) {
          clearInterval(poster_mobile_rodeo_animation)
          poster_mobile_rodeo_animation = setInterval((do_animation(poster_mobile_rodeo)), 650);
        }
        if (poster == poster_mobile.querySelector('.ada')) {
          poster.querySelector('.text').style.transform = `translateX(-${screen.width/2}px)`
          poster.querySelector('.artwork').querySelector('img').style.transform = circles_transform_values.ada
          clearInterval(poster_mobile_ada_animation)
          poster_mobile_ada_animation = setInterval((do_animation(poster_mobile_ada)), 650);
        }
        if (poster == poster_mobile.querySelector('.krasota')) {
          poster.querySelector('.text').style.transform = `translateX(-${screen.width/2}px)`
          poster.querySelector('.artwork').querySelector('img').style.transform = circles_transform_values.krasota
          clearInterval(poster_mobile_krasota_animation)
          poster_mobile_krasota_animation = setInterval((do_animation(poster_mobile_krasota)), 650);
        }
        if (poster == poster_mobile.querySelector('.israeli')) {
          clearInterval(poster_mobile_israeli_animation)
          poster_mobile_israeli_animation = setInterval((do_animation(poster_mobile_israeli)), 650);
        }
      }

      switch (!poster.classList.contains('current')) {
        case poster_mobile.querySelector('.mbm'):
          break;
        case poster_mobile.querySelector('.rodeo').querySelector('.circle img'):
          poster_mobile_rodeo_animation = setInterval((do_animation(poster_mobile_rodeo)), 680);
          break;
        case poster_mobile.querySelector('.krasota').querySelector('.circle img'):
          poster_mobile_krasota_animation = setInterval((do_animation(poster_mobile_krasota)), 690);
          break;
        case poster_mobile.querySelector('.israeli').querySelector('.circle img'):
          poster_mobile_israeli_animation = setInterval((do_animation(poster_mobile_israeli)), 710);
          break;
        case poster_mobile.querySelector('.ada').querySelector('.circle img'):
          poster_mobile_ada_animation = setInterval((do_animation(poster_mobile_ada)), 700);
          break;
      }
    })

    switch (target) {
      case poster_mobile.querySelector('.mbm').querySelector('.circle img'):
        clearInterval(poster_mobile_mbm_animation)
        poster_mobile_mbm_animation_decrease = setInterval(do_decrease(poster_mobile_mbm), 200)
        setTimeout(() => {
          clearInterval(poster_mobile_mbm_animation_decrease)
        }, 200*4)
        poster_mobile.querySelector('.mbm').classList.add('current')
        break;
      case poster_mobile.querySelector('.rodeo').querySelector('.circle img'):
        clearInterval(poster_mobile_rodeo_animation)
        poster_mobile_rodeo_animation_decrease = setInterval(do_decrease(poster_mobile_rodeo), 200)
        setTimeout(() => {
          clearInterval(poster_mobile_rodeo_animation_decrease)
        }, 200*4)
        poster_mobile.querySelector('.rodeo').classList.add('current')
        break;
      case poster_mobile.querySelector('.krasota').querySelector('.circle img'):
        clearInterval(poster_mobile_krasota_animation)
        poster_mobile_krasota_animation_decrease = setInterval(do_decrease(poster_mobile_krasota), 200)
        setTimeout(() => {
          clearInterval(poster_mobile_krasota_animation_decrease)
        }, 200*4)
        poster_mobile.querySelector('.krasota').classList.add('current')
        break;
      case poster_mobile.querySelector('.israeli').querySelector('.circle img'):
        clearInterval(poster_mobile_israeli_animation)
        poster_mobile_israeli_animation_decrease = setInterval(do_decrease(poster_mobile_israeli), 200)
        setTimeout(() => {
          clearInterval(poster_mobile_israeli_animation_decrease)
        }, 200*4)
        poster_mobile.querySelector('.israeli').classList.add('current')
        break;
      case poster_mobile.querySelector('.ada').querySelector('.circle img'):
        clearInterval(poster_mobile_ada_animation)
        poster_mobile_ada_animation_decrease = setInterval(do_decrease(poster_mobile_ada), 200)
        setTimeout(() => {
          clearInterval(poster_mobile_ada_animation_decrease)
        }, 200*4)
        poster_mobile.querySelector('.ada').classList.add('current')
        break;
    }

    posters_mobile.forEach(poster => {
      if (poster.classList.contains('current')) {
        setTimeout(() => {
          poster.querySelector('.text').style.transform = 'translateX(0)'
          poster.querySelector('.artwork').querySelector('img').style.transform = 'translateX(0)'
        }, 200)
      }
    })

    poster_mobile.querySelectorAll('.hint').forEach(hint => {
      hint.style.opacity = '0'
    })
  }
})

const poster_mobile_background = poster_mobile.querySelector('.background').querySelector('img')
let poster_mobile_background_counter = 0

setInterval(() => {
  poster_mobile_background_counter++
  if (poster_mobile_background_counter > 4) {
    poster_mobile_background_counter = 1
  }
  poster_mobile_background.src = `/nickroom/src/mobile/poster_mobile_background_decoration_${poster_mobile_background_counter}.png`
}, 650) 

const poster_mobile_elements = [poster_mobile_ada.element.querySelectorAll('div'), poster_mobile_israeli.element.querySelectorAll('div'), poster_mobile_mbm.element.querySelectorAll('div'), poster_mobile_krasota.element.querySelectorAll('div'), poster_mobile_rodeo.element.querySelectorAll('div')]

poster_mobile_elements.forEach(element => {
  element.forEach(child => {
    child.style.opacity = '0'
    child.style.transition = 'opacity .6s, transform .4s steps(4)'
  })
})

let world_moible_scrolled = false

if (mobile_version) {
  window.onscroll = () => {
  
    if (world.getBoundingClientRect().y * 1.2 < 0) {
      world.querySelector('.content').style.opacity = '1'
      world.querySelector('.content').style.transition = 'opacity .5s'
    }
    if (world.getBoundingClientRect().y + world.getBoundingClientRect().height / 1.7 < 0 && !world_moible_scrolled) {
      world.querySelector('.content').style.opacity = '0'
    }
    if (world.getBoundingClientRect().y + world.getBoundingClientRect().height / 1.5 < 0) {
      world.querySelector('.content').style.position = 'static'
      world.querySelector('.content').style.opacity = '1'
      poster_mobile.style.opacity = '1'
      world_moible_scrolled = true
  
      setTimeout(() => {
        poster_mobile_elements.forEach(element => {
          element.forEach(child => {
            child.style.opacity = '1'
          })
        })
      }, 700);

      setTimeout(() => {
        poster_mobile.querySelectorAll('.hint').forEach(hint => {
          hint.style.opacity = '0'
          hint.style.transition = 'opacity .4s steps(4)'
          hint.style.animation = 'none'

          setTimeout(() => {
            hint.style.display = 'none'
          }, 400)
        })
      }, 5000);
    } else {
      poster_mobile.style.opacity = '0'
    }
  }
}

if (mobile_version) {
  streaming.querySelector('.background').querySelector('img').src = '/nickroom/src/streaming/streaming_background_mobile.png'
}