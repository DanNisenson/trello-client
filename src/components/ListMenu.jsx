import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/context";
import axios from "axios";
import "../assets/css/ListMenu.css"

const ListMenu = props => {
    const context = useAppContext();
    const menuRef = useRef();
    const [toggleMenu, setToggleMenu] = useState(false);

    useEffect(() => {
        const handleClickOutside = event => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                document.removeEventListener("mousedown", handleClickOutside);
                setToggleMenu(!toggleMenu);
            }
        }
        if (toggleMenu)
            document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [menuRef, toggleMenu]);

    const archiveCards = async () => {
        const confirmation = window.confirm("This action will archive all cards in the list. Are you sure?");
        if (confirmation) {
            console.log("All cards should archive:", props.listId);
            try {
                const URI = `https://api.trello.com/1/lists/${props.listId}/archiveAllCards?key=${context.keys.apiKey}&token=${context.keys.token}`;
                const response = await axios.post(URI);
                if (response.status === 200) {
                    props.setListCards([]);
                    setToggleMenu(!toggleMenu);
                }
            }
            catch (error) {
                console.log(error.message);
                alert("Unable to archive cards in the list");
            }
        }
    }

    const archiveList = async () => {
        const confirmation = window.confirm("This action will archive this list. Are you sure?");
        if (confirmation) {
            try {
                const URI = `https://api.trello.com/1/lists/${props.listId}/closed?value=true&key=${context.keys.apiKey}&token=${context.keys.token}`;
                const response = await axios.put(URI);
                if (response.status === 200) {
                    props.setCurrentLists(props.currentLists.filter(list => list.id !== props.listId));
                    setToggleMenu(!toggleMenu);
                }
            }
            catch (error) {
                console.log(error.message);
                alert("Unable to archive this list");
            }
        }
    }

    return (
        <div id={props.listId} className="lists__menu" ref={menuRef}>
            <button className="lists__menu-btn" onClick={() => setToggleMenu(!toggleMenu)}>
                <i className="fa-solid fa-bars"></i>
            </button>
            {toggleMenu &&
                <div className="lists__menu-dropdown">
                    <ul className="lists__menu-dropdown__options">
                        <li onClick={archiveCards}>Archive all cards in this list...</li>
                        <li onClick={archiveList}>Archive this list</li>
                    </ul>
                </div>}
        </div>
    );
}

export default ListMenu;