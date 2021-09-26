import React from "react";
import { WEEK } from "../config";
import CalendarDay from "./calendarDay";
import { CalendarMonth, CalendarYear } from "./calendarMonthAndYear";
import { SHOWING_STATE, NUM_OF_NEAR_YEARS } from "../config.js";

// 日历头
class CalenderColGroup extends React.Component {
  render() {
    const colGroup = WEEK.map((item, index) => {
      return (
        <div className="calendar-main-tbody-row-item" key={index}>
          {item}
        </div>
      );
    });
    return <>{colGroup}</>;
  }
}

// 日历表题
class CalenderCaption extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let capStr = "";
    switch (this.props.curState) {
      case SHOWING_STATE.DAY:
        capStr = `${this.props.showDate.year}年${this.props.showDate.month + 1}月`;
        break;
      case SHOWING_STATE.MONTH:
        capStr = `${this.props.showDate.year}年`;
        break;
      case SHOWING_STATE.YEAR:
        capStr = `${this.props.showDate.year - (this.props.showDate.year % NUM_OF_NEAR_YEARS)}-${
          this.props.showDate.year - (this.props.showDate.year % NUM_OF_NEAR_YEARS) + NUM_OF_NEAR_YEARS - 1
        }`;
        break;
      default:
        break;
    }
    // console.log(this.props);
    return (
      <div className="calendar-main-caption">
        <div className="calendar-main-caption-text calendar-main-clickable" onClick={this.props.forwordTransition}>
          {capStr}
        </div>
        <div className="calendar-main-caption-arrow">
          <div className="calendar-main-caption-arrow-prev calendar-main-clickable" onClick={this.props.handleClickPrev}></div>
          <div className="calendar-main-caption-arrow-next calendar-main-clickable" onClick={this.props.handleClickNext}></div>
        </div>
      </div>
    );
  }
}

// 日历表体  三种日历
class CalenderTbody extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let tbody = null;
    switch (this.props.curState) {
      case SHOWING_STATE.DAY:
        tbody = (
          <>
            <div className="calendar-main-tbody-row">
              <CalenderColGroup />
            </div>
            <CalendarDay
              showDate={this.props.showDate}
              todayDate={this.props.todayDate}
              handleItemClick={(data) => {
                this.props.handleItemClick(data);
              }}
              calendarDayRef={this.props.calendarDayRef}
            />
          </>
        );
        break;
      case SHOWING_STATE.MONTH:
        tbody = (
          <CalendarMonth
            showDate={this.props.showDate}
            todayDate={this.props.todayDate}
            handleItemClick={(data) => {
              this.props.handleItemClick(data);
            }}
            calendarMonthAndYearRef={this.props.calendarMonthAndYearRef}
          />
        );
        break;
      case SHOWING_STATE.YEAR:
        tbody = (
          <CalendarYear
            showDate={this.props.showDate}
            todayDate={this.props.todayDate}
            handleItemClick={(data) => {
              this.props.handleItemClick(data);
            }}
            calendarMonthAndYearRef={this.props.calendarMonthAndYearRef}
          />
        );
        break;
      default:
        break;
    }
    return <div className="calendar-main-tbody">{tbody}</div>;
  }
}

class CalenderMain extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log(this.props);
    return (
      <div className="calendar-main">
        <CalenderCaption
          showDate={this.props.showDate}
          curState={this.props.curState}
          forwordTransition={this.props.forwordTransition}
          handleClickPrev={this.props.handleClickPrev}
          handleClickNext={this.props.handleClickNext}
        />
        <CalenderTbody
          showDate={this.props.showDate}
          todayDate={this.props.todayDate}
          curState={this.props.curState}
          handleItemClick={(data) => {
            this.props.handleItemClick(data);
          }}
          calendarDayRef={this.props.calendarDayRef}
          calendarMonthAndYearRef={this.props.calendarMonthAndYearRef}
        />
      </div>
    );
  }
}

export default CalenderMain;
