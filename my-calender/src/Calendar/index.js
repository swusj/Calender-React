import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import {
  getDayNum,
  getDayOfOne,
  getPrevMonth,
  getPrevYear,
  getPrevTenYear,
  getNextMonth,
  getNextYear,
  getNextTenYear,
  getTimestamp,
} from "./utils.js";
import { SHOWING_STATE } from "./config.js";
import CalenderHeader from "./components/calenderHead";
import CalenderMain from "./components/calenderMain";
import CalendarDrag from "./components/calendarDrag";
import { shrinkEnlargeAni, carouselAni } from "./animation.js";

class Calender extends React.Component {
  constructor(props) {
    super(props);
    const myDate = new Date();
    this.state = {
      todayDate: {
        year: myDate.getFullYear(),
        month: myDate.getMonth(),
        date: myDate.getDate(),
      },
      curState: SHOWING_STATE.DAY,
      isShow: true,
    };

    this.state.todayDate.dayNum = getDayNum(this.state.todayDate.year, this.state.todayDate.month);
    this.state.todayDate.dayOfOne = getDayOfOne(this.state.todayDate.year, this.state.todayDate.month);
    this.state.showDate = Object.assign({}, this.state.todayDate);
    this.calendarDayRef = React.createRef();
    this.calendarBodyRef = React.createRef();
    this.calendarMonthAndYearRef = React.createRef();
    this.calendarRef = React.createRef();
  }
  // 点击x历头的处理函数
  forwordTransition() {
    // console.log(this.calendarBodyRef);
    switch (this.state.curState) {
      case SHOWING_STATE.DAY:
        shrinkEnlargeAni(this.calendarBodyRef.current, () => this.setState({ curState: SHOWING_STATE.MONTH }), "calendar-main-tbody-shrink");
        break;
      case SHOWING_STATE.MONTH:
        shrinkEnlargeAni(this.calendarBodyRef.current, () => this.setState({ curState: SHOWING_STATE.YEAR }), "calendar-main-tbody-shrink");
        break;
      case SHOWING_STATE.YEAR:
        break;
      default:
        break;
    }
  }
  // 点击上箭头的处理函数
  handleClickPrev() {
    // 我希望能在这里用到表格组件的ref，然后再更改其高度什么的
    switch (this.state.curState) {
      case SHOWING_STATE.DAY:
        carouselAni(
          this.calendarDayRef.current,
          () => {
            this.setState({ showDate: Object.assign(this.state.showDate, getPrevMonth(this.state.showDate.year, this.state.showDate.month)) });
          },
          "carousel-day-prev"
        );
        break;
      case SHOWING_STATE.MONTH:
        carouselAni(
          this.calendarMonthAndYearRef.current,
          () => {
            this.setState({ showDate: Object.assign(this.state.showDate, getPrevYear(this.state.showDate.year, this.state.showDate.month)) });
          },
          "carousel-month-and-year-prev"
        );
        break;
      case SHOWING_STATE.YEAR:
        carouselAni(
          this.calendarMonthAndYearRef.current,
          () => {
            this.setState({ showDate: Object.assign(this.state.showDate, getPrevTenYear(this.state.showDate.year, this.state.showDate.month)) });
          },
          "carousel-month-and-year-prev"
        );
        break;
      default:
        break;
    }
  }
  // 点击下箭头的处理函数
  handleClickNext() {
    switch (this.state.curState) {
      case SHOWING_STATE.DAY:
        carouselAni(
          this.calendarDayRef.current,
          () => {
            this.setState({ showDate: Object.assign(this.state.showDate, getNextMonth(this.state.showDate.year, this.state.showDate.month)) });
          },
          "carousel-day-next"
        );
        break;
      case SHOWING_STATE.MONTH:
        carouselAni(
          this.calendarMonthAndYearRef.current,
          () => {
            this.setState({ showDate: Object.assign(this.state.showDate, getNextYear(this.state.showDate.year, this.state.showDate.month)) });
          },
          "carousel-month-and-year-next"
        );
        break;
      case SHOWING_STATE.YEAR:
        carouselAni(
          this.calendarMonthAndYearRef.current,
          () => {
            this.setState({ showDate: Object.assign(this.state.showDate, getNextTenYear(this.state.showDate.year, this.state.showDate.month)) });
          },
          "carousel-month-and-year-next"
        );
        break;
      default:
        break;
    }
  }
  // 点击年历、日历项的处理函数
  handleItemClick(data) {
    switch (this.state.curState) {
      case SHOWING_STATE.DAY:
        const timestamp = getTimestamp(this.state.showDate.year, this.state.showDate.month, data);
        console.log(timestamp);
        break;
      case SHOWING_STATE.MONTH:
        const month = data.slice(0, -1) - 1;
        shrinkEnlargeAni(
          this.calendarBodyRef.current,
          () =>
            this.setState({
              showDate: {
                year: this.state.showDate.year,
                month: month,
                date: this.state.showDate.date,
                dayNum: getDayNum(this.state.showDate.year, month),
                dayOfOne: getDayOfOne(this.state.showDate.year, month),
              },
              curState: SHOWING_STATE.DAY,
            }),
          "calendar-main-tbody-enlarge"
        );
        break;
      case SHOWING_STATE.YEAR:
        const year = Number(data);
        shrinkEnlargeAni(
          this.calendarBodyRef.current,
          () =>
            this.setState({
              showDate: {
                year: year,
                month: this.state.showDate.month,
                date: this.state.showDate.date,
                dayNum: getDayNum(year, this.state.showDate.month),
                dayOfOne: getDayOfOne(year, this.state.showDate.month),
              },
              curState: SHOWING_STATE.MONTH,
            }),
          "calendar-main-tbody-enlarge"
        );
        break;
      default:
        break;
    }
  }

  init() {
    if (this.state.curState === SHOWING_STATE.MONTH)
      shrinkEnlargeAni(
        this.calendarBodyRef.current,
        () =>
          this.setState({
            showDate: Object.assign({}, this.state.todayDate),
            curState: SHOWING_STATE.DAY,
          }),
        "calendar-main-tbody-enlarge"
      );
  }

  handleClickClose() {
    this.setState({ isShow: false });
  }

  render() {
    return (
      <>
        {this.state.isShow && (
          <div className="calendar" ref={this.calendarRef}>
            <div className="calendar-top">
              <CalendarDrag dragDom={this.calendarRef} />
              <div
                className="calendar-top-close"
                onClick={() => {
                  this.handleClickClose();
                }}
              ></div>
            </div>
            <CalenderHeader
              isNeedZero={this.props.isNeedZero}
              curState={this.state.curState}
              todayDate={this.state.todayDate}
              init={() => this.init()}
            />
            <CalenderMain
              curState={this.state.curState}
              todayDate={this.state.todayDate}
              showDate={this.state.showDate}
              forwordTransition={() => {
                this.forwordTransition();
              }}
              handleClickPrev={() => {
                this.handleClickPrev();
              }}
              handleClickNext={() => {
                this.handleClickNext();
              }}
              handleItemClick={(data) => {
                this.handleItemClick(data);
              }}
              calendarBodyRef={this.calendarBodyRef}
              calendarDayRef={this.calendarDayRef}
              calendarMonthAndYearRef={this.calendarMonthAndYearRef}
            />
          </div>
        )}
      </>
    );
  }
}

export default Calender;