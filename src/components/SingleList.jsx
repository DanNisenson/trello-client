import { useState } from "react";
import { useAppContext } from "../context/keys";
import axios from "axios";
import ListName from "./ListName";
import Cards from "./Cards";
import Card from "./ShowedCard/Card";
import "../assets/css/Lists.css";
import "../assets/css/Card/Card.css";
import CreateCard from "./CreateCard";

const SingleList = (props) => {
    const context = useAppContext();
    //state and function to show a card
    const [currentCard, setCurrentCard] = useState(null)
    const [addCard, setAddCard] = useState(false);

    //name should become an input on click, for update
    return (
        <>
            <div className="lists__list">
                <ListName name={props.list.name} listId={props.list.id} />
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
