import React, { Component } from "react";
import StartPage from "./pages/start.js";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";

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
        </MainContainer>
      </BrowserRouter>
    );
  }
}

export default App;
