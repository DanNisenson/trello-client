import { useState, useEffect } from "react";
import { useAppContext } from "../context/context";
import boardAPI from "../services/boardAPI";
import Lists from "./Lists";
import "../assets/css/UserBoards.css";

const Board = () => {
  // context.keys -> apiKey & token
  const context = useAppContext();
  // selected board
  const [currentBoard, setCurrentBoard] = useState({});

  // get boards on load
  useEffect(() => {
    const getBoards = async () => {
      const resp = await boardAPI.getBoards(context.keys.apiKey, context.keys.token);
      context.setBoards(resp.data);
    };
    getBoards();
  }, []);

  return (
    <>
      {/* boards list */}
      <div className="boards">
        <h1>Boards</h1>
        {context.boards
          .map((e, i) => (
            <div
              className="board-link"
              onClick={() => setCurrentBoard(e)}
              key={i}
            >
              {e.name}
            </div>
          ))
          .reverse()}
      </div>
      {/* if currentBoard === true -> render lists and cards */}
      {Object.keys(currentBoard).length !== 0 && <Lists boardId={currentBoard.id} />}
    </>
  );
};

export default Board;
