import { useRef, useState } from "react";
import { useAppContext } from "../context/context";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../utils/ItemTypes";
import EditCard from "./EditCard";
import "../assets/css/SingleCard.css";

const SingleCard = (props) => {
  const ref = useRef(null);
  const newPos = useRef(null);
  const context = useAppContext();
  const [cardEdit, setCardEdit] = useState(false);
  const [{ handlerId }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      collect: (monitor) => ({
        handlerId: monitor.getHandlerId(),
      }),
      drop: (item, monitor) =>
        props.moveCard(item.id, props.idList, newPos.current),
      hover: (item, monitor) => {
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
        // --Get mouse position--
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Determine new position
        //  hoverClient checks if mouse is over top or bottom half of card
        if (hoverIndex === 0 && hoverClientY < hoverMiddleY) {
          newPos.current = "top";
        } else if (
          hoverIndex === props.listCards.length - 1 &&
          hoverClientY > hoverMiddleY
        ) {
          newPos.current = "bottom";
        } else if (hoverClientY < hoverMiddleY) {
          newPosition = (hoverPos + context.cards[hoverIndex - 1].pos) / 2;
          newPos.current = newPosition;
        } else if (hoverClientY > hoverMiddleY) {
          newPosition = (hoverPos + context.cards[hoverIndex + 1].pos) / 2;
          newPos.current = newPosition;
        }
      },
    }),
    [context.cards]
  );

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { name: props.name, id: props.id, position: props.position },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [context.cards]
  );
  // make the ref accesible to both drag and drop
  drag(drop(ref));

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
        <div ref={ref} className="cards__card" key={props.id}>
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
