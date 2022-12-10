import { useState } from "react";
import "../assets/css/UserBox.css";

const UserBox = () => {
    const [toggleUser, setToggleUser] = useState(false);

    const handleLogout = () => {
        console.log("Logging you out");
        setToggleUser(!toggleUser);
    }

    return (
        <>
            {toggleUser && <div className="userbox-background" onClick={() => setToggleUser(!toggleUser)}></div>}
            <div className="userbox">
                {toggleUser && <button className="userbox-btn userbox-logout" onClick={handleLogout}>Log Out</button>}
                <div className="userbox-btn" onClick={() => setToggleUser(!toggleUser)}>
                    Username
                </div>
            </div>
        </>
    );
}

export default UserBox;