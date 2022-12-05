import { useState } from "react";
import { AppWrapper } from "./context/keys.js";
import Board from "./components/Board";
import Authorize from "./components/Authorize";
import "./assets/css/App.css";

function App() {
    const [isAuthorized, setIsAuthorized] = useState(false);

    return (
        // context variables
        <AppWrapper>
            <div className="App">
                {isAuthorized ? <Board /> : <Authorize isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />}
            </div>
        </AppWrapper>
    );
}

export default App;

// Personal Key:
// 1a9b6e88add0383f3d5cdc6764833c2a

// Token
// c3ca793d64d00d0f3759b6c148fa44f7567cff71a7ebf1d585247d00a2d49f11
