function shrinkEnlargeAni(dom, func, className) {
  dom.classList.add(className);
  setTimeout(() => {
    func();
  }, 200);
  setTimeout(() => {
    dom.classList.remove(className);
  }, 500);
}

function carouselAni(dom, func, className) {
  dom.classList.add(className);
  setTimeout(() => {
    dom.classList.remove(className);
    func();
  }, 150);
}

export { shrinkEnlargeAni, carouselAni };
