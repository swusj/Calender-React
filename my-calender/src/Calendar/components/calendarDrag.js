import React from "react";

function CalendarDrag(props) {
  const handleMouseDown = function (e) {
    let calendar = props.dragDom.current;
    if (!calendar.style.position) {
      calendar.style.position = "fixed";
    }
    // 鼠标按下时，鼠标到元素左侧的距离
    let posX = e.clientX - calendar.offsetLeft;
    let posY = e.clientY - calendar.offsetTop;
    document.onmousemove = function (e) {
      let left = e.clientX - posX;
      let top = e.clientY - posY;
      calendar.style.left = left + "px";
      calendar.style.top = top + "px";
    };
    // 鼠标起来
    document.onmouseup = function () {
      this.onmousemove = null;
      this.onmouseup = null;
    };
  };
  return (
    <div
      className={"calendar-top-dragable"}
      onMouseDown={(e) => {
        handleMouseDown(e);
      }}
    ></div>
  );
}

export default CalendarDrag;
