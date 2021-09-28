import React from 'react';
import { WEEK } from '../../config';
import CalendarDay from './calendar-day/calendarDay';
import { CalendarMonth, CalendarYear } from './calendar-month-year/calendarMonthAndYear';
import { SHOWING_STATE, NUM_OF_NEAR_YEARS } from '../../config.js';
import CalenderCaption from './calendar-caption/calendarCaption';
import './calendarMain.scss';

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
    return (
      <div className="shrink-container">
        <div className="calendar-main-tbody" ref={this.props.calendarBodyRef}>
          {tbody}
        </div>
      </div>
    );
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
          calendarBodyRef={this.props.calendarBodyRef}
          calendarDayRef={this.props.calendarDayRef}
          calendarMonthAndYearRef={this.props.calendarMonthAndYearRef}
        />
      </div>
    );
  }
}

export default CalenderMain;
