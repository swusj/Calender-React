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
import { TRANS_TIME, SHOWING_STATE, NUM_OF_NEAR_YEARS } from "./config.js";
import CalenderHeader from "./components/calenderHead";
import CalenderMain from "./components/calenderMain";

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
      // curState: SHOWING_STATE.MONTH,
      // curState: SHOWING_STATE.YEAR,
    };

    this.state.todayDate.dayNum = getDayNum(this.state.todayDate.year, this.state.todayDate.month);
    this.state.todayDate.dayOfOne = getDayOfOne(this.state.todayDate.year, this.state.todayDate.month);
    this.state.showDate = Object.assign({}, this.state.todayDate);
  }
  // 点击x历头的处理函数
  forwordTransition() {
    switch (this.state.curState) {
      case SHOWING_STATE.DAY:
        this.setState({ curState: SHOWING_STATE.MONTH });
        break;
      case SHOWING_STATE.MONTH:
        this.setState({ curState: SHOWING_STATE.YEAR });
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
    console.log(this.state.showDate);
    switch (this.state.curState) {
      case SHOWING_STATE.DAY:
        this.setState({ showDate: Object.assign(this.state.showDate, getPrevMonth(this.state.showDate.year, this.state.showDate.month)) });
        break;
      case SHOWING_STATE.MONTH:
        this.setState({ showDate: Object.assign(this.state.showDate, getPrevYear(this.state.showDate.year, this.state.showDate.month)) });
        break;
      case SHOWING_STATE.YEAR:
        this.setState({ showDate: Object.assign(this.state.showDate, getPrevTenYear(this.state.showDate.year, this.state.showDate.month)) });
        break;
      default:
        break;
    }
  }
  // 点击下箭头的处理函数
  handleClickNext() {
    switch (this.state.curState) {
      case SHOWING_STATE.DAY:
        this.setState({ showDate: Object.assign(this.state.showDate, getNextMonth(this.state.showDate.year, this.state.showDate.month)) });
        break;
      case SHOWING_STATE.MONTH:
        this.setState({ showDate: Object.assign(this.state.showDate, getNextYear(this.state.showDate.year, this.state.showDate.month)) });
        break;
      case SHOWING_STATE.YEAR:
        this.setState({ showDate: Object.assign(this.state.showDate, getNextTenYear(this.state.showDate.year, this.state.showDate.month)) });
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
        this.setState({
          showDate: {
            year: this.state.showDate.year,
            month: month,
            date: this.state.showDate.date,
            dayNum: getDayNum(this.state.showDate.year, month),
            dayOfOne: getDayOfOne(this.state.showDate.year, month),
          },
          curState: SHOWING_STATE.DAY,
        });
        break;
      case SHOWING_STATE.YEAR:
        const year = Number(data);
        this.setState({
          showDate: {
            year: year,
            month: this.state.showDate.month,
            date: this.state.showDate.date,
            dayNum: getDayNum(year, this.state.showDate.month),
            dayOfOne: getDayOfOne(year, this.state.showDate.month),
          },
          curState: SHOWING_STATE.MONTH,
        });
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div className="calendar">
        <div className="calendar-dragable"></div>
        <CalenderHeader isNeedZero={this.props.isNeedZero} curState={this.state.curState} todayDate={this.state.todayDate} />
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
        />
      </div>
    );
  }
}

export default Calender;
