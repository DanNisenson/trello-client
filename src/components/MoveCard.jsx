import { useRef } from "react";
import { useAppContext } from "../context/context";
import cardsAPI from "../services/cardsAPI";

const MoveCard = (props) => {
  const context = useAppContext();
  // target form elements
  const targetList = useRef(props.idList);
  const targetPosition = useRef(props.position);

  // 'Move' btn executes
  const handleSubmit = async () => {
    try {
      // request
      const resp = await cardsAPI.updateCardPosition(
        context.keys.apiKey,
        context.keys.token,
        props.id,
        targetList.current.value,
        targetPosition.current.value
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

  return (
    <div>
      {/* board's lists drop-down menu */}
      <select name="list" defaultValue={props.idList} ref={targetList}>
        {context.lists.map((list, i) => (
          <option value={list.id} key={list.id}>
            {list.name}
          </option>
        ))}
      </select>
      {/* position number selection */}
      <input
        type="number"
        name="position"
        defaultValue={props.position}
        min={1}
        ref={targetPosition}
      />
      {/* 'Move' btn */}
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
