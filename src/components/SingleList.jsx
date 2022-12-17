import { useState, useEffect } from "react";
import { useAppContext } from "../context/context";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/ItemTypes";
import ListName from "./ListName";
import Cards from "./Cards";
import Card from "./ShowedCard/Card";
import CreateCard from "./CreateCard";
import cardsAPI from "../services/cardsAPI";
import "../assets/css/Lists.css";
import "../assets/css/Card/Card.css";

const SingleList = (props) => {
  const context = useAppContext();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      console.log(item);
      moveCard(item.id, props.list.id, item.position);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [context.cards]);

  const [listCards, setListCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  const moveCard = async (id, idList, position) => {
    console.log(id, idList, position);
    // let position = calculatePosition();
    try {
      // request
      const resp = await cardsAPI.updateCardPosition(
        context.keys.apiKey,
        context.keys.token,
        id,
        idList,
        position
      );
      if (resp.status === 200) {
        // recreate cards array and replace modified card
        const newCards = context.cards.map((card) =>
          card.id === resp.data.id ? resp.data : card
        );
        // update cards in List component
        context.setCards(newCards);
      }
    } catch (error) {
      console.log(error.message);
      alert("Unable to update card");
    }
  };

  useEffect(() => {
    const filteredCards = context.cards
      .filter((card) => {
        console.log(card.name, props.list.name);
        return props.list.id === card.idList;
      })
      .sort((a, b) => a.pos - b.pos);
    setListCards(filteredCards);
  }, [context.cards]);

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
        <CreateCard idList={props.list.id} />
      </div>
      {currentCard ? (
        <Card currentCard={currentCard} showCard={setCurrentCard} />
      ) : null}
    </>
  );
};

export default SingleList;
