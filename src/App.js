import React, { useState, useEffect } from "react";
import "./App.css";
import UserBoards from "./components/UserBoards";
import { AppWrapper } from "./context/keys.js";

function App() {

  return (
    // context variables
    <AppWrapper>
      <div className="App">
        <UserBoards />
      </div>
    </AppWrapper>
  );
}

export default App;

// Personal Key:
// 1a9b6e88add0383f3d5cdc6764833c2a

// Token
// c3ca793d64d00d0f3759b6c148fa44f7567cff71a7ebf1d585247d00a2d49f11
