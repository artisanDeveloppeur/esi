const menulevel1 = document.querySelector(".menu-level1");
const items = document.querySelectorAll(".item");



/* Activate Submenu */
function toggleItem() {
  if (this.classList.contains("submenu-active")) {
    this.classList.remove("submenu-active");
  } else if (menulevel1.querySelector(".submenu-active")) {
    menulevel1.querySelector(".submenu-active").classList.remove("submenu-active");
    this.classList.add("submenu-active");
  } else {
    this.classList.add("submenu-active");
  }
}

/* Close Submenu From Anywhere */
function closeSubmenu(e) {
  if (menulevel1.querySelector(".submenu-active")) {
    let isClickInside = menulevel1
      .querySelector(".submenu-active")
      .contains(e.target);

    if (!isClickInside && menulevel1.querySelector(".submenu-active")) {
      menulevel1.querySelector(".submenu-active").classList.remove("submenu-active");
    }
  }
}
/* Event Listeners */
//toggle.addEventListener("click", toggleMenu, false);
for (let item of items) {
  if (item.querySelector(".submenu")) {
    item.addEventListener("click", toggleItem, false);
  }
  item.addEventListener("keypress", toggleItem, false);
}
document.addEventListener("click", closeSubmenu, false);
