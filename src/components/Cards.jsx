import SingleCard from "./SingleCard";

const Cards = (props) => {
  return (
    <div className="cards">
      {/* iterate and print all cards on board */}
      {props.listCards.map((card) => {
        return (
          <SingleCard
            currentCard={card}
            listCards={props.listCards}
            setListCards={props.setListCards}
            showCard={props.showCard}
            moveCard={props.moveCard}
            key={card.id}
            />
        );
      })}
    </div>
  );
};

export default Cards;
