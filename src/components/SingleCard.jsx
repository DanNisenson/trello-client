import { useState } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/ItemTypes";
import EditCard from "./EditCard";
import "../assets/css/SingleCard.css";

const SingleCard = (props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: {id: props.id, position: props.position},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
  }));
  // card title edit mode toggle
  const [cardEdit, setCardEdit] = useState(false);

  return (
    <>
      {/* main card component */}
      {cardEdit ? (
          <EditCard
            id={props.id}
            idList={props.idList}
            name={props.name}
            position ={props.position}
            listCards={props.listCards}
            setListCards={props.setListCards}
            setCardEdit={setCardEdit}
          />
      ) : !isDragging && (
        // non-edit mode
          <div ref={drag} className="cards__card" key={props.id} >
            <div
              className="cards__name"
              onClick={() => props.showCard(props.currentCard)}
              readOnly
            >
              {props.name}
            </div>
            {/* edit icons */}
              <button
                className="cards__edit-btn cards__action-icon"
                onClick={() => setCardEdit(true)}
              >
                <i className="fa-solid fa-pencil"></i>
              </button>
            </div>
      )}
    </>
  );
};

export default SingleCard;
