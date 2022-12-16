import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/context";
import listsAPI from "../services/listsAPI";
import "../assets/css/ListMove.css";

const ListMove = props => {
    const context = useAppContext();
    const currentPosition = context.lists.filter(list => list.id === props.listId)[0].pos;
    const [newPosition, setNewPosition] = useState(currentPosition);

    const generateOptions = () => 
        context.lists.map((list, index) => 
            <option value={list.pos}>
                {index + 1}{list.id === props.listId && " (current)"}
            </option>)

    const handleMove = () => {
        if (newPosition === currentPosition)
            return ;
        console.log(`Moving list to position: ${newPosition}`);
        props.setToggleMove(false);
    }

    return (
        <div className="lists__move">
            <div className="lists__move-select">
                <label>Position:</label>
                <select className="lists__move-options" 
                    defaultValue={currentPosition}
                    onChange={event => setNewPosition(event.target.value)}>
                    {generateOptions()}
                </select>
            </div>
            <button className="lists__move-btn" onClick={handleMove}>Move</button>
        </div>
    );
}

export default ListMove;