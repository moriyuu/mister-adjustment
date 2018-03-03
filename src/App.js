import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import AppStyledDiv from "./App.style.js";
import StyleVariables from "./components/_styleVariables";

import { handleAuthClick, handleSignoutClick } from "./cal";

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
const Table = styled.table`
  td {
    &:hover {
      background-color: #e3e2e1;
      cursor: pointer;
    }
  }
`;

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

class CalendarInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      frames: [{ start: new Date(), end: new Date() }]
    };
    this.getRecentDays = this.getRecentDays.bind(this);
    this.getAvailableTimeFrames = this.getAvailableTimeFrames.bind(this);
  }

  componentDidMount() {
    this.getRecentDays();
    this.getAvailableTimeFrames(
      30,
      new Date(new Date(new Date().setHours(10)).setMinutes(0)),
      new Date(new Date(new Date().setHours(20)).setMinutes(30))
    );
  }

  /**
   * 明日からの n 日ぶんを取得して days に突っ込む
   * @param {number} n : 直近の日をn日ぶん
   */
  getRecentDays(n = 7) {
    const days = [];
    for (let i = 0; i < n; i++) {
      const now = new Date();
      const day = new Date(now.setDate(now.getDate() + (i + 1)));
      days.push(day);
      // console.log(day.getMonth()+1 + "/" + day.getDate());
    }
    this.setState({ days });
  }

  /**
   * startTime と endTime から、予約可能なフレームを用意する
   * @param {number} n : n分を1フレームとする
   * @param {date} startTime : 時刻をみるために date 型
   * @param {date} endTime : 時刻をみるために date 型
   */
  getAvailableTimeFrames(n, startTime, endTime) {
    const frames = [];
    while (startTime < endTime) {
      frames.push({
        start: new Date(startTime.getTime()),
        end: new Date(startTime.setMinutes(startTime.getMinutes() + n))
      });
    }
    this.setState({ frames });
  }

  render() {
    const { days, frames } = this.state;
    return (
      <Table className="table">
        <thead>
          <tr>
            {days.map((day, index) => (
              <th scope="col">{`${day.getMonth() + 1}/${day.getDate()} ${
                daysOfWeek[day.getDay()]
              }`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {frames.map((f, frameIndex) => (
            <tr>
              {days.map((day, dayIndex) => (
                <td>{`${f.start.getHours()}:${
                  f.start.getMinutes() ? f.start.getMinutes() : "00"
                } -`}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

class App extends Component {
  render() {
    return (
      <AppStyledDiv className="App">
        <Nav className="navbar sticky-top navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="#">
              Mr.
            </a>
            <ul className="navbar-nav my-2 my-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="#" onClick={handleSignoutClick}>
                  Logout
                </a>
              </li>
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
          <CalendarInput />
        </div>
      </AppStyledDiv>
    );
  }
}

export default App;
