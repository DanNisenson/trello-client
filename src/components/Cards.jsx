import { useState } from "react";
import "../assets/css/Cards.css";
import SingleCard from "./SingleCard";

const Cards = (props) => {
  const [modal, setModal] = useState(false)
  console.log(modal)

  
  return (
    <div className="cards" >
      {modal ? <div className="cards__modal-bkground"></div> : null}
      {/* iterate and print all cards on board */}
      {props.listCards.map((card) => {
        return (
          <SingleCard id={card.id} name={card.name} listCards={props.listCards} setListCards={props.setListCards} modal={modal} setModal={setModal} showCard={props.showCard} key={card.id} />
        );
      })}
    </div>
  );
};

export default Cards;
