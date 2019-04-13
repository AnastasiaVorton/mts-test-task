import React, { Component } from "react";
import ReactDOM from "react-dom";
import StartPage from "./pages/start/start.js";
import styled from "styled-components";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainContainer>
          <StartPage />
          {/* <Switch>
            <Route path="/download" component={CharactersList} />
            <Route path="/character/:id" component={CharacterDetails} />
            <Redirect from="*" to="/characters" />
          </Switch> */}
        </MainContainer>
      </BrowserRouter>
    );
  }
}

export default App;
