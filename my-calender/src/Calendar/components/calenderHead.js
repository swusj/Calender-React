import React from "react";
// import "../index.scss";
import { createClockStr } from "../time.js";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clockStr: "" };
  }

  changeTime() {
    this.setState({
      clockStr: createClockStr(this.props.isNeedZero),
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.changeTime();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div className="calendar-header-clock">{this.state.clockStr}</div>;
  }
}

class CalenderHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const headStr = `${this.props.todayDate.year}年${this.props.todayDate.month + 1}月${this.props.todayDate.date}日`;

    return (
      <div className="calendar-header">
        <Clock isNeedZero={this.props.isNeedZero} />
        <div className="calendar-header-todaytime" onClick={this.props.init}>
          {headStr}
        </div>
      </div>
    );
  }
}

export default CalenderHeader;
