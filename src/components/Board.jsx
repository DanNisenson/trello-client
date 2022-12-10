import { useState, useEffect } from "react";
import { useAppContext } from "../context/context";
import boardAPI from "../services/boardAPI";
import Lists from "./Lists";
import UserBox from "./UserBox";
import "../assets/css/UserBoards.css";

const Board = props => {
    // context.keys -> apiKey & token
    const context = useAppContext();
    // selected board
    const [currentBoard, setCurrentBoard] = useState({});

    // get boards on load
    useEffect(() => {
        const getBoards = async () => {
            try {
                const resp = await boardAPI.getBoards(context.keys.apiKey, context.keys.token);
                context.setBoards(resp.data);
            } catch(error) {
                console.error(error.message);
                alert("Unable to retrieve boards");
            }
        };
        getBoards();
    }, []);

    return (
        <>
            <div className="header">
                {/* boards list */}
                <div className="boards">
                    <h1 className="boards__title">Boards</h1>
                    {context.boards
                        .map((e, i) => (
                            <div
                                className="boards__link"
                                onClick={() => setCurrentBoard(e)}
                                key={i}
                            >
                                {e.name}
                            </div>
                        ))}
                </div>
                <UserBox setIsAuthorized={props.setIsAuthorized} />
            </div>
            {/* if currentBoard === true -> render lists and cards */}
            {Object.keys(currentBoard).length !== 0 && <Lists boardId={currentBoard.id} />}
        </>
    );
};

export default Board;
