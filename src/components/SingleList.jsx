import { useState, useEffect } from "react";
import { useAppContext } from "../context/keys";
import axios from "axios";
import Cards from "./Cards";
import Card from "./ShowedCard/Card";
import "../assets/css/Lists.css";
import "../assets/css/Card/Card.css";
import CreateCard from "./CreateCard";

const SingleList = (props) => {
  const context = useAppContext();
  //state and function to show a card
  const [listCards, setListCards] = useState([]);

  const [currentCard, setCurrentCard] = useState(null);
  //
  const [addCard, setAddCard] = useState(false);

  useEffect(() => {
    console.log(listCards);
    // get cards
    const getCards = async () => {
      const resp = await axios.get(
        `https://api.trello.com/1/lists/${props.id}/cards?&key=${context.keys.apiKey}&token=${context.keys.token}`
      );
      setListCards(resp.data);
    };

    getCards();
  }, []);

  //name should become an input on click, for update
  return (
    <>
      <div className="lists__list">
        {props.name}
        <button>DELETE LIST</button>
        <Cards listCards={listCards} setListCards={setListCards} showCard={setCurrentCard} />
        {/* add card button toggle */}
        {addCard ? (
          <CreateCard
            idList={props.id}
            listCards={listCards}
            setAddCard={setAddCard}
            setListCards={setListCards}
          />
        ) : (
          <button className="lists__add-card" onClick={() => setAddCard(true)}>
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
