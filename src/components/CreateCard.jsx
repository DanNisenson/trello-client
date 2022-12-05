import axios from "axios";
import { useState } from "react";
import { useAppContext } from "../context/keys";
import "../assets/css/CreateCard.css";
import "../assets/css/Cards.css";

const CreateCard = (props) => {
  const context = useAppContext();
  const [title, setTitle] = useState("");
  const [addCard, setAddCard] = useState(false);

  const postNewCard = async () => {
    try {
      const resp = await axios.post(
        `https://api.trello.com/1/cards?name=${title}&idList=${props.idList}&key=${context.keys.apiKey}&token=${context.keys.token}`
      );
      if (resp.status === 200) {
        console.log(`'${resp.data.name}' card added`);
        props.setListCards([...props.listCards, resp.data]);
      }
    } catch (error) {
      console.log(error);
      console.log("error. failed to post new card. CreateCard.jsx::12");
    }
    // close card creation component
    setAddCard(false);
  };

  return (
    <>
      {addCard ? (
        <div className="create-card">
          {/* title user input */}
          <textarea
            type="text"
            id="new-card-title-input"
            className="create-card__title-input"
            placeholder="Enter a title for this card..."
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* "add card" & close buttons */}
          <div className="create-card__btns-container">
            <button className="create-card__add-btn" onClick={postNewCard}>
              Add card
            </button>
            <i
              className="fa-solid fa-plus create-card__close-btn"
              onClick={() => props.setAddCard(false)}
            ></i>
          </div>
        </div>
      ) : (
        <button className="lists__add-card" onClick={() => setAddCard(true)}>
          <i className="fa-solid fa-plus lists__plus-icon "></i>
          <span>Add a card</span>
        </button>
      )}
    </>
  );
};
export default CreateCard;
