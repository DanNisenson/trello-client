import { useRef, useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import cardsAPI from "../services/cardsAPI";
import "../assets/css/MoveCard.css";

const MoveCard = (props) => {
  const context = useAppContext();
  // selected list
  const [targetListId, setTargetListId] = useState(props.idList);
  // selected position
  const targetPosition = useRef();
  // array of card pos(ition) values
  const [cardPositions, setCardPositions] = useState([]);

  useEffect(() => {
    const listCards = context.cards.filter(
      (card, i) => card.idList === targetListId
    );
    const positions = listCards.map((card, i) => card.pos);
    setCardPositions(positions);
  }, [targetListId]);

  const cardPositionOptions = () => {
    let cardOrder = [];
    // check if there are cards in list
    //  & render option elements for new "card position"
    if (cardPositions.length) {
      // for same list -> give 1 less option
      const listLength = props.idList !== targetListId ? cardPositions.length + 1 : cardPositions.length;

      for (let i = 0; i < listLength; i++) {
        cardOrder.push(
          <option value={i} key={i}>
            {parseInt(i) + 1}
          </option>
        );
      }
    } else {
      // if theres no cards in list there is only one option
      cardOrder = [
        <option value={0} key={0}>
          {1}
        </option>,
      ];
    }
    return cardOrder;
  };

  const calculatePosition = () => {
    let targPosInt = parseInt(targetPosition.current.value);
    const listLength = props.idList !== targetListId ? cardPositions.length : cardPositions.length -1;
    let position;

    if (targPosInt === 0) {
      position = "top";
    } else if (targPosInt === listLength) {
      position = "bottom";
    } else if (targPosInt > 0 && targPosInt < cardPositions.length + 1) {
      // calculate mean
      position =
        (cardPositions[targPosInt] + cardPositions[targPosInt - 1]) / 2;
    }
    return position;
  };

  // 'Move' btn gives new position value and requests update
  const handleSubmit = async () => {
    let position = calculatePosition();
    try {
      // request
      const resp = await cardsAPI.updateCardPosition(
        context.keys.apiKey,
        context.keys.token,
        props.id,
        targetListId,
        position
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
    props.setCardEdit(false);
  };

  return (
    <div className="move-card">
      <div className="move-card__title-bar">
        <div>Move card</div>
        <i
          className="fa-regular fa-plus move-card__close-btn"
          onClick={() => props.setMoveCard(false)}
        ></i>
      </div>
      {/* board's lists drop-down menu */}
      <div className="move-card__select-section">
        <div className="move-card__select">
          <label htmlFor="list-select">List</label>
          <select
            id="list-select"
            className="move-card__select-list"
            name="list"
            defaultValue={props.idList}
            onChange={(e) => setTargetListId(e.target.value)}
          >
            {context.lists.filter(list => list.idBoard === props.idBoard).map((list, i) => (
              <option value={list.id} key={list.id}>
                {list.name}
              </option>
            ))}
          </select>
        </div>

        {/* position selection */}
        <div className="move-card__select">
          <label htmlFor="position-select">Position</label>
          <select
            id="position-select"
            name="position"
            defaultValue={0} // should initalize on card position
            ref={targetPosition}
          >
            {cardPositionOptions()}
          </select>
        </div>
      </div>
      {/* 'Move' btn */}
      <div className="move-card__btn-section">
        <button
          type="submit"
          className="create-card__add-btn"
          onClick={handleSubmit}
        >
          Move
        </button>
      </div>
    </div>
  );
};

export default MoveCard;
