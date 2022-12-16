import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppWrapper } from "./context/context.js";
import Board from "./components/Board";
import Authorize from "./components/Authorize";
import "./assets/css/App.css";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    // context variables
    <AppWrapper>
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          {isAuthorized ? (
            <Board setIsAuthorized={setIsAuthorized} />
          ) : (
            <Authorize
              isAuthorized={isAuthorized}
              setIsAuthorized={setIsAuthorized}
            />
          )}
        </div>
      </DndProvider>
    </AppWrapper>
  );
}

export default App;
