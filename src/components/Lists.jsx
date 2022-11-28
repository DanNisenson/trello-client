import "../assets/css/Lists.css";
import Cards from "./Cards";

const Lists = (props) => {
  return (
      <div className="lists">
        {/* iterate lists on selected board and render */}
        {props.currentLists.map((e, i) => {
          return (
            <div className="lists__list" key={i}>
              {e.name}
              <Cards currentCards={props.currentCards} listId={e.id} />
            </div>
          );
        })}
      </div>
    
  );
};

export default Lists;
