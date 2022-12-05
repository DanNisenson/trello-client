import axios from "axios";
import { useAppContext } from "../context/keys";
import "../assets/css/Cards.css";

const Cards = (props) => {
  const context = useAppContext();

  const deleteCard = async (id) => {
    try {
     const resp = await axios.delete(
        `https://api.trello.com/1/cards/${id}?&key=${context.keys.apiKey}&token=${context.keys.token}`
      );
      
    } catch (error) {
      
    }
      
  };

  return (
    <div className="cards">
      {/* iterate and print all cards on board */}
      {props.listCards.map((card) => {
        return (
            <div className="cards__card" key={card.id}>
              {/* card action icons */}
              <div className="cards__action-icons">
                <button className="cards__edit-btn cards__action-icon">
                  <i className="fa-solid fa-pencil"></i>
                </button>
                <button
                  className="cards__delete-btn cards__action-icon"
                  onClick={() => deleteCard(card.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
              {/* card name */}
              <div className="cards__name" onClick={() => props.showCard(card)} >
                {card.name}
              </div>
            </div>
        );
      })}
    </div>
  );
};

export default Cards;
