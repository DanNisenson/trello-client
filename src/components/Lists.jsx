import { useState, useEffect } from "react";
import { useAppContext } from "../context/keys";
import axios from "axios";
import SingleList from "./SingleList";
import "../assets/css/Lists.css";

const Lists = (props) => {
    const context = useAppContext();
    const [currentLists, setCurrentLists] = useState([]);

    // get board's lists on props(board selection) change.
    useEffect(() => {
        const getLists = async () => {
            const resp = await axios.get(
                `https://api.trello.com/1/boards/${props.boardId}/lists?&key=${context.keys.apiKey}&token=${context.keys.token}`
            );
            setCurrentLists(resp.data);
        }
        getLists();
    }, [props]);

    return (
      // iterate lists on selected board and render each, passing only the filtered cards that belong to each list
      <div className="lists">
          {currentLists
              .map(list => 
                  <SingleList key={list.id} id={list.id} name={list.name} />
                  )
          }
    </div>
  );
};

export default Lists;