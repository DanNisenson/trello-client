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
            <option key={list.pos} value={list.pos}>
                {index + 1}{list.id === props.listId && " (current)"}
            </option>)

    const generateCallPosition = targetPosition => {
        let targetIndex = -1;
        for (let i = 0; i < context.lists.length; i++) {
            if (context.lists[i].pos === targetPosition) {
                targetIndex = i;
                break;
            }
        }
        if (targetIndex === 0)
            return ("top");
        if (targetIndex === context.lists.length - 1)
            return ("bottom");
        if (targetPosition > currentPosition)
            return ((context.lists[targetIndex].pos + context.lists[targetIndex + 1].pos) / 2);
        return ((context.lists[targetIndex].pos + context.lists[targetIndex - 1].pos) / 2);
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