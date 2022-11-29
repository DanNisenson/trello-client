import { useState, useEffect } from "react";
import { useAppContext } from "../context/keys";
import axios from "axios";
import Lists from "./Lists";
import "../assets/css/UserBoards.css";

const Board = () => {
  // context.keys -> apiKey & token
  const context = useAppContext();
  // all boards. is it user? workspace? app?
  const [userBoards, setUserBoards] = useState([]);
  // selected board
  const [currentBoard, setCurrentBoard] = useState({});

  // get boards on load
  useEffect(() => {
    const getBoards = async () => {
      const resp = await axios.get(
        `https://api.trello.com/1/members/me/boards?fields=id,name,url&key=${context.keys.apiKey}&token=${context.keys.token}`
      );
      setUserBoards(resp.data);
    };
    getBoards();
  }, []);

  return (
    <>
      {/* boards list */}
      <div className="boards">
        <h1>Boards</h1>
        {userBoards
          .map((e, i) => (
            <div
              className="board-link"
              onClick={() => setCurrentBoard({...e})}
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
