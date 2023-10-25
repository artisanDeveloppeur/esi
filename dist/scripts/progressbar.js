class ProgressBar {
  constructor(element) {
    this.element = element

    this.element.classList.add("progress")
    //let valueInt = parseInt(this.element.dataset.value)


    if (this.element.dataset.type != "undefined") {
      this.type = this.element.dataset.type
    } else {
      this.type = "basic"
    }


    this.progressbar = document.createElement("div")
    this.progressbar.setAttribute('role', 'progressbar')
    this.progressbar.setAttribute('aria-valuemin', '0')
    this.progressbar.setAttribute('aria-valuemax', '100')
    this.progressbar.setAttribute('aria-valuenow', parseInt(this.element.dataset.value))

    this.progressbar.classList.add("progressbar")
    this.progressbar.classList.add(this.type)

    //this.progressbar.innerText = `${valueInt}%`
    //console.log(valueInt)

    if (this.element.dataset.striped == "true") {
      this.progressbar.classList.add("striped")
    }
    //this.progress.style.width = `${this.element.dataset.value}%`
    /*
    role="progressbar" 
    aria-valuenow="70"
    aria-valuemin="0" aria-valuemax="100"
    */

    this.changeProgress(parseInt(this.element.dataset.value))
    this.element.appendChild(this.progressbar)




  }

  changeProgress(progressbar) {
    if (this.progressValue >= 100) { return }
    this.progressValue = progressbar
    //if (this.progressbar.style.width === "100%") {
    //  return
    //}
    if (this.progressbar.style.width >= 100) { return }

    this.progressbar.style.width = `${this.progressValue}%`
    this.progressbar.innerText = `${this.progressValue}%`
    this.progressbar.setAttribute('aria-valuenow', this.progressValue)


  }
}