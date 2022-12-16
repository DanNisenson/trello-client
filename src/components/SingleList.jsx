import { useState, useEffect } from "react";
import { useAppContext } from "../context/context";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/ItemTypes";
import ListName from "./ListName";
import Cards from "./Cards";
import Card from "./ShowedCard/Card";
import "../assets/css/Lists.css";
import "../assets/css/Card/Card.css";
import CreateCard from "./CreateCard";

const SingleList = (props) => { 
  const context = useAppContext();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {console.log(item); context.moveCard(item.id, props.list.id, item.position)},
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const [listCards, setListCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(()=> {
      const filteredCards = context.cards.filter(card => {console.log(card.name ,props.list.id === card.idList) ;return props.list.id === card.idList}).sort((a, b) => a.pos - b.pos);
      setListCards(filteredCards);
    }
  , [context.cards]);

  return (
    <>
      <div ref={drop} className="lists__list">
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
          <Card currentCard={currentCard} showCard={setCurrentCard} />
      ) : null}
    </>
  );
};

export default SingleList;
