import SingleCard from "./SingleCard";

const Cards = (props) => {
  return (
    <div className="cards">
      {/* iterate and print all cards on board */}
      {props.listCards.map((card, i) => {
        console.log(card.pos)
        return (
          <SingleCard
            id={card.id}
            index={i}
            idList={card.idList}
            name={card.name}
            position={card.pos}
            listCards={props.listCards}
            setListCards={props.setListCards}
            showCard={props.showCard}
            key={card.id}
            currentCard={card}
            moveCard={props.moveCard}
            idBoard={card.idBoard} />
        );
      })}
    </div>
  );
};

export default Cards;
