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
        console.log("Logging you out");
        console.log(localStorage.trelloToken);
        try {
            const response = await authAPI.deleteToken(context.keys.apiKey, context.keys.token);
            if (response.status === 200) {
                localStorage.removeItem("trelloToken");
                context.keys.token = "";
                props.setAuthorized(!props.authorized);
            }
        } catch(error) {
            console.error(error.message);
            alert("Unable to revoke token");
        }
        console.log(localStorage.trelloToken);
    }

/* This function can be moved to a Component to be included as a button in Board.
    const removeAuth = async () => {
        console.log("Revoke");
        console.log(localStorage.trelloToken);
        const response = await axios.delete(`https://api.trello.com/1/tokens/${localStorage.trelloToken}/?key=${context.keys.apiKey}&token=${localStorage.trelloToken}`);
        console.log(response);
        localStorage.removeItem("trelloToken");
        context.keys.token = "";
        console.log(localStorage.trelloToken);
        console.log(context.keys.token);
        props.setAuthorized(!props.authorized);
    }
*/

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