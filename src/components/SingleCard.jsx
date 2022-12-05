import axios from "axios";
import { useAppContext } from "../context/keys";
import { useState, useEffect } from "react";
import "../assets/css/SingleCard.css";

const SingleCard = (props) => {
  const context = useAppContext();
  const [cardEdit, setCardEdit] = useState(false);

  const editCard = () => {
    setCardEdit(!cardEdit);
    props.setModal(!props.modal);
  };

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
    <div className="cards__card" key={props.id}>
      {/* card name */}
      {cardEdit ? (
        <>
          <div className="cards__edit">
            <textarea
              className="cards__name cards__name--edit"
              value={props.name}
              readOnly
            >
              {props.name}
            </textarea>
            <i
              className="fa-solid fa-plus cards__edit-close-btn"
              onClick={editCard}
            ></i>
            <button className="cards__edit-save-btn create-card__add-btn">
              Save
            </button>
            <div className="cards__edit-sidebar">
              <button className="cards__edit-action-btn">
                <i className="fa-solid fa-trash"></i>
                {" "}
                Delete
              </button>
              <button className="cards__edit-action-btn">
                <i className="fa-solid fa-trash"></i>
                {" "}
                Open
              </button>
              <button className="cards__edit-action-btn">
                <i className="fa-solid fa-trash"></i>
                {" "}
                Archive
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="cards__name" onClick={() => props.showCard()} readOnly>
          {props.name}
        </div>
      )}
      {/* card action icons */}
      {!cardEdit ? (
        <div className="cards__action-icons">
          <button
            className="cards__edit-btn cards__action-icon"
            onClick={editCard}
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
      ) : null}
    </div>
  );
};

export default SingleCard;
