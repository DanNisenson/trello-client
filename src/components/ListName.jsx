import { useState } from "react";
import { useAppContext } from "../context/keys";
import axios from "axios";
import "../assets/css/Lists.css";

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

    return (
        <div className="lists__name">
            {toggleEdit ?
                <>
                    <input type="text" value={listName} onChange={event => setListName(event.target.value)}></input>
                    <i className="fa-solid fa-check" onClick={updateListName}></i>
                </>
                :
                <>
                    <p>{listName}</p>
                    <i className="fa-solid fa-pen-to-square" onClick={() => setToggleEdit(!toggleEdit)}></i>
                </>
            }
        </div>
    );
}

export default ListName;