import React, { Component } from "react";
import gapi from "gapi-client";
import styled from "styled-components";
import "./App.css";
import AppStyledDiv from "./App.style.js";
import StyleVariables from "./components/_styleVariables";

import {
  handleAuthClick,
  handleSignoutClick,
  handleClientLoad,
  listUpcomingEvents
} from "./cal";

const Nav = styled.nav`
  background-color: rgba(255, 67, 48, 0.88) !important;
  a {
    color: #fff !important;
    &.navbar-brand {
      font-weight: 800 !important;
    }
  }
`;
const Jumbotron = styled.div`
  background-color: ${StyleVariables.color.gray.light};
`;
const StyledTd = styled.td`
  ${props =>
    props.isAvailable
      ? `
    &:hover {
      background-color: #e3e2e1;
      cursor: pointer;
    }`
      : `
    opacity: 0.25;
    background-color:#ccc;
    `};
`;

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

class CalendarInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [
        {
          day: 0,
          frames: [{ start: new Date(), end: new Date(), isAvailable: true }]
        }
      ]
    };
    this.getRecentDaysWithFrames = this.getRecentDaysWithFrames.bind(this);
    this.getAvailableTimeFramesBySetting = this.getAvailableTimeFramesBySetting.bind(
      this
    );
    this.getAvailableTimeFramesByCal = this.getAvailableTimeFramesByCal.bind(
      this
    );
  }

  componentDidMount() {
    this.getRecentDaysWithFrames();
  }

  componentDidUpdate(prevProps, prevState) {
    const { events } = this.props;
    if (prevProps.events.length === 0 && events.length !== 0) {
      this.getAvailableTimeFramesByCal(events);
    }
  }

  /**
   * 明日からの n 日ぶんを取得して days に突っ込む
   * @param {number} n : 直近の日を n 日ぶん
   */
  getRecentDaysWithFrames(n = 7) {
    const days = [];
    for (let i = 0; i < n; i++) {
      const now = new Date(new Date().setSeconds(0, 0));
      const day = now.setDate(now.getDate() + i + 1);
      const frames = this.getAvailableTimeFramesBySetting(
        30,
        new Date(day).setHours(10, 0),
        new Date(day).setHours(19, 30)
      );

      days.push({ day, frames });
    }
    this.setState({ days });
  }

  /**
   *
   * @param {number} n : n 分を1フレームとする
   * @param {number} startTime : 設定された予約可能開始時刻
   * @param {number} endTime : 設定された予約可能終了時刻
   */
  getAvailableTimeFramesBySetting(n, startTime, endTime) {
    let frames = [];
    let start = new Date(startTime); // date
    while (start < endTime) {
      const frame = {
        start: start.getTime(), // number
        end: start.setMinutes(start.getMinutes() + n), // number
        isAvailable: true
      };
      frames.push(frame);
      start = new Date(frame.end); // date
    }
    return frames;
  }

  getAvailableTimeFramesByCal(events) {
    const { days } = this.state;
    days.forEach((d, index) => {
      d.frames.forEach((f, index) => {
        events.forEach((e, index) => {
          if (!(f.end <= e.start || e.end <= f.start)) {
            f.isAvailable = false;
            console.log("false", f);
          }
        });
      });
    });
    this.setState({ days });
  }

  render() {
    const { days } = this.state;
    console.log("でいず", days);

    const FrameTds = props => {
      const startTime = new Date(days[0].frames[props.index].start);
      return days.map((d, index) => (
        <StyledTd
          key={index}
          isAvailable={d.frames[props.index].isAvailable}
          className={d.frames[props.index].isAvailable.toString()}
        >
          {startTime.getHours()}:{startTime.getMinutes() || "00"} -
        </StyledTd>
      ));
    };

    return (
      <table className="table table-sm">
        <thead>
          <tr>
            {days.map((d, index) => (
              <th key={index} scope="col">
                {new Date(d.day).getMonth() + 1}/
                {new Date(d.day).getDate()}{" "}
                {daysOfWeek[new Date(d.day).getDay()]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days[0].frames.map((f, index) => (
            <tr key={index}>
              <FrameTds index={index} />
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isSignedIn: false, events: [] };

    handleClientLoad(obj => this.setState(obj));
  }

  async componentDidUpdate() {
    const { isSignedIn, events } = this.state;
    if (isSignedIn && !events.length) {
      listUpcomingEvents().then(res => this.setState({ events: res }));
    }
  }

  render() {
    const { isSignedIn, events } = this.state;
    return (
      <AppStyledDiv className="App">
        <Nav className="navbar sticky-top navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="#">
              Mr. A
            </a>
            <ul className="navbar-nav my-2 my-lg-0">
              {isSignedIn && (
                <li className="nav-item active">
                  <a className="nav-link" href="#" onClick={handleSignoutClick}>
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        </Nav>
        <Jumbotron className="jumbotron">
          <h1 className="display-4">Mr. Adjustment</h1>
          {/* <p className="lead">
            Google Calendar のアカウントを紐付けるだけで日程を簡単に調整さん
          </p> */}
          <hr className="my-4" />
          <p>
            Google Calendar のアカウントを紐付けるだけで簡単に日程を調整さん
          </p>
          <p className="lead">
            <a
              className="btn btn-primary btn-lg"
              href="#"
              role="button"
              onClick={handleAuthClick}
            >
              Google Login
            </a>
          </p>
        </Jumbotron>
        <pre
          id="content"
          style={{
            textAlign: "right",
            maxWidth: "400px",
            margin: "0 auto"
          }}
        />
        <div className="container">
          <CalendarInput events={events} />
        </div>
      </AppStyledDiv>
    );
  }
}

export default App;
