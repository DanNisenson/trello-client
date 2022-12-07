import axios from "axios";
import { useAppContext } from "../context/keys";

const EditCard = (props) => {
  const context = useAppContext();

  // card title change function
  const updateCard = async () => {
    try {
      // request
      const resp = await axios.put(
        `https://api.trello.com/1/cards/${props.id}?name=${props.cardTitle}&key=${context.keys.apiKey}&token=${context.keys.token}`
      );
      if (resp.status === 200) {
        // recreate listCards array and replace modified card
        const newListCards = props.listCards.map((card) =>
          card.id === resp.data.id ? resp.data : card
        );
        // update cards in List component
        props.setListCards(newListCards);
      }
    } catch (error) {
      console.log(error.message);
      alert("Unable to update card");
    }
    // toggle card edit mode
    props.setCardEdit(false);
  };

  // card delete function
  const deleteCard = async () => {
    try {
      // request
      const resp = await axios.delete(
        `https://api.trello.com/1/cards/${props.id}?&key=${context.keys.apiKey}&token=${context.keys.token}`
      );
      if (resp.status === 200) {
        // copy listCards and remove deleted card
        const newListCards = props.listCards.filter(
          (card) => card.id !== props.id
        );
        // update cards in List component
        props.setListCards(newListCards);
      }
    } catch (error) {
      console.log(error.message);
      alert("Unable to delete card");
    }
  };

  return (
    <div className="cards__card" key={props.id}>
      {/* edit mode */}
      <div className="cards__edit">
        {/* title input */}
        <textarea
          className="cards__name cards__name--edit"
          value={props.cardTitle}
          onChange={(e) => {
            props.setCardTitle(e.target.value);
          }}
        />
        {/* close button */}
        <i
          className="fa-solid fa-plus cards__edit-close-btn"
          onClick={() => props.setCardEdit(false)}
        ></i>
        {/* update card title button */}
        <button
          className="cards__edit-save-btn create-card__add-btn"
          onClick={updateCard}
        >
          Save
        </button>
        {/* actions sidebar */}
        <div className="cards__edit-sidebar">
          <button className="cards__edit-action-btn" onClick={deleteCard}>
            <i className="fa-solid fa-trash"></i> Delete
          </button>
          <button className="cards__edit-action-btn">
            <i className="fa-solid fa-trash"></i> Open
          </button>
          <button className="cards__edit-action-btn">
            <i className="fa-solid fa-trash"></i> Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
