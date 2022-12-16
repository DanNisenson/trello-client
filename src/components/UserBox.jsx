import { useState, useEffect } from "react";
import { useAppContext } from "../context/context";
import authAPI from "../services/authAPI";
import "../assets/css/UserBox.css";

const UserBox = props => {
    const context = useAppContext();
    const [userName, setUserName] = useState("username")
    const [toggleUser, setToggleUser] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await authAPI.getMember(context.keys.apiKey, context.keys.token);
                setUserName(response.data.fullName);
            } catch(error) {
                console.error(error.message);
                alert("Unable to retrieve member info");
            }
        }
        getUser();
    }, []);

    const handleLogout = async () => {
        if (process.env.REACT_APP_TOKEN === context.keys.token) {
            alert("You are using ENV Token, best not to revoke from client");
            return;
        }
        try {
            const response = await authAPI.deleteToken(context.keys.apiKey, context.keys.token);
            if (response.status === 200) {
                localStorage.removeItem("trelloToken");
                context.keys.token = "";
                props.setIsAuthorized(false);
            }
        } catch(error) {
            console.error(error.message);
            alert("Unable to revoke token");
        }
    }

    return (
        <>
            {toggleUser && <div className="userbox-background" onClick={() => setToggleUser(!toggleUser)}></div>}
            <div className="userbox">
                {toggleUser && <button className="userbox-btn userbox-logout" onClick={handleLogout}>Log Out</button>}
                <div className="userbox-btn" onClick={() => setToggleUser(!toggleUser)}>
                    {userName}
                </div>
            </div>
        </>
    );
}

export default UserBox;