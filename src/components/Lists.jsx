import { useState, useEffect } from "react";
import { useAppContext } from "../context/keys";
import axios from "axios";
import SingleList from "./SingleList";
import "../assets/css/Lists.css";
import CreateCard from "./CreateCard";

const Lists = (props) => {
  const context = useAppContext();
  const [currentLists, setCurrentLists] = useState([]);
  const [currentCards, setCurrentCards] = useState([]);
  const [listId, setListId] = useState(0);

  // listId not changing when creatting cardddd
  // check useEffect dependencies

    // get board's lists & cards on props(board selection) change.
    useEffect(() => {
        //get lists
        const getLists = async () => {
            const resp = await axios.get(
                `https://api.trello.com/1/boards/${props.boardId}/lists?&key=${context.keys.apiKey}&token=${context.keys.token}`
            );
            console.log(resp.data);
            setCurrentLists(resp.data);
        }

        getLists();
        // get cards
        const getCards = async () => {
            const resp = await axios.get(
                `https://api.trello.com/1/boards/${props.boardId}/cards?&key=${context.keys.apiKey}&token=${context.keys.token}`
            );
            console.log(resp.data);
            setCurrentCards(resp.data);
        }

        getCards();
    }, [props]);

    return (
      // iterate lists on selected board and render each, passing only the filtered cards that belong to each list
      <div className="lists">
          {currentLists
              .map(list => 
                  <SingleList key={list.id} name={list.name} currentCards={currentCards.filter(c => c.idList === list.id)} />
                  );
                }
    </div>
  );
};

export default Lists;

/* if listId falsy -> render "add card icon". else render create card component */
// {listId === each.id ? (
//   <CreateCard setListId={setListId} idList={each.id} />
// ) : (
//   <button
//     className="lists__add-card"
//     onClick={() => setListId(each.id)}
//   >
//     <i className="fa-solid fa-plus lists__plus-icon "></i>
//     <span>Add a card</span>
//   </button>
// )}