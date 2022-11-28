import "../assets/css/Cards.css";

const Cards = (props) => {
  return (
    <div className="cards">
      {/* iterate all cards on board */}
      {props.currentCards.filter(e => e.idList === props.listId).map((e, i) => {
          return (
            <div className="cards__card" key={i}>
              <div className="cards__name">
              {e.name}
              </div>
            </div>

          );
        } 
      )}
    </div>
  );
};

export default Cards;
