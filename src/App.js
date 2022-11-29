import { AppWrapper } from "./context/keys.js";
import Board from "./components/Board";
import "./assets/css/App.css";

function App() {
  return (
    // context variables
    <AppWrapper>
      <div className="App">
        {/* main view */}
        <Board />
      </div>
    </AppWrapper>
  );
}

export default App;

// Personal Key:
// 1a9b6e88add0383f3d5cdc6764833c2a

// Token
// c3ca793d64d00d0f3759b6c148fa44f7567cff71a7ebf1d585247d00a2d49f11
