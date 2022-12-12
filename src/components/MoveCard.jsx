import { useRef } from "react";
import { useAppContext } from "../context/context";
import cardsAPI from "../services/cardsAPI";

const MoveCard = (props) => {
  const context = useAppContext();
  // const targetBoard = useRef();
  const targetList = useRef();
  const targetPosition = useRef();

  const handleSubmit = async () => {
    try {
      // request
      const resp = await cardsAPI.updateCardPosition(
        context.keys.apiKey,
        context.keys.token,
        props.id,
        targetList.current.value,
        targetPosition.current.value,
      );
      if (resp.status === 200) {
        // recreate cards array and replace modified card
        const newCards = context.cards.map((card) =>
          card.id === resp.data.id ? resp.data : card
        );
        // update cards in List component
        context.setCards(newCards);
      }
    } catch (error) {
      console.log(error.message);
      alert("Unable to update card");
    }
    props.setMoveCard(false);
  };


  // once its working, pass idList and card's id to default to right position and idList
  return (
    <div>
      <select name="list" defaultValue={props.idList} ref={targetList}>
        {context.lists.map((list, i) => (
          <option value={list.id} key={list.id} >
            {list.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="position"
        // onChange={(e) => setPosition(e.target.value)}
        ref={targetPosition}
        defaultValue={props.position}
        min={1}
      />
      <button
        type="submit"
        className="create-card__add-btn"
        onClick={handleSubmit}
      >
        Move
      </button>
    </div>
  );
};

export default MoveCard;
