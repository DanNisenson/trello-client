
const Board = (props) => {

  return (
    <div className="board-link" onClick={() => props.showLists(props.id)}>{props.name}</div>
  );
};

export default Board;
