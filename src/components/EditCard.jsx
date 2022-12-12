import { useAppContext } from "../context/context";
import { useEffect ,useRef } from "react";
import cardsAPI from "../services/cardsAPI";
import "../assets/css/EditCard.css";

const EditCard = (props) => {
  const textarea = useRef()
  const context = useAppContext();
  // const [cardTitle, setCardTitle] = useState(props.name);

  useEffect(() => {
    // focus element and select all text to be edited
    const title = textarea.current;
    title.setSelectionRange(0, props.name.length);
    title.focus();
  }, [])
  

  // card title change function
  const updateCard = async () => {
    try {
      // request
      const resp = await cardsAPI.updateCard(
        context.keys.apiKey,
        context.keys.token,
        props.id,
        textarea.current.value
      );
      if (resp.status === 200) {
        // recreate listCards array and replace modified card
        const newListCards = context.cards.map((card) =>
          card.id === resp.data.id ? resp.data : card
        );
        // update cards in List component
        context.setCards(newListCards);
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
      const resp = await cardsAPI.deleteCard(
        context.keys.apiKey,
        context.keys.token,
        props.id
      );
      if (resp.status === 200) {
        // copy listCards and remove deleted card
        const newListCards = context.cards.filter(
          (card) => card.id !== props.id
        );
        // update cards in List component
        context.setCards(newListCards);
      }
    } catch (error) {
      console.log(error.message);
      alert("Unable to delete card");
    }
  };

  return (
    <>
      {/* modal background. if clicked -> toggle edit mode off */}
      <div
        className="cards__modal-bkground"
        onClick={() => props.setCardEdit(false)}
      ></div>
      {/* close button */}
      <i
        className="fa-solid fa-plus cards__edit-close-btn"
        onClick={() => props.setCardEdit(false)}
      ></i>
      {/* wrapper */}
      <div className="cards__card" key={props.id}>
        <div className="cards__edit">
          {/* title input */}
          <textarea
            className="cards__name cards__name--edit"
            defaultValue={props.name}
            // onChange={(e) => {
            //   props.setCardTitle(e.target.value);
            // }}
            ref={textarea}
          />
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
    </>
  );
};

export default EditCard;
