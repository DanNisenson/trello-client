import SingleCard from "./SingleCard";

const Cards = (props) => {

  
  return (
    <div className="cards" >
      {/* iterate and print all cards on board */}
      {props.listCards.map((card) => {
        return (
          <SingleCard id={card.id} name={card.name} listCards={props.listCards} setListCards={props.setListCards} showCard={props.showCard} key={card.id} />
        );
      })}
    </div>
  );
};

export default Cards;
