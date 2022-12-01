import axios from "axios";
import { useAppContext } from "../context/keys";
import "../assets/css/Cards.css";

const Cards = (props) => {
  const context = useAppContext();

  const deleteCard = (id) => {
    const request = async () => {
      await axios.delete(
        `https://api.trello.com/1/cards/${id}?&key=${context.keys.apiKey}&token=${context.keys.token}`
      );
    };
    request();
    // has to refresh after request
  };

  return (
    <div className="cards">
      {/* iterate all cards on board */}
      {props.currentCards
        .map((e) => {
          return (
            // each card
            <div className="cards__card" key={e.id} onClick={()=>props.showCard(e)}>
              {/* card name */}
              <div className="cards__name">{each.name}</div>
              {/* card action icons */}
              <div className="cards__action-icons">
                <button className="cards__edit-btn">
                  <i className="fa-solid fa-pencil"></i>
                </button>
                <button
                  className="cards__delete-btn"
                  onClick={()=>deleteCard(each)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Cards;
