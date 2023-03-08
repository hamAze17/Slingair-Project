import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import GlobalStyles from "./GlobalStyles";
import User from "./User";
import Flight from "./Flight";
import Reservations from "./Reservations";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Flight />
      <Main>
        <Switch>
          <Route exact path="/">
            <SeatSelect />
            {/* <User /> */}
          </Route>
          <Route exact path="/confirmed">
            <Confirmation />
            {/* add other routes here   */}
          </Route>
          <Route exact path="/Profile">
            <h1>Profile</h1>
            {/* add other routes here   */}
          </Route>
          <Route path="">
            <Reservations />
          </Route>

          {/* <Route path="">404: Oops!</Route> */}
        </Switch>
        <Footer />
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: var(--color-orange);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
`;

export default App;
