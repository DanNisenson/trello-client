import { useState } from "react";
import { useAppContext } from "../context/keys";
import axios from "axios";
import Cards from "./Cards";
import Card from "./ShowedCard/Card";
import "../assets/css/Lists.css";
import "../assets/css/Card/Card.css";
import CreateCard from "./CreateCard";

const SingleList = (props) => {
    //state and function to show a card
    const [currentCard, setCurrentCard] = useState(null)
    const [addCard, setAddCard] = useState(false);
    //state to store list name
    const [listName, setListName] = useState(props.list.name);
    //state to toggle editable Name
    const [toggleEdit, setToggleEdit] = useState(false);


    const updateListName = async () => {
        if (!listName)
            return ;
        try {
            const URI = `https://api.trello.com/1/lists/${props.list.id}/name?value=${listName}&key=${context.keys.apiKey}&token=${context.keys.token}`;
            console.log(URI);
            const response = await axios.put(URI);
            console.log(response);
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
    //name should become an input on click, for update
    return (
        <>
            <div className="lists__list">
                <div className="lists__name">
                        {toggleEdit ?
                            <>
                                <input id={`input-${props.list.id}`} type="text" value={listName} onChange={event => setListName(event.target.value)}></input>
                                <i class="fa-solid fa-check" onClick={updateListName}></i>
                            </>
                            :
                            <>
                                <p>{listName}</p>
                                <i className="fa-solid fa-pen-to-square" onClick={() => setToggleEdit(!toggleEdit)}></i>
                            </>
                        }
                    </div>
                <Cards currentCards={props.currentCards} listId={props.list.id} showCard={setCurrentCard} />
                {addCard ? (
                        <CreateCard setAddCard={setAddCard} idList={props.list.id} />
                    ) : (
                        <button className="lists__add-card" onClick={() => setAddCard(!addCard)}>
                        <i className="fa-solid fa-plus lists__plus-icon "></i>
                        <span>Add a card</span>
                        </button>
                    )}
            </div>
            {currentCard ? <div className="card"> <Card currentCard={currentCard} showCard={setCurrentCard} /> </div> : null}          
        </>
    );
}

export default SingleList;
