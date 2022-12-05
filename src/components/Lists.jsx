import { useState, useEffect } from "react";
import { useAppContext } from "../context/keys";
import axios from "axios";
import SingleList from "./SingleList";
import CreateList from "./CreateList";
import "../assets/css/Lists.css";

const Lists = (props) => {
    const context = useAppContext();
    const [currentLists, setCurrentLists] = useState([]);
    const [currentCards, setCurrentCards] = useState([]);
    const [toggleAddList, setToggleAddList] = useState(false);

    // get board's lists & cards on props(board selection) change.
    useEffect(() => {
        //get lists
        const getLists = async () => {
            const resp = await axios.get(
                `https://api.trello.com/1/boards/${props.boardId}/lists?&key=${context.keys.apiKey}&token=${context.keys.token}`
            );
            setCurrentLists(resp.data);
        }
        getLists();
        // get cards
        const getCards = async () => {
            const resp = await axios.get(
                `https://api.trello.com/1/boards/${props.boardId}/cards?&key=${context.keys.apiKey}&token=${context.keys.token}`
            );
            setCurrentCards(resp.data);
        }

        getCards();
    }, [props]);

    return (
        // iterate lists on selected board and render each, passing only the filtered cards that belong to each list
        <div className="lists">
            {currentLists
                .map(list => 
                    <SingleList key={list.id} list={list} currentCards={currentCards.filter(c => c.idList === list.id)} />
            )}
            {toggleAddList ?
                <CreateList boardId={props.boardId} currentLists={currentLists} setCurrentLists={setCurrentLists} setToggleAddList={setToggleAddList} />
            :
            <button className="lists__add-list" onClick={() => setToggleAddList(!toggleAddList)}>
                <i className="fa-solid fa-plus lists__plus-icon "></i>
                <span>Add another list</span>
            </button>
            }
        </div>
    );
};

export default Lists;