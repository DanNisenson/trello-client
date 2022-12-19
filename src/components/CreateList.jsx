import { useState, useEffect } from "react";
import { useAppContext } from "../context/context";
import listsAPI from "../services/listsAPI";
import "../assets/css/CreateList.css";

const CreateList = (props) => {
    const context = useAppContext();
    const [listName, setListName] = useState("");
    const [toggleAddList, setToggleAddList] = useState(false);

    //If board is changed while form is mounted, unmount it
    useEffect(() => {
        if (toggleAddList)
            setToggleAddList(!toggleAddList);
    }, [props.boardId]);

    const postNewList = async () => {
        if (!listName)
            return;
        try {
            const response = await listsAPI.createList(context.keys.apiKey,context.keys.token, listName, props.boardId);
            if (response.status === 200) {
                context.setLists([...context.lists, response.data]);
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
                    <input type="text" autoFocus placeholder="Enter list title..." onChange={event => setListName(event.target.value)}></input>
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