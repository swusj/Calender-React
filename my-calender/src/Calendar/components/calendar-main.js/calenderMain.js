import React from 'react';
import { WEEK } from '../../config';
import CalendarDay from './calendar-day/calendarDay';
import { CalendarMonth, CalendarYear } from './calendar-month-year/calendarMonthAndYear';
import { SHOWING_STATE, DIRECTION } from '../../config.js';
import CalenderCaption from './calendar-caption/calendarCaption';
import './calendarMain.scss';
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';

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
    this.state = {
      isOn: true,
    };
  }
  render() {
    let tbody = null;
    console.log(111);
    switch (this.props.curState) {
      case SHOWING_STATE.DAY:
        tbody = (
          <>
            <div className="calendar-main-tbody-row">
              <CalenderColGroup />
            </div>
            <TransitionGroup
              childFactory={(child) => React.cloneElement(child, { classNames: this.props.scrollDirection })}
              className="calendar-main-tbody-daycontainer"
            >
              <CSSTransition timeout={200} key={this.props.showDate.month} classNames="next">
                <CalendarDay
                  showDate={this.props.showDate}
                  todayDate={this.props.todayDate}
                  handleItemClick={(data) => {
                    this.props.handleItemClick(data);
                  }}
                />
              </CSSTransition>
            </TransitionGroup>
          </>
        );
        break;
      case SHOWING_STATE.MONTH:
        tbody = (
          <TransitionGroup
            childFactory={(child) => React.cloneElement(child, { classNames: this.props.scrollDirection })}
            className="calendar-main-tbody-monthyearcontainer"
          >
            <CSSTransition timeout={200} key={this.props.showDate.year} classNames="next">
              <CalendarMonth
                showDate={this.props.showDate}
                todayDate={this.props.todayDate}
                handleItemClick={(data) => {
                  this.props.handleItemClick(data);
                }}
              />
            </CSSTransition>
          </TransitionGroup>
        );
        break;
      case SHOWING_STATE.YEAR:
        tbody = (
          <TransitionGroup
            childFactory={(child) => React.cloneElement(child, { classNames: this.props.scrollDirection })}
            className="calendar-main-tbody-monthyearcontainer"
          >
            <CSSTransition timeout={200} key={this.props.showDate.year} classNames="next">
              <CalendarYear
                showDate={this.props.showDate}
                todayDate={this.props.todayDate}
                handleItemClick={(data) => {
                  this.props.handleItemClick(data);
                }}
              />
            </CSSTransition>
          </TransitionGroup>
        );
        break;
      default:
        break;
    }
    return (
      <div>
        <TransitionGroup childFactory={(child) => React.cloneElement(child, { classNames: this.props.switchDirection })}>
          <CSSTransition timeout={400} key={this.props.curState}>
            <div className="calendar-main-tbody">{tbody}</div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

class CalenderMain extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
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
          switchDirection={this.props.switchDirection}
          scrollDirection={this.props.scrollDirection}
        />
      </div>
    );
  }
}

export default CalenderMain;
