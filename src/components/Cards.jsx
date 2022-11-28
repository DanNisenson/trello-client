const Cards = (props) => {
  return (
    <div className="cards">
      {/* iterate all cards on board */}
      {props.currentCards.map((e, i) => {
      // could use filter
        if (e.idList === props.listId) {
          return (
            <div className="card" key={i}>
              {e.name}
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default Cards;
