import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import LoggedInUserContextProvider from './helper/LoggedInUserContextProvider';
import GameSettingsContextProvider from './helper/GameSettingsContextProvider';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <App/> wrapped with context providers, to make their context available at any nested component if necessary
  <React.StrictMode>
    <BrowserRouter>
      <LoggedInUserContextProvider>
        <GameSettingsContextProvider>
          <App />
        </GameSettingsContextProvider>
      </LoggedInUserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);