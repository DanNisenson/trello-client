import { useState } from "react";
import { useAppContext } from "../context/context";
import cardsAPI from "../services/cardsAPI";

const MoveCard = (props) => {
  const context = useAppContext();
  const [usrInput, setUsrInput] = useState({
    list: props.idList,
    position: 1,
  });

  console.log(usrInput);
  const handleChange = (e) => {
    setUsrInput({
      ...usrInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      // request
      const resp = await cardsAPI.updateCardPosition(
        context.keys.apiKey,
        context.keys.token,
        props.id,
        usrInput.list,
        usrInput.position
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
    props.setMoveCard(false)
  };

 

  // once its working, pass idList and card's id to default to right position and list
  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
        <select name="list" onChange={handleChange}>
          {context.lists.map((list) => (
            <option value={list.id}>{list.name}</option>
          ))}
        </select>
        <input type="number" name="position" id="" onChange={handleChange} />
        <button
          type="submit"
          className="create-card__add-btn"
          onClick={handleSubmit}
        >
          Move
        </button>
      {/* </form> */}
    </div>
  );
};

export default MoveCard;
