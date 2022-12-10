import { useState } from "react";
import { AppWrapper } from "./context/context.js";
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
