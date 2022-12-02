import axios from "axios";
import { useAppContext } from "../context/keys";
import "../assets/css/CreateCard.css";
import "../assets/css/Cards.css";

const CreateCard = (props) => {
  const context = useAppContext();

  const postNewCard = () => {
    console.log('first')
    // get user title input
    const title = document.getElementById("new-card-title-input").value;
    // send post request
    const request = async () => {
      await axios.post(`https://api.trello.com/1/cards?name=${title}&idList=${props.idList}&key=${context.keys.apiKey}&token=${context.keys.token}`);
    }
    request();
    // close card creation component
    props.setAddCard(false);
  };

  return (
    <div className="create-card">
        {/* title user input */}
        <textarea
          type="text"
          id="new-card-title-input"
          className="create-card__title-input"
          placeholder="Enter a title for this card..."
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
  );
};

export default CreateCard;

// make the form and pass user input value to postNewCard
// make postNewCard async and make POST request
