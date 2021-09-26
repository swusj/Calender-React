/**
 * setTimeout保证实现放大缩小动画需要的时间次序
 * @param {*} dom 实现动画的DOM元素
 * @param {*} func 包含在动画执行到一半需要执行的代码
 * @param {*} className 动画的类名
 */
function shrinkEnlargeAni(dom, func, className) {
  dom.classList.add(className);
  setTimeout(() => {
    func();
  }, 200);
  setTimeout(() => {
    dom.classList.remove(className);
  }, 500);
}

/**
 * setTimeout保证实现日历动画需要的时间次序
 * @param {*} dom 实现动画的DOM元素
 * @param {*} func 包含在动画执行到一半需要执行的代码
 * @param {*} className 动画的类名
 */
function carouselAni(dom, func, className) {
  dom.classList.add(className);
  setTimeout(() => {
    dom.classList.remove(className);
    func();
  }, 150);
}

export { shrinkEnlargeAni, carouselAni };
