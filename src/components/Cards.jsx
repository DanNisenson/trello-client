import SingleCard from "./SingleCard";

const Cards = (props) => {


  return (
    <div className="cards" >
      {/* iterate and print all cards on board */}
      {props.listCards.map((card) => {
        return (
          <SingleCard id={card.id} idList={card.idList} name={card.name} position={card.pos} listCards={props.listCards} setListCards={props.setListCards} showCard={props.showCard} key={card.id} currentCard={card} idBoard={card.idBoard} />
        );
      })}
    </div>
  );
};

export default Cards;
