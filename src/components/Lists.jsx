import { useState, useEffect } from "react";
import { useAppContext } from "../context/context";
import listsAPI from "../services/listsAPI";
import SingleList from "./SingleList";
import CreateList from "./CreateList";
import "../assets/css/Lists.css";

const Lists = (props) => {
    const context = useAppContext();
    // const [currentLists, setCurrentLists] = useState([]);

    // get board's lists on props(board selection) change.
    useEffect(() => {
        const getLists = async () => {
            try {
                const resp = await listsAPI.getLists(context.keys.apiKey, context.keys.token, props.boardId);
                console.log(resp);
                context.setLists(resp.data);
            } catch (error) {
                console.log('can\'t get lists.')                
            }
        }
        getLists();
    }, [props.boardId]);

    return (
        // iterate lists on selected board and render each, passing only the filtered cards that belong to each list
        <div className="lists">
            {context.lists
                .map(list => 
                    <SingleList key={list.id} list={list} currentLists={context.lists} setCurrentLists={context.setLists} />
            )}
            <CreateList boardId={props.boardId}
                currentLists={context.lists} setCurrentLists={context.setLists} />
        </div>
    );
};

export default Lists;