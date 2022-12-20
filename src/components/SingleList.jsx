import { useState, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { useAppContext } from "../context/context";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/ItemTypes";
import ListName from "./ListName";
import Cards from "./Cards";
import ModalCard from "./ShowedCard/ModalCard";
import CreateCard from "./CreateCard";
import cardsAPI from "../services/cardsAPI";
import "../assets/css/Lists.css";

const SingleList = (props) => {
  const context = useAppContext();
  const ref = useRef();
  const [listCards, setListCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop: (item, monitor) =>{
        return listCards.length === 0
          ? moveCard(item.id, props.list.id, item.position)
          : null},
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [context.cards, listCards]
  );
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.LIST,
      item: {
        listId: props.list.id,
        pos: props.list.pos,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [context.lists]
  );
  drag(drop(ref));
  
  useEffect(() => {
    const filteredCards = context.cards
    .filter((card) => {
      return props.list.id === card.idList;
    })
    .sort((a, b) => a.pos - b.pos);
    
    setListCards(filteredCards);
  }, [context.cards]);
  
  const moveCard = async (id, idList, position) => {
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

  

  

  return (
    <>
      <div ref={ref} className="lists__list">
        <ListName
          name={props.list.name}
          listId={props.list.id}
          boardId={props.list.idBoard}
        />
        <Cards
          listCards={listCards}
          setListCards={setListCards}
          showCard={setCurrentCard}
          moveCard={moveCard}
        />
        {/* 'add card' button */}
        <CreateCard idList={props.list.id} />
      </div>
      {currentCard ? (
        <ModalCard currentCard={currentCard} setCurrentCard={setCurrentCard} />
      ) : null}
    </>
  );
};

export default SingleList;
