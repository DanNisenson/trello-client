//import { useState, useEffect } from "react";
//import { useAppContext } from "../context/keys";
//import axios from "axios";
import Cards from "./Cards";
import "../assets/css/Lists.css";

const SingleList = (props) => {
    //name should become an input on click, for update
    return (
        <div className="lists__list">
            {props.name}
            <button>DELETE LIST</button>
            <Cards currentCards={props.currentCards} listId={props.id} />
        </div>
    );
}

export default SingleList;