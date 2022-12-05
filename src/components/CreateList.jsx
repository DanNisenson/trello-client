import { useState } from "react";
import { useAppContext } from "../context/keys";
import axios from "axios";
import "../assets/css/CreateList.css";

const CreateList = (props) => {
    const context = useAppContext();
    const [listName, setListName] = useState("");
    const [toggleAddList, setToggleAddList] = useState(false);

    const postNewList = async () => {
        console.log("Send POST request with name: ", listName);
        if (!listName)
            return;
        try {
            const URI = `https://api.trello.com/1/lists?name=${listName}&idBoard=${props.boardId}&pos=bottom&key=${context.keys.apiKey}&token=${context.keys.token}`;
            const response = await axios.post(URI);
            if (response.status === 200) {
                props.setCurrentLists([...props.currentLists, response.data]);
                setToggleAddList(false);
            }
        }
        catch (error) {
            console.log(error.message);
            alert("Unable to create new list");
        }
    }

    return (
        <>
            {toggleAddList ?
                <div className="create-list">
                    <input type="text" placeholder="Enter list title..." onChange={event => setListName(event.target.value)}></input>
                    <div className="create-list__btns-container">
                        <button className="create-list__add-btn" onClick={postNewList}>
                            Add list
                        </button>
                        <i  className="fa-solid fa-plus create-list__close-btn"
                            onClick={() => setToggleAddList(false)}
                        ></i>
                    </div>
                </div>
                :
                <button className="lists__add-list" onClick={() => setToggleAddList(!toggleAddList)}>
                    <i className="fa-solid fa-plus lists__plus-icon "></i>
                    <span>Add another list</span>
                </button>
            }
        </>
    );
}

export default CreateList;