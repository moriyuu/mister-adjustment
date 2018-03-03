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

class CalendarInput extends Component {
  componentDidMount() {
    // 明日からの7日ぶんを取得して week に突っ込む
    const week = [];
    for (let i = 0; i < 7; i++) {
      const now = new Date();
      const day = new Date(now.setDate(now.getDate() + (i + 1)));
      week.push(day);
      // console.log(day.getMonth()+1 + "/" + day.getDate());
    }
    // console.log(week)
  }
  
  render() {
    return (
      <table className="table table-hover" style={{ margin: "0 auto" }}>
        <thead>
          <tr>
            <th scope="col">03/11</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10:00 - 10:30</td>
          </tr>
          <tr>
            <td>10:30 - 11:00</td>
          </tr>
          <tr>
            <td>10:00 - 10:30</td>
          </tr>
          <tr>
            <td>10:00 - 10:30</td>
          </tr>
          <tr>
            <td>10:00 - 10:30</td>
          </tr>
          <tr>
            <td>10:00 - 10:30</td>
          </tr>
          <tr>
            <td>10:00 - 10:30</td>
          </tr>
          <tr>
            <td>10:00 - 10:30</td>
          </tr>
          <tr>
            <td>10:00 - 10:30</td>
          </tr>
          <tr>
            <td>10:00 - 10:30</td>
          </tr>
        </tbody>
      </table>
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
        <CalendarInput />
      </AppStyledDiv>
    );
  }
}

export default App;
