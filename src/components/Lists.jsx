import { useEffect } from "react";
import { useAppContext } from "../context/context";
import listsAPI from "../services/listsAPI";
import cardsAPI from "../services/cardsAPI";
import SingleList from "./SingleList";
import CreateList from "./CreateList";
import "../assets/css/Lists.css";

const Lists = (props) => {
    const context = useAppContext();

    // get board's lists on props(board selection) change.
    useEffect(() => {
        const getLists = async () => {
            try {
                const resp = await listsAPI.getLists(context.keys.apiKey, context.keys.token, props.boardId);
                context.setLists(resp.data);
            } catch (error) {
                console.log("Unable to retrieve lists");
            }
        }
        const getCards = async () => {
            try {
                const resp = await cardsAPI.getCards(context.keys.apiKey, context.keys.token, props.boardId);
                context.setCards(resp.data);
            } catch (error) {
                console.log("Unable to retrieve cards");
            }
        };
        getLists();
        getCards();
        
    }, [props.boardId]);

    return (
        // iterate lists on selected board and render each, passing only the filtered cards that belong to each list
        <div className="lists">
            {context.lists
                .map(list =>
                    <SingleList key={list.id} list={list} />
                )}
            <CreateList boardId={props.boardId} />
        </div>
    );
};

export default Lists;