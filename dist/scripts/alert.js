class Alert {


  static message(message) {
    this.display(message, "basic")
  }
  static warning(message) {
    this.display(message, "warning")
  }

  static error(message) {
    this.display(message, "danger")
  }

  static success(message) {
    this.display(message, "success")
  }

  static display(message, type) {
    this.AlertManager = new AlertManager()

    this.element = document.createElement("div")
    this.element.classList.add("alert")
    this.element.innerHTML = `<span class="message">${message}<span/><i class="fa fa-times"><i/>`
    this.element.classList.add(type)



    this.AlertManager.show(this.element)
  }

}


class AlertManager {
  constructor() {
    this.container = document.querySelector(".alert-container")

    if (this.container == null) {
      this.container = document.createElement("div")
      this.container.classList.add("alert-container")
      document.querySelector("body").appendChild(this.container)
    }


    //window.Alert = Alert
  }

  show(alert) {
    this.alert = alert
    this.container.appendChild(alert)
    this.hideTimeout = setTimeout(() => this.hide(), 3000)
    this.alert.addEventListener("mouseover", () => this.onMouseOver())
    this.alert.addEventListener("mouseleave", () => this.hide())


    this.alert.querySelector(".fa-times").addEventListener("click", () => this.close())
  }

  hide() {
    this.alert.classList.add("hide")
    this.removeTimeout = setTimeout(() => this.alert.remove(), 1000)

  }

  onMouseOver() {
    this.alert.classList.remove("hide")
    clearTimeout(this.hideTimeout)
    clearTimeout(this.removeTimeout)
    //this.alert.addEventListener("mouseleave", () => this.onMouseLeave()) bug
    //this.alert.removeEventListener("mouseover", () => this.onMouseOver) bug

  }

  close() {
    this.alert.remove()
    clearTimeout(this.hideTimeout)
    clearTimeout(this.removeTimeout)
    delete this
  }
  /* remove bug
  onMouseLeave() {
    this.hide()
    this.alert.removeEventListener("mouseleaver", () => this.onMouseLeave)
    this.alert.addEventListener("mouseover", () => this.onMouseOver())


  }
  */


}