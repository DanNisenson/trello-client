import axios from "axios";
import { useAppContext } from "../context/keys";
import { useState } from "react";
import "../assets/css/SingleCard.css";

const SingleCard = (props) => {
  const context = useAppContext();
  const [cardEdit, setCardEdit] = useState(false);

  const deleteCard = async (id) => {
    try {
      const resp = await axios.delete(
        `https://api.trello.com/1/cards/${id}?&key=${context.keys.apiKey}&token=${context.keys.token}`
      );
      if (resp.status === 200) {
        const newListCards = props.listCards.filter(
          (card) => card.id !== props.id
        );
        props.setListCards([...newListCards]);
      }
    } catch (error) {
      console.log(error.message);
      alert("Unable to delete card");
    }
  };

  return (
    <>
      <div className="cards__card">
        {/* card name */}
        {cardEdit ? (
          <>
            <div className="cards__edit">
              <input
                className="cards__name cards__name--edit"
                value={props.name}
              />
              <button>Save</button>
              <button>Delete</button>
            </div>
          </>
        ) : (
          <input
            className="cards__name"
            value={props.name}
            onClick={() => props.showCard()}
            readOnly
          />
        )}
        {/* card action icons */}
        <div className="cards__action-icons">
          <button
            className="cards__edit-btn cards__action-icon"
            onClick={() => setCardEdit(true)}
          >
            <i className="fa-solid fa-pencil"></i>
          </button>
          <button
            className="cards__delete-btn cards__action-icon"
            onClick={() => deleteCard(props.id)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleCard;
