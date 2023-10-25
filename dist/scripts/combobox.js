/*
https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/

https://www.24joursdeweb.fr/2022/comment-transformer-composant-accessible/
*/
class ComboBox {
  constructor(element) {
    this.element = element
    this.name = element.dataset.name
    this.list = Array.from(this.element.querySelectorAll("[data-option]")).map(option => option.dataset.option)
    this.input = document.createElement("input")
    this.input.classList.add("combobox")
    this.element.appendChild(this.input)
    this.input.setAttribute("name", this.name)

    this.comboList = document.createElement("div")
    this.comboList.classList.add("combolist")
    //this.comboList.style.width = this.input.offsetWidth - 2 bug
    this.comboList.width = this.input.offsetWidth - 2;
    this.element.appendChild(this.comboList)

    this.input.addEventListener("keyup", () => {
      this.showCombo()

    })
  }

  showCombo() {
    if (this.input.value.length > 0) {
      this.comboList.classList.add("show")
      this.comboList.innerHTML = ""
      let filterList = this.list.filter(option => option.includes(this.input.value))
      for (let option of filterList) {
        this.comboList.insertAdjacentHTML("beforeend", `<div class="option" data-value="${option}">${option}</div>`)
      }
      this.comboList.querySelectorAll(".option").forEach(option => {
        option.addEventListener("click", (e) => {
          this.input.value = e.target.dataset.value
          this.comboList.classList.remove("show")
        })
      })

    } else {
      this.comboList.classList.remove("show")
    }


  }
}


// https://www.youtube.com/watch?v=UOflpt0Vw0s bug 20 min show remove