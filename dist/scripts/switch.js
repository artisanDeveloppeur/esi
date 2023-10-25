class Switch {
  constructor(element) {
    this.element = element
    this.name = element.dataset.name

    this.label = document.createElement("label")
    this.label.classList.add("switch")
    this.element.appendChild(this.label)

    this.checkbox = document.createElement("input")
    this.checkbox.setAttribute("name", this.name)
    this.checkbox.setAttribute("type", "checkbox")
    this.label.appendChild(this.checkbox)

    this.slider = document.createElement("span")
    this.slider.classList.add("slider")
    this.slider.classList.add("round")
    this.label.appendChild(this.slider)


  }
}