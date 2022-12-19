import { useState } from "react";
import { useAppContext } from "../context/context";
import moveList from "../utils/moveList";
import "../assets/css/ListMove.css";

const ListMove = props => {
    const context = useAppContext();
    const boardLists = context.lists.filter(list => list.idBoard === props.boardId);
    const currentPosition = boardLists.filter(list => list.id === props.listId)[0].pos;
    const [targetPosition, setTargetPosition] = useState(currentPosition);

    const generateOptions = () => 
        boardLists.map((list, index) => 
            <option key={list.pos} value={list.pos}>
                {index + 1}{list.id === props.listId && " (current)"}
            </option>)

    const handleMoveClick = async () => {
        await moveList(currentPosition, targetPosition, 
                props.listId, props.boardId, context.keys.apiKey, 
                context.keys.token, context.lists, context.setLists);
        props.setToggleMove(false);
    }

    return (
        <div className="lists__move">
            <div className="lists__move-controls">
                <i className="fa-solid fa-arrow-left lists__move-controls-back" onClick={() => {
                    props.setToggleMove(false)
                    props.setToggleMenu(true)
                    }}>
                </i>
                <p>Move list</p>
                <i className="fa-solid fa-plus lists__move-controls-close" onClick={() => props.setToggleMove(false)}></i>
            </div>
            <div className="lists__move-select">
                <label>Position:</label>
                <select className="lists__move-options" 
                    defaultValue={currentPosition}
                    onChange={event => setTargetPosition(parseFloat(event.target.value))}>
                    {generateOptions()}
                </select>
            </div>
            <button className="lists__move-btn" onClick={handleMoveClick}>Move</button>
        </div>
    );
}

export default ListMove;