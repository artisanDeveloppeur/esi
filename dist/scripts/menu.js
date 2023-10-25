// menu burger
let triggered = document.querySelector('#triggered')

document.querySelector('#trigger').addEventListener("click", () => {
  triggered.classList.toggle('visible');
})


document.querySelector('#close').addEventListener("click", () => {
  triggered.classList.remove('visible');
})

// menu Animate
const menu = document.querySelector('.menu')
const menuItems = Array.from(menu.querySelectorAll('a.menu-link'))
let activeItem = menu.querySelector('[aria-selected]')
const indicators = new Map()

menuItems.forEach((item) => {
  const span = document.createElement('span')
  span.classList.add('indicator')
  indicators.set(item, span)
  item.appendChild(span)
})

function onItemClick(e) {
  if (e.currentTarget === activeItem) {
    return;
  }

  if (activeItem) {
    const prevIndicator = indicators.get(activeItem)
    const currentIndicator = indicators.get(e.currentTarget)
    currentIndicator.animate([
      { transform: getTransform(prevIndicator, currentIndicator) },
      { transform: 'translate3d(0,0,0) scale(1, 1)' }
    ], {
      fill: 'none',
      duration: 600,
      easing: 'cubic-bezier(.48,1.55,.28,1)'
    })
  }

  activeItem = e.currentTarget
}

function getTransform(fromElement, toElement) {
  const fromRect = fromElement.getBoundingClientRect()
  const toRect = toElement.getBoundingClientRect()
  const transform = {
    x: fromRect.x - toRect.x,
    y: fromRect.y - toRect.y,
    scaleX: fromRect.width / toRect.width,
    scaleY: fromRect.height / toRect.height
  }
  return `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scaleX}, ${transform.scaleY})`
}

menuItems.forEach((item) => {
  item.addEventListener('mouseover', onItemClick)
})
