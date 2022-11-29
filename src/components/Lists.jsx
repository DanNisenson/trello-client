import { useState, useEffect } from "react";
import { useAppContext } from "../context/keys";
import axios from "axios";
import Cards from "./Cards";
import axios from "axios";
import { useState } from "react";
import "../assets/css/Lists.css";
import Cards from "./Cards";
import CreateCard from "./CreateCard";

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

  const [listId, setListId] = useState(0);

  return (
    // all lists container
    <div className="lists">
      {/* iterate lists on selected board and render each one */}
      {props.currentLists.map((each, i) => {
        return (
          // single list
          <div className="lists__list" key={i}>
            {/* list title */}
            <h3>{each.name}</h3>
            {/* card components */}
            <Cards currentCards={props.currentCards} listId={each.id} />

            {/* if listId falsy -> render "add card icon". else render create card component */}
            {listId === each.id ? (
              <CreateCard setListId={setListId} idList={each.id} />
            ) : (
              <button
                className="lists__add-card"
                onClick={() => setListId(each.id)}
              >
                <i className="fa-solid fa-plus lists__plus-icon "></i>
                <span>Add a card</span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Lists;
