import { useState, useEffect } from "react";
import { useAppContext } from "../context/keys";
import axios from "axios";
import Cards from "./Cards";
import "../assets/css/Lists.css";

const Lists = (props) => {
  const context = useAppContext();
  const [currentLists, setCurrentLists] = useState([]);
  const [currentCards, setCurrentCards] = useState([]);

  // get board's lists & cards on props(board selection) change.
  useEffect(() => {
    //get lists
    const getLists = async () => {
      const resp = await axios.get(
        `https://api.trello.com/1/boards/${props.boardId}/lists?&key=${context.keys.apiKey}&token=${context.keys.token}`
      );
      setCurrentLists(resp.data);
    };
    getLists();
    // get cards
    const getCards = async () => {
      const resp = await axios.get(
        `https://api.trello.com/1/boards/${props.boardId}/cards?&key=${context.keys.apiKey}&token=${context.keys.token}`
      );
      setCurrentCards(resp.data);
    };
    getCards();
  }, [props]);

  return (
    // iterate lists on selected board and render
    <div className="lists">
      {currentLists.map((e, i) => {
        return (
          <div className="lists__list" key={i}>
            {e.name}
            <Cards currentCards={currentCards} listId={e.id} />
          </div>
        );
      })}
    </div>
  );
};

export default Lists;