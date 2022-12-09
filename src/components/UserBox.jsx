import { useState } from "react";
import "../assets/css/UserBox.css";

const UserBox = () => {
    const [toggleUser, setToggleUser] = useState(false);

    const handleLogout = () => {
        console.log("Logging you out");
        setToggleUser(!toggleUser);
    }

    return (
        <div className="userbox">
            {toggleUser && <div className="userbox-background" onClick={() => setToggleUser(!toggleUser)}></div>}
            <button className="userbox-btn" onClick={() => setToggleUser(!toggleUser)}>Username</button>
            {toggleUser && <button className="userbox-btn userbox-logout" onClick={handleLogout}>Log Out</button>}
        </div>
    );
}

export default UserBox;