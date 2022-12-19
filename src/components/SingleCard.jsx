import { useRef, useState } from "react";
import { useAppContext } from "../context/context";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../utils/ItemTypes";
import EditCard from "./EditCard";
import "../assets/css/SingleCard.css";

const SingleCard = (props) => {
  const ref = useRef(null);
  const context = useAppContext();
  const [cardEdit, setCardEdit] = useState(false);
  const [{ handlerId }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      collect: (monitor) => ({
        handlerId: monitor.getHandlerId(),
      }),
      drop: (item, monitor) => {
        dropCard(item, monitor);
      },
    }),
    [context.cards, props.position]
  );

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { name: props.name, id: props.id, position: props.position },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [context.cards,  props.position]
  );
  // make the ref accesible to both drag and drop
  drag(drop(ref));

  const dropCard = (item, monitor) => {
    if (!ref.current) {
      return;
    }
    // item is the props that useDrag passes
    //  in this case is the pos value of the dragged card
    const dragPos = item.position;
    const hoverPos = props.position;
    let newPosition;
    // Don't replace items with themselves
    if (dragPos === hoverPos) {
      return;
    }
    // get index of hovered card
    const hoverIndex = props.listCards.findIndex(
      (card) => card.pos === hoverPos
    );
    // --Get mouse position (top or bottom of hovered element)--
    // Determine rectangle on screen
    const hoverBoundingRect = ref.current?.getBoundingClientRect();
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    const isOverTopHalf = hoverClientY < hoverMiddleY;

    // Determine new position
    //  hoverClient checks if mouse is over top or bottom half of card
    if (hoverIndex === 0 && isOverTopHalf) {
      newPosition = "top";
    } else if (
      hoverIndex === props.listCards.length - 1 &&
      !isOverTopHalf
    ) {
      newPosition = "bottom";
    } else if (isOverTopHalf) {
      console.log('first')
      newPosition = Math.floor(
        (hoverPos + props.listCards[hoverIndex - 1].pos) / 2
        );
      } else if (!isOverTopHalf) {
      console.log('sec')
      newPosition = Math.floor(
        (hoverPos + props.listCards[hoverIndex + 1].pos) / 2
      );
    }
    // card update request
    props.moveCard(item.id, props.idList, newPosition);
  };

  return (
    <>
      {/* main card component */}
      {cardEdit ? (
        <EditCard
          id={props.id}
          idList={props.idList}
          idBoard={props.idBoard}
          name={props.name}
          position={props.position}
          listCards={props.listCards}
          setListCards={props.setListCards}
          setCardEdit={setCardEdit}
        />
      ) : (
        // non-edit mode
        <div ref={ref} className="cards__card-wrapper">
          <div className="cards__card" key={props.id}>
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
        </div>
      )}
    </>
  );
};

export default SingleCard;
