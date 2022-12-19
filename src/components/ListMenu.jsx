import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../context/context";
import listsAPI from "../services/listsAPI";
import ListMove from "./ListMove";
import "../assets/css/ListMenu.css"

const ListMenu = props => {
    const context = useAppContext();
    const menuRef = useRef();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleMove, setToggleMove] = useState(false);

    useEffect(() => {
        const handleClickOutside = event => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                document.removeEventListener("mousedown", handleClickOutside);
                setToggleMenu(false);
                setToggleMove(false);
            }
        }
        if (toggleMenu || toggleMove)
            document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [menuRef, toggleMenu, toggleMove]);

    const archiveCards = async () => {
        const confirmation = window.confirm("This action will archive all cards in the list. Are you sure?");
        if (confirmation) {
            try {
                const response = await listsAPI.archiveListCards(context.keys.apiKey,context.keys.token, props.listId);
                if (response.status === 200) {
                    const newCards = context.cards.filter(card => card.idList !== props.listId);
                    context.setCards(newCards);
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
        const confirmation = window.confirm("This action will archive this list and its cards. Are you sure?");
        if (confirmation) {
            try {
                const response = await listsAPI.archiveList(context.keys.apiKey,context.keys.token, props.listId);
                if (response.status === 200) {
                    const newCards = context.cards.filter(card => card.IdList !== props.listId);
                    const newLists = context.lists.filter(list => list.id !== props.listId);
                    context.setCards(newCards);
                    context.setLists(newLists);
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
        <div className="lists__menu" ref={menuRef}>
            <button className="lists__menu-btn" onClick={() => 
                toggleMove ? setToggleMove(!toggleMove) : setToggleMenu(!toggleMenu)
            }>
                <i className="fa-solid fa-bars"></i>
            </button>
            {toggleMenu &&
                <div className="lists__menu-dropdown">
                    <ul className="lists__menu-dropdown__options">
                        <li onClick={archiveCards}>Archive all cards in this list...</li>
                        <li onClick={archiveList}>Archive this list</li>
                        <li onClick={() => {
                                setToggleMenu(!toggleMenu);
                                setToggleMove(!toggleMove);
                        }}>
                            Move list...
                        </li>
                    </ul>
                </div>}
            {toggleMove &&
                <ListMove listId={props.listId} boardId={props.boardId} setToggleMenu={setToggleMenu} setToggleMove={setToggleMove} />
            }
        </div>
    );
}

export default ListMenu;