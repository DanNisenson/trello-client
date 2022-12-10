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

    const handleKeyPress = event => {
        if (event.key === "Escape")
            setToggleEdit(!toggleEdit);
        else if (event.key === "Enter")
            updateListName();
    }

    return (
        <>
            {toggleEdit ?
                <div className="lists__name-edit">
                    <input className="lists__name-edit-input" type="text" value={listName}
                        onChange={event => setListName(event.target.value)}
                        onKeyDown={event => handleKeyPress(event)}></input>
                    <div className="lists__name-edit-btns">
                        <i className="fa-solid fa-check edit-list__go-btn" onClick={updateListName}></i>  
                        <i className="fa-solid fa-plus edit-list__close-btn" onClick={() => setToggleEdit(!toggleEdit)}></i>
                    </div>
                </div>
                :
                <div className="lists__name">
                    <button className="lists__name-title" onClick={() => setToggleEdit(!toggleEdit)}>
                        <p>{listName}</p>
                    </button>
                    <ListMenu listId={props.listId} />
                </div>
            }
        </>
    );
}

export default ListName;