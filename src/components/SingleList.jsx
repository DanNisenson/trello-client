import { useState, useEffect } from "react";
import { useAppContext } from "../context/context";
import ListName from "./ListName";
import Cards from "./Cards";
import ModalCard from "./ShowedCard/ModalCard";
import "../assets/css/Lists.css";
import CreateCard from "./CreateCard";

const SingleList = (props) => {
  const context = useAppContext();
  const [listCards, setListCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(()=> {
    const filteredCards = context.cards.filter(card => props.list.id === card.idList).sort((a, b) => a.pos - b.pos);
      setListCards(filteredCards);
    }
  , [context.cards]);

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
        />
      </div>
      {currentCard ? (
          <ModalCard currentCard={currentCard} setCurrentCard={setCurrentCard} />
      ) : null}
    </>
  );
};

export default SingleList;
