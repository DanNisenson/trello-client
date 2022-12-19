import { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { useAppContext } from "../context/context";
import ListName from "./ListName";
import Cards from "./Cards";
import ModalCard from "./ShowedCard/ModalCard";
import "../assets/css/Lists.css";
import CreateCard from "./CreateCard";
import { ItemTypes } from "../constants/Constants";

const SingleList = (props) => {
    const context = useAppContext();
    const [listCards, setListCards] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);

    useEffect(() => {
        const filteredCards = context.cards.filter(card => props.list.id === card.idList).sort((a, b) => a.pos - b.pos);
        setListCards(filteredCards);
    }
        , [context.cards]);

        const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.LIST,
        item: {
            listId: props.list.id,
            pos: props.list.pos
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }), [context.lists]);

    return (
        <>
            <div className="lists__list" ref={drag}>
                <ListName name={props.list.name} listId={props.list.id} boardId={props.list.idBoard} />
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
