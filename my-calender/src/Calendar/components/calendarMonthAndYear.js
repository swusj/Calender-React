import React from "react";
import { NUM_OF_MONTH_YEAR_ROW_ITEM, NUM_OF_MONTH_YEAR_ITEM, NUM_OF_NEAR_YEARS, MONTH_NUM_OF_YEAR, ITEM_STATE } from "../config.js";

import { group, getPrevYear, getNextYear, getPrevTenYear, getNextTenYear } from "../utils.js";

class CalendarMonthOrYearItem extends React.Component {
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
        itemClass = "month-and-year-light";
        break;
      default:
        break;
    }
    return (
      <div
        className={`calendar-main-tbody-row-item-month ${itemClass}`}
        onClick={() => {
          this.props.handleItemClick(this.props.date);
        }}
      >
        {this.props.date}
      </div>
    );
  }
}

class CalendarMonth extends React.Component {
  constructor(props) {
    super(props);
  }
  renderRow(rowData, key) {
    return (
      <div className="calendar-main-tbody-row" key={key}>
        {rowData.map((item) => {
          return (
            <CalendarMonthOrYearItem
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
    const monthData_now = createMonthData(this.props.showDate, this.props.todayDate);
    const monthData_prev = createMonthData(getPrevYear(this.props.showDate.year, this.props.showDate.month), this.props.todayDate);
    const monthData_next = createMonthData(getNextYear(this.props.showDate.year, this.props.showDate.month), this.props.todayDate);
    let groupMonthData_now = group(monthData_now, NUM_OF_MONTH_YEAR_ROW_ITEM);
    let groupMonthData_prev = group(monthData_prev, NUM_OF_MONTH_YEAR_ROW_ITEM);
    let groupMonthData_next = group(monthData_next, NUM_OF_MONTH_YEAR_ROW_ITEM);
    return (
      <div className="calendar-main-tbody-month-and-year">
        <div className="carousel-month-and-year" ref={this.props.calendarMonthAndYearRef}>
          {groupMonthData_prev.map((row, index) => {
            return this.renderRow(row, index);
          })}
          {groupMonthData_now.map((row, index) => {
            return this.renderRow(row, index);
          })}
          {groupMonthData_next.map((row, index) => {
            return this.renderRow(row, index);
          })}
        </div>
      </div>
    );
  }
}

// 求一年的月历数据
function createMonthData(showDate, todayDate) {
  let monthData = [];
  for (let i = 0; i < NUM_OF_MONTH_YEAR_ITEM; i++) {
    // 如果当年
    if (i < MONTH_NUM_OF_YEAR) {
      // 如果当月
      if (showDate.year === todayDate.year && i === todayDate.month) {
        monthData.push({ date: `${i + 1}月`, state: ITEM_STATE.CURRENT });
      } else {
        monthData.push({ date: `${i + 1}月`, state: ITEM_STATE.MIDDLE });
      }
    } else {
      monthData.push({
        date: `${(i % MONTH_NUM_OF_YEAR) + 1}月`,
        state: ITEM_STATE.NEARLY,
      });
    }
  }
  return monthData;
}

class CalendarYear extends React.Component {
  constructor(props) {
    super(props);
  }
  renderRow(rowData, key) {
    return (
      <div className="calendar-main-tbody-row" key={key}>
        {rowData.map((item) => {
          return (
            <CalendarMonthOrYearItem
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
    const yearData_now = createYearData(this.props.showDate, this.props.todayDate);
    const yearData_prev = createYearData(getPrevTenYear(this.props.showDate.year, this.props.showDate.month), this.props.todayDate);
    const yearData_next = createYearData(getNextTenYear(this.props.showDate.year, this.props.showDate.month), this.props.todayDate);
    let groupYearData_now = group(yearData_now, NUM_OF_MONTH_YEAR_ROW_ITEM);
    let groupYearData_prev = group(yearData_prev, NUM_OF_MONTH_YEAR_ROW_ITEM);
    let groupYearData_next = group(yearData_next, NUM_OF_MONTH_YEAR_ROW_ITEM);
    return (
      <div className="calendar-main-tbody-month-and-year">
        <div className="carousel-month-and-year" ref={this.props.calendarMonthAndYearRef}>
          {groupYearData_prev.map((row, index) => {
            return this.renderRow(row, index);
          })}
          {groupYearData_now.map((row, index) => {
            return this.renderRow(row, index);
          })}
          {groupYearData_next.map((row, index) => {
            return this.renderRow(row, index);
          })}
        </div>
      </div>
    );
  }
}

// 求十年的年历数据
function createYearData(showDate, todayDate) {
  let yearData = [];
  const INDEX = [3, 0, 1, 2];
  let leftYear = showDate.year - (showDate.year % NUM_OF_NEAR_YEARS); // 十年区间的第一年
  let leftYearIndex = INDEX[leftYear % NUM_OF_MONTH_YEAR_ROW_ITEM]; // // 十年区间的第一年的位置
  const firstYear = leftYear - leftYearIndex; // 日历显示第一年
  for (let i = 0; i < NUM_OF_MONTH_YEAR_ITEM; i++) {
    // 如果当十年
    if (i >= leftYearIndex && i < leftYearIndex + NUM_OF_NEAR_YEARS) {
      // 如果当年
      if (showDate.year === todayDate.year && firstYear + i === todayDate.year) {
        yearData.push({ date: firstYear + i, state: ITEM_STATE.CURRENT });
      } else {
        yearData.push({ date: firstYear + i, state: ITEM_STATE.MIDDLE });
      }
    } else {
      yearData.push({
        date: firstYear + i,
        state: ITEM_STATE.NEARLY,
      });
    }
  }
  return yearData;
}

export { CalendarMonth, CalendarYear };
