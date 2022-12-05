import axios from "axios";
import { useAppContext } from "../context/keys";
import "../assets/css/Cards.css";
import SingleCard from "./SingleCard";

const Cards = (props) => {

  

  return (
    <div className="cards">
      <div className="cards__modal-bkground"></div>

      {/* iterate and print all cards on board */}
      {props.listCards.map((card) => {
        return (
          <SingleCard id={card.id} name={card.name} listCards={props.listCards} setListCards={props.setListCards} showCard={props.showCard} key={props.id} />
        );
      })}
    </div>
  );
};

export default Cards;
