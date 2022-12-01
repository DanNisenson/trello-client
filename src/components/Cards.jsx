import "../assets/css/Cards.css";

const Cards = (props) => {
  return (
    <div className="cards">
      {props.currentCards
        .map((e) => {
          return (
            <div className="cards__card" key={e.id} onClick={()=>props.showCard(e)} >
              <div className="cards__name">{e.name}</div>
            </div>
          );
        })}
    </div>
  );
};

export default Cards;
