let $map = document.querySelector('#map')

class GoogleMap {
  constructor() {
    this.map = null
    this.bounds = null
    this.textMarker = null
  }
  /**
   * Charge la carte sur un élément
   * @param {HTMLElement} element
   */
  async load(element) {

    //Uncaught (in promise) ReferenceError: google is not defined


    // key=AIzaSyAdfipYKTyWEiJXhGSRos_HxVAaEcUQyuw

    // ?key=AIzaSyAZTFstnD3AUQeZ94U7ZFmS-T3GOXyI1aY
    return new Promise((resolve, reject) => {
      $script('https://maps.googleapis.com/maps/api/js', () => {
        this.textMarker = class TextMarker extends google.maps.OverlayView {

          constructor(pos, map, text) {
            super()
            this.div = null
            this.html = null
            this.pos = pos
            this.text = text
            this.setMap(map)
            this.onActivation = []
          }

          onAdd() {
            this.div = document.createElement('div')
            this.div.classList.add('marker')
            this.div.style.position = 'absolute'
            this.div.innerHTML = this.text
            this.getPanes().overlayImage.appendChild(this.div)
            this.div.addEventListener('click', (e) => {
              e.preventDefault()
              e.stopPropagation()
              this.activate()
            })
          }

          draw() {
            let position = this.getProjection().fromLatLngToDivPixel(this.pos)
            this.div.style.left = position.x + "px"
            this.div.style.top = position.y + "px"
          }

          onRemove() {
            this.div.parentNode.removeChild(this.div)
          }

          hover() {
            if (this.div !== null) {
              this.div.classList.add('is-active')
            }
          }
          out() {
            if (this.div !== null) {
              this.div.classList.remove('is-active')
            }
          }
          activate() {
            this.div.classList.add('z-index')
            if (this.div !== null) {
              this.div.innerHTML = this.html
            }
            this.onActivation.forEach(function (cb) { cb() })

          }
          deactivate() {
            this.div.classList.remove('z-index')
            if (this.div !== null) {
              this.div.innerHTML = this.text
            }
          }
          setContent(html) {
            this.html = html
          }
        }
        this.map = new google.maps.Map(element)
        //https://developers.google.com/maps/documentation/javascript/reference/3/coordinates#LatLngBounds
        this.bounds = new google.maps.LatLngBounds()
        resolve()
      })
    })

  }

  /**
   * Ajoute un marker sur la carte
   * @param {string} lat
   * @param {string} lng
   * @param {string} text
   * @@returns {TextMarker}  
   */
  addMarker(lat, lng, text) {
    let point = new google.maps.LatLng(lat, lng)
    //https://www.grafikart.fr/tutoriels/javascript/google-maps-marker-personnalise-1005
    let marker = new this.textMarker(point, this.map, text)
    /*
    let marker = new google.maps.Marker({
    // InvalidValueError: setPosition: not a LatLng or LatLngLiteral: in property lat: not a number
    position: point,
    map: this.map
    })
    */
    marker.onActivation.push(() => {
      this.map.setCenter(marker.pos)
    })
    this.bounds.extend(point)
    return marker
  }

  /**
   * Centre la carte pour englober les markers
   */
  centerMap() {
    // déplacer + zoomer
    this.map.panToBounds(this.bounds)
    this.map.fitBounds(this.bounds)

  }
}

const initMap = async function () {

  let map = new GoogleMap()
  let activeMarker = null
  let enabledMarker = null

  await map.load($map)
  //console.log(map)

  Array.from(document.querySelectorAll('.item-map')).forEach(function (item) {
    //let marker = map.addMarker(item.dataset.lat, item.dataset.lng, item.dataset.price + ' €')
    let marker = map.addMarker(item.dataset.lat, item.dataset.lng, item.dataset.name)
    // A marker with a custom inline SVG.
    console.log(item)

    marker.setContent(item.innerHTML)

    marker.onActivation.push(function () {
      if (enabledMarker != null) {
        enabledMarker.deactivate()
      }
      enabledMarker = marker
    })

    item.addEventListener('mouseover', function () {
      marker.hover()
      //marker.toggle()
      if (activeMarker != null) {
        activeMarker.out()
      }
      activeMarker = marker
      //})
    }, { capture: true })
    item.addEventListener('mouseleave', function () {
      if (activeMarker === marker) {
        marker.out()
        activeMarker = null

      }

      //})
    }, { capture: true })
  })
  map.centerMap()

}
if ($map !== null) {

  initMap()
  /*
  let map = new GoogleMap() 
  map.load($map).then(function(){
      Array.from(document.querySelectorAll('.js-marker')).forEach(function(item){
          map.addMarker(item.dataset.lat, item.dataset.lng, item.dataset.price + ' €')
      })            
  })
  */
}