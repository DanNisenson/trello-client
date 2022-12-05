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
  const [listCards, setListCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
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
        <Cards
          listCards={listCards}
          setListCards={setListCards}
          showCard={setCurrentCard}
        />
        {/* 'add card' button */}
        <CreateCard
          idList={props.id}
          listCards={listCards}
          setListCards={setListCards}
        />
      </div>
      {currentCard ? (
        <div className="card">
          {" "}
          <Card currentCard={currentCard} showCard={setCurrentCard} />
          {" "}
        </div>
      ) : null}
    </>
  );
};

export default SingleList;
