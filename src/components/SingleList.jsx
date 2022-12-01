import { useState, useEffect } from "react";
//import { useAppContext } from "../context/keys";
//import axios from "axios";
import Cards from "./Cards";
import Card from "./ShowedCard/Card";
import "../assets/css/Lists.css";
import "../assets/css/Card/Card.css"

const SingleList = (props) => {
    //state and function to show a card
    const [currentCard, SetcurrentCard] = useState(null)
    const showCard = (i) => {
        SetcurrentCard(i);
    }

    //name should become an input on click, for update
    return (
        <>
            <div className="lists__list">
                {props.name}
                <button>DELETE LIST</button>
                <Cards currentCards={props.currentCards} listId={props.id} showCard={(i) => showCard(i)} />
            </div>
            <div className="card" style={{ display: currentCard ? "block" : "none" }}>
                {currentCard ? <Card currentCards={props.currentCards} currentCard={currentCard} showCard={(i) => showCard(i)} /> : null}
            </div>
        </>
    );
}

export default SingleList;