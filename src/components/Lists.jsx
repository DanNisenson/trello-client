import { useEffect } from "react";
import { useAppContext } from "../context/context";
import listsAPI from "../services/listsAPI";
import cardsAPI from "../services/cardsAPI";
import ListSpace from "./ListSpace";
import CreateList from "./CreateList";
import "../assets/css/Lists.css";

const Lists = (props) => {
    const context = useAppContext();

    // get board's lists on props(board selection) change.
    useEffect(() => {
        // condition-> is there any list of this board?
        if(context.lists.find(list => list.idBoard=== props.boardId) === undefined)
            {
                        const getLists = async () => {
                            try {
                                const resp = await listsAPI.getLists(context.keys.apiKey, context.keys.token, props.boardId);
                                context.setLists([...context.lists, ...resp.data]);
                            } catch (error) {
                                console.log("Unable to retrieve lists");
                            }
                        }
                        const getCards = async () => {
                            try {
                                const resp = await cardsAPI.getCards(context.keys.apiKey, context.keys.token, props.boardId);
                                context.setCards([...context.cards, ...resp.data]);
                            } catch (error) {
                                console.log("Unable to retrieve cards");
                            }
                        };
                        getLists();
                        getCards();
                }
                        
    }, [props.boardId]);

    return (
        <>
            {/* iterate lists on selected board and render each, passing only the filtered cards that belong to each list */}
            <div className="lists">
                {/* list filter by current board */}
                {context.lists
                    .filter(list => list.idBoard === props.boardId)
                    .map(list =>
                        <ListSpace key={list.id} list={list} boardId={props.boardId}></ListSpace>
                        )}
                <CreateList boardId={props.boardId} />
            </div>
        </>
    );
};

export default Lists;