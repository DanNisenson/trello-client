import { useState } from "react";
import { useAppContext } from "../context/context";
import listsAPI from "../services/listsAPI";
import "../assets/css/ListMove.css";

const ListMove = props => {
    const context = useAppContext();
    const boardLists = context.lists.filter(list => list.idBoard === props.boardId);
    const currentPosition = boardLists.filter(list => list.id === props.listId)[0].pos;
    const [newPosition, setNewPosition] = useState(currentPosition);

    const generateOptions = () => 
        boardLists.map((list, index) => 
            <option key={list.pos} value={list.pos}>
                {index + 1}{list.id === props.listId && " (current)"}
            </option>)

    const generateCallPosition = targetPosition => {
        let targetIndex = -1;
        for (let i = 0; i < boardLists.length; i++) {
            if (boardLists[i].pos === targetPosition) {
                targetIndex = i;
                break;
            }
        }
        if (targetIndex === 0)
            return ("top");
        if (targetIndex === boardLists.length - 1)
            return ("bottom");
        if (targetPosition > currentPosition)
            return ((boardLists[targetIndex].pos + boardLists[targetIndex + 1].pos) / 2);
        return ((boardLists[targetIndex].pos + boardLists[targetIndex - 1].pos) / 2);
    }

    const handleMove = async () => {
        if (newPosition !== currentPosition)
        {
            const callPosition = generateCallPosition(newPosition);
            try {
                const response = await listsAPI.updateListPosition(context.keys.apiKey, context.keys.token, props.listId, callPosition);
                if (response.status === 200) {
                    const newLists = context.lists.map(list => {
                        list.pos = list.id === props.listId ? response.data.pos : list.pos
                        return list}
                    ).sort((a , b) => a.pos - b.pos);
                    context.setLists(newLists);
                }
            }
            catch (error) {
                console.log(error.message);
                alert("Unable to update list position");
            }
        }
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
                    onChange={event => setNewPosition(parseFloat(event.target.value))}>
                    {generateOptions()}
                </select>
            </div>
            <button className="lists__move-btn" onClick={handleMove}>Move</button>
        </div>
    );
}

export default ListMove;