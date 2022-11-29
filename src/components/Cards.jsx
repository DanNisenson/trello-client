import "../assets/css/Cards.css";

const Cards = (props) => {
  return (
    // filter cards by list id. render each card
    <div className="cards">
      {/* iterate all cards on board */}
      {props.currentCards
        .filter((e) => e.idList === props.listId)
        .map((e, i) => {
          return (
            <div className="cards__card" key={i}>
              <div className="cards__name">{e.name}</div>
              <div className="cards__action-icons">
                <i className="fa-solid fa-pencil"></i>
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Cards;
