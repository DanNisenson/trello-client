import { useState, useRef, useEffect } from "react";
import "../assets/css/ListMenu.css"

const ListMenu = props => {
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

    return (
        <div id={props.listId} className="lists__menu" ref={menuRef}>
            <button className="lists__menu-btn" onClick={() => setToggleMenu(!toggleMenu)}>
                <i className="fa-solid fa-bars"></i>
            </button>
            {toggleMenu &&
                <div className="lists__menu-dropdown">
                    <ul className="lists__menu-dropdown__options">
                        <li>Action 1</li>
                        <li>Action 2</li>
                        <li>Action 3</li>
                    </ul>
                </div>}
        </div>
    );
}

export default ListMenu;