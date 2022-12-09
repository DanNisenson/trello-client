import { useState } from "react";
import { useAppContext } from "../context/context";
import axios from "axios";
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
            const URI = `https://api.trello.com/1/lists/${props.listId}/name?value=${listName}&key=${context.keys.apiKey}&token=${context.keys.token}`;
            const response = await axios.put(URI);
            if (response.status === 200) {
                setListName(response.data.name);
                setToggleEdit(!toggleEdit);
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
                    <ListMenu listId={props.listId} currentLists={props.currentLists} setCurrentLists={props.setCurrentLists}
                        setListCards={props.setListCards}  />
                </div>
            }
        </>
    );
}

export default ListName;