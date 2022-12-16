import { useState } from "react";
import { useAppContext } from "../context/context";
import listsAPI from "../services/listsAPI";
import ListMenu from "./ListMenu";
import "../assets/css/ListName.css";

const ListName = props => {
    const context = useAppContext();
    //state to store list name
    const [listName, setListName] = useState(props.name);
    //state to toggle editable Name
    const [toggleEdit, setToggleEdit] = useState(false);
    let preEditName = props.name;

    const updateListName = async () => {
        if (!listName)
            return;
        try {
            const response = await listsAPI.updateListName(context.keys.apiKey, context.keys.token, props.listId, listName);
            if (response.status === 200) {
                setToggleEdit(!toggleEdit);
                const newLists = context.lists.map(list => {
                    list.name = list.id === props.listId ? response.data.name : list.name
                    return list}
                );
                context.setLists(newLists);
                setListName(response.data.name);
            }
        }
        catch (error) {
            console.log(error.message);
            alert("Unable to update list name");
        }
    }

    const handleEditCancel = () => {
        setListName(preEditName);
        setToggleEdit(!toggleEdit);
    }

    const handleKeyPress = event => {
        if (event.key === "Escape")
            handleEditCancel();
        else if (event.key === "Enter")
            updateListName();
    }

    return (
        <>
            {toggleEdit ?
                <div className="lists__name-edit">
                    <input className="lists__name-title lists__name-edit-input" type="text" autoFocus value={listName}
                        onChange={event => setListName(event.target.value)}
                        onKeyDown={event => handleKeyPress(event)}></input>
                    <div className="lists__name-edit-btns">
                        <i className="fa-solid fa-check edit-list__go-btn" onClick={updateListName}></i>  
                        <i className="fa-solid fa-plus edit-list__close-btn" onClick={() => handleEditCancel()}></i>
                    </div>
                </div>
                :
                <div className="lists__name">
                    <button className="lists__name-title"
                        onClick={() => {
                            preEditName = listName;
                            setToggleEdit(!toggleEdit)}
                        }
                    >
                        <p>{listName}</p>
                    </button>
                    <ListMenu listId={props.listId} boardId={props.boardId} />
                </div>
            }
        </>
    );
}

export default ListName;