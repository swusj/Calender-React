import React from "react";
import { NUM_OF_CANLENDER_ITEM, NUM_OF_CANLENDER_ROW_ITEM, ITEM_STATE } from "../config.js";

import { getPrevMonth, group, getNextMonth } from "../utils.js";

class CalendarDayItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let itemClass = "";
    switch (this.props.state) {
      case ITEM_STATE.NEARLY:
        itemClass = "inactive";
        break;
      case ITEM_STATE.MIDDLE:
        itemClass = "active";
        break;
      case ITEM_STATE.CURRENT:
        itemClass = "day-light";
        break;
      default:
        break;
    }
    return (
      <div
        className={`calendar-main-tbody-row-item-day ${itemClass}`}
        onClick={() => {
          this.props.handleItemClick(this.props.date);
        }}
      >
        {this.props.date}
      </div>
    );
  }
}

class CalendarDay extends React.Component {
  constructor(props) {
    super(props);
  }
  renderRow(rowData, key) {
    return (
      <div className="calendar-main-tbody-row" key={key}>
        {rowData.map((item) => {
          return (
            <CalendarDayItem
              date={item.date}
              state={item.state}
              key={item.date}
              handleItemClick={(data) => {
                this.props.handleItemClick(data);
              }}
            />
          );
        })}
      </div>
    );
  }
  render() {
    const calData_now = createCalendarData(this.props.showDate, this.props.todayDate);
    const calData_prev = createCalendarData(getPrevMonth(this.props.showDate.year, this.props.showDate.month), this.props.todayDate);
    const calData_next = createCalendarData(getNextMonth(this.props.showDate.year, this.props.showDate.month), this.props.todayDate);
    let groupCalData_now = group(calData_now, NUM_OF_CANLENDER_ROW_ITEM);
    let groupCalData_prev = group(calData_prev, NUM_OF_CANLENDER_ROW_ITEM);
    let groupCalData_next = group(calData_next, NUM_OF_CANLENDER_ROW_ITEM);
    return (
      <div className="calendar-main-tbody-day">
        <div className="carousel-day" ref={this.props.calendarDayRef}>
          {groupCalData_prev.map((row, index) => {
            return this.renderRow(row, index);
          })}
          {groupCalData_now.map((row, index) => {
            return this.renderRow(row, index);
          })}
          {groupCalData_next.map((row, index) => {
            return this.renderRow(row, index);
          })}
        </div>
      </div>
    );
  }
}

// 求一个月的日历数据
function createCalendarData(showDate, todayDate) {
  let calData = [];
  let LastMonth = getPrevMonth(showDate.year, showDate.month);
  let j = 1,
    k = 1;

  for (let i = 0; i < NUM_OF_CANLENDER_ITEM; i++) {
    if (i < showDate.dayOfOne) {
      //上个月的
      calData.push({
        date: LastMonth.dayNum - showDate.dayOfOne + i + 1,
        state: ITEM_STATE.NEARLY,
      });
    } else if (i >= showDate.dayOfOne && i < showDate.dayOfOne + showDate.dayNum) {
      //中间的
      if (showDate.year === todayDate.year && showDate.month === todayDate.month && j === todayDate.date) {
        //当天
        calData.push({
          date: j,
          state: ITEM_STATE.CURRENT,
        });
      } else {
        calData.push({
          date: j,
          state: ITEM_STATE.MIDDLE,
        });
      }
      j++;
    } else {
      //下个月的
      calData.push({
        date: k,
        state: ITEM_STATE.NEARLY,
      });
      k++;
    }
  }
  return calData;
}

export default CalendarDay;
