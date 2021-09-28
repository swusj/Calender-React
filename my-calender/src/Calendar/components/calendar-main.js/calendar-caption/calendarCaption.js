import React from 'react';
import { SHOWING_STATE, NUM_OF_NEAR_YEARS } from '../../../config.js';
import './calendarCaption.scss';

// 日历表题
class CalenderCaption extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let capStr = '';
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

export default CalenderCaption;
