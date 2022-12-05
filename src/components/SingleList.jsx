import { useState, useEffect } from "react";
import { useAppContext } from "../context/keys";
import axios from "axios";
import ListName from "./ListName.jsx";
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
        `https://api.trello.com/1/lists/${props.list.id}/cards?&key=${context.keys.apiKey}&token=${context.keys.token}`
      );
      setListCards(resp.data);
    };

    getCards();
  }, []);

  return (
    <>
      <div className="lists__list">
        <ListName name={props.list.name} listId={props.list.id} />
        <Cards
          listCards={listCards}
          setListCards={setListCards}
          showCard={setCurrentCard}
        />
        {/* 'add card' button */}
        <CreateCard
          idList={props.list.id}
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
