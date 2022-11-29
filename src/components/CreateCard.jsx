import axios from "axios";
import "../assets/css/CreateCard.css";

const CreateCard = (props) => {
  
  const postNewCard = () => {
    const resp = 0;
  };

  return (
    <div className="create-card">
      <input type="text" />
      <button onClick={postNewCard()}>Add</button>
      <i
        className="fa-solid fa-plus create-card__close"
        onClick={() => props.setListId(0)}
      ></i>
    </div>
  );
};

export default CreateCard;

// make the form and pass user input value to postNewCard
// make postNewCard async and make POST request
