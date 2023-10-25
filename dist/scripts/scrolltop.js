const scrollToTop = document.querySelector(".scroll-top");
const scrollfill = document.querySelector(".fill");
const $rootElement = document.documentElement;
const $body = document.body;

window.onscroll = () => {
  // Filling
  // const scrollTop = ($rootElement.scrollTop - $body.scrollTop);
  const scrollTop = window.scrollY || window.pageYOffset;
  const clientHt = $rootElement.scrollHeight - $rootElement.clientHeight;
  scrollfill.style.width = `${Math.floor(
    (scrollTop / clientHt) * 100
  )}%`;

  // ScrollToTop Button
  // if($rootElement.scrollTop > 100 || $body.scrollTop > 100) {
  if (window.scrollY > 100) {
    scrollToTop.style.display = "grid";
  } else {
    scrollToTop.style.display = "none";
  }
};

scrollToTop.onclick = () => {
  // $rootElement.scrollTop = $body.scrollTop = 0;
  window.scrollTo(0, 0);
};