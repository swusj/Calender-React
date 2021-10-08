import React from 'react';
import './index.scss';
import { getPrevMonth, getPrevYear, getPrevTenYear, getNextMonth, getNextYear, getNextTenYear, getTimestamp } from './utils.js';
import { SCROLL_DIRECTION, SHOWING_STATE, SWITCH_DIRECTION } from './config.js';
import CalenderHeader from './components/calendar-head.js/calenderHead';
import CalenderMain from './components/calendar-main.js/calenderMain';
import CalendarTop from './components/calendar-top/calendarTop';

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
      switchDirection: '',
      scrollDirection: '',
    };
    this.state.showDate = Object.assign({}, this.state.todayDate);
    // 整个日历组件DOM,拿来拖拽用
    this.calendarRef = React.createRef();
  }
  // 点击x历头的处理函数
  forwordTransition() {
    switch (this.state.curState) {
      case SHOWING_STATE.DAY:
        this.setState({ curState: SHOWING_STATE.MONTH, switchDirection: SWITCH_DIRECTION.FORWARD });
        break;
      case SHOWING_STATE.MONTH:
        this.setState({ curState: SHOWING_STATE.YEAR, switchDirection: SWITCH_DIRECTION.FORWARD });
        break;
      case SHOWING_STATE.YEAR:
        break;
      default:
        break;
    }
  }
  // 点击上箭头的处理函数
  handleClickPrev() {
    switch (this.state.curState) {
      case SHOWING_STATE.DAY:
        this.setState({
          showDate: Object.assign(this.state.showDate, getPrevMonth(this.state.showDate.year, this.state.showDate.month)),
        });
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
    this.setState({ scrollDirection: SCROLL_DIRECTION.PREV });
  }
  // 点击下箭头的处理函数
  handleClickNext() {
    switch (this.state.curState) {
      case SHOWING_STATE.DAY:
        this.setState({
          showDate: Object.assign(this.state.showDate, getNextMonth(this.state.showDate.year, this.state.showDate.month)),
        });
        break;
      case SHOWING_STATE.MONTH:
        this.setState({
          showDate: Object.assign(this.state.showDate, getNextYear(this.state.showDate.year, this.state.showDate.month)),
        });
        break;
      case SHOWING_STATE.YEAR:
        this.setState({
          showDate: Object.assign(this.state.showDate, getNextTenYear(this.state.showDate.year, this.state.showDate.month)),
        });
        break;
      default:
        break;
    }
    this.setState({ scrollDirection: SCROLL_DIRECTION.NEXT });
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
          },
          curState: SHOWING_STATE.DAY,
          switchDirection: SWITCH_DIRECTION.REVERSE,
        });
        break;
      case SHOWING_STATE.YEAR:
        const year = Number(data);
        this.setState({
          showDate: {
            year: year,
            month: this.state.showDate.month,
            date: this.state.showDate.date,
          },
          curState: SHOWING_STATE.MONTH,
          switchDirection: SWITCH_DIRECTION.REVERSE,
        });
        break;
      default:
        break;
    }
  }

  // 点击顶部蓝字的处理函数
  init() {
    if (this.state.curState === SHOWING_STATE.MONTH) {
      this.setState({
        showDate: Object.assign({}, this.state.todayDate),
        curState: SHOWING_STATE.DAY,
        switchDirection: SWITCH_DIRECTION.REVERSE,
        scrollDirection: '',
      });
    } else {
      this.setState({
        showDate: Object.assign({}, this.state.todayDate),
        curState: SHOWING_STATE.DAY,
        switchDirection: SWITCH_DIRECTION.SKIP,
        scrollDirection: '',
      });
    }
  }

  // 点击右上角叉叉的处理函数
  handleClickClose() {
    this.setState({ isShow: false });
  }

  render() {
    return (
      <>
        {this.state.isShow && (
          <div className="calendar" ref={this.calendarRef}>
            <CalendarTop
              handleClickClose={() => {
                this.handleClickClose();
              }}
              dragDom={this.calendarRef}
            />
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
              switchDirection={this.state.switchDirection}
              scrollDirection={this.state.scrollDirection}
            />
          </div>
        )}
      </>
    );
  }
}

export default Calender;
