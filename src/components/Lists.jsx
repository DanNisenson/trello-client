import { useState, useEffect } from "react";
import { useAppContext } from "../context/keys";
import axios from "axios";
import SingleList from "./SingleList";
import ListForm from "./ListForm";
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
                    <SingleList key={list.id} list={list} currentCards={currentCards.filter(c => c.idList === list.id)} />
            )}
            <ListForm />
        </div>
    );
};

export default Lists;
