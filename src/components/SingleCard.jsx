import { useState } from "react";
import "../assets/css/SingleCard.css";
import EditCard from "./EditCard";

const SingleCard = (props) => {
  // card title edit mode toggle
  const [cardEdit, setCardEdit] = useState(false);

  return (
    <>
      {/* main card component */}
      {cardEdit ? (
          <EditCard
            id={props.id}
            name={props.name}
            listCards={props.listCards}
            setListCards={props.setListCards}
            setCardEdit={setCardEdit}
          />
      ) : (
        // non-edit mode
          <div className="cards__card" key={props.id}>
            <div
              className="cards__name"
              onClick={() => props.showCard()}
              readOnly
            >
              {props.name}
            </div>
            {/* edit icons */}
            <div className="cards__action-icons">
              <button
                className="cards__edit-btn cards__action-icon"
                onClick={() => setCardEdit(true)}
              >
                <i className="fa-solid fa-pencil"></i>
              </button>
            </div>
          </div>
      )}
    </>
  );
};

export default SingleCard;
