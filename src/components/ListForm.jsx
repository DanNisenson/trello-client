import { useState } from "react";
import { useAppContext } from "../context/keys";
import axios from "axios";
import "../assets/css/Lists.css";

const ListForm = (props) => {
    const [toggleInput, setToggleInput] = useState(false);
    return (
        <div className="lists__list">
            <i className="fa-solid fa-plus fa-1x">Add new list</i>
        </div>
    );
}

export default ListForm;