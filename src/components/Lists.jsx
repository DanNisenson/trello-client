import Cards from "./Cards";

const Lists = (props) => {
  return (
      <div className="lists">
        {/* iterate lists on selected board and render */}
        {props.currentLists.map((e, i) => {
          return (
            <div className="list" key={i}>
              {e.name}
              <Cards currentCards={props.currentCards} listId={e.id} />
            </div>
          );
        })}
      </div>
    
  );
};

export default Lists;
