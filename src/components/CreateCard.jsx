import { useState, useRef } from "react";
import { useAppContext } from "../context/context";
import cardsAPI from "../services/cardsAPI";
import "../assets/css/CreateCard.css";

const CreateCard = (props) => {
  const context = useAppContext();
  const textarea = useRef()
  // "card creation" mode toggle
  const [addCard, setAddCard] = useState(false);
  // new card's title
  const [title, setTitle] = useState("");

  // open text input and focus it
  const titleInputMode = async () => {
    await setAddCard(true);
    textarea.current.focus();
  }
  

  const postNewCard = async () => {
    // request
    try {
      const resp = await cardsAPI.postNewCard(context.keys.apiKey, context.keys.token, title, props.idList)
      if (resp.status === 200) {
        // add new card at the end of listCards array
        context.setCards([...context.cards, resp.data]);
      }
    } catch (error) {
      console.log(error);
      console.log("error. failed to post new card.");
    }
    // toggle card creation mode
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
            ref={textarea}
          />
          {/* "add card" & close buttons */}
          <div className="create-card__btns-container">
            <button className="create-card__add-btn" onClick={postNewCard}>
              Add card
            </button>
            <i
              className="fa-regular fa-plus create-card__close-btn"
              onClick={() => setAddCard(false)}
            ></i>
          </div>
        </div>
      ) : (
        <button className="lists__add-card" onClick={titleInputMode}>
          <i className="fa-regular fa-plus lists__plus-icon "></i>
          <span>Add a card</span>
        </button>
      )}
    </>
  );
};
export default CreateCard;
