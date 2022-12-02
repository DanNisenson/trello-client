import { useState, useEffect } from "react";
//import { useAppContext } from "../context/keys";
//import axios from "axios";
import Cards from "./Cards";
import Card from "./ShowedCard/Card";
import "../assets/css/Lists.css";
import "../assets/css/Card/Card.css";
import CreateCard from "./CreateCard";

const SingleList = (props) => {
  //state and function to show a card
  const [currentCard, setCurrentCard] = useState(null);
  const [addCard, setAddCard] = useState(false);

  //name should become an input on click, for update
  return (
    <>
      <div className="lists__list">
        {props.name}
        <button>DELETE LIST</button>
        <Cards
          currentCards={props.currentCards}
          showCard={setCurrentCard}
        />
      {addCard ? (
        <CreateCard setAddCard={setAddCard} idList={props.id} />
      ) : (
        <button className="lists__add-card" onClick={() => setAddCard(!addCard)}>
          <i className="fa-solid fa-plus lists__plus-icon "></i>
          <span>Add a card</span>
        </button>
      )}
      </div>
      {currentCard ? (
        <div className="card">
          {" "}
          <Card currentCard={currentCard} showCard={setCurrentCard} />{" "}
        </div>
      ) : null}
    </>
  );
};

export default SingleList;
