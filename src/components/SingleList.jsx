import { useState, useEffect } from "react";
import { useAppContext } from "../context/context";
import ListName from "./ListName";
import Cards from "./Cards";
import Card from "./ShowedCard/Card";
import "../assets/css/Lists.css";
import "../assets/css/Card/Card.css";
import CreateCard from "./CreateCard";

const SingleList = (props) => {
  const context = useAppContext();
  const [listCards, setListCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(()=> {
      const filteredCards = context.cards.filter(card => props.list.id === card.idList);
      setListCards(filteredCards);
    }
  , [context.cards]);

  return (
    <>
      <div className="lists__list">
        <ListName name={props.list.name} listId={props.list.id}
            currentLists={props.currentLists} setCurrentLists={props.setCurrentLists}
            setListCards={setListCards}
        />
        <Cards
          listCards={listCards}
          setListCards={setListCards}
          showCard={setCurrentCard}
        />
        {/* 'add card' button */}
        <CreateCard
          idList={props.list.id}
        />
      </div>
      {currentCard ? (
          <Card currentCard={currentCard} showCard={setCurrentCard} />
      ) : null}
    </>
  );
};

export default SingleList;
