import { useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../context/keys";
import "../assets/css/Authorize.css";

const Authorize = props => {
    const context = useAppContext();

    useEffect(() => {
        const checkForToken = async () => {
            const matchIndex = window.location.href.indexOf("#token=");
            console.log(matchIndex);
            console.log(localStorage.trelloToken);
            //if a token already exists, check if still valid and return
            if (localStorage.trelloToken && await isValidToken(localStorage.trelloToken)) {
                console.log(isValidToken(localStorage.trelloToken));
                context.keys.token = localStorage.trelloToken;
                props.setIsAuthorized(!props.isAuthorized);
            }
            else if (matchIndex !== -1) {
                if ( window.location.href.indexOf("error=") === -1) {
                    localStorage.trelloToken = window.location.href.substring(matchIndex + "#token=".length);
                    context.keys.token = localStorage.trelloToken;
                    window.window.location.href = window.location.href.substring(0, matchIndex);
                    props.setIsAuthorized(!props.isAuthorized);
                }
            }
            console.log(localStorage.trelloToken);
            console.log(context.keys.token);
        }
        checkForToken();
    },[]);

    const isValidToken = async token => {
        if (!token)
            return (false);
        const currentTime = new Date();
        try {
            const response = await axios.get(`https://api.trello.com/1/tokens/${token}/?key=${context.keys.apiKey}&token=${token}`);
            if (response.data.dateExpires !== null) {
                const expirationDate = new Date(response.data.dateExpires);
                if (currentTime.getTime() > expirationDate.getTime()) {
                    localStorage.removeItem("trelloToken");
                    return (false);
                }  
            }
        }
        catch (error) {
            if (error.response.data === "expired token") {
                console.error("Token Expired");
                localStorage.removeItem("trelloToken");
            }
            return (false);
        }
        return (true);
    }

    const authorizeApp = () => {
        console.log("Make a request");
        window.open(`https://api.trello.com/1/authorize/?key=${context.keys.apiKey}&return_url=http://localhost:3000/&callback_method=fragment&scope=read,write&expiration=1hour&name=trelloClientApp&response_type=fragment`, "_self");
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
        <div className="authorize">
            <h1>Welcome to our Trello client!</h1>
            <div className="authorize__text">
                <h3>In order to use it, we will require you to first authorize the app.</h3>
                <p>Please click the button below to be redirected to the Trello authorization page.</p>
                <p>This Application will request the following access: <span className="authorize__text-bold">Read & Write to your boards for 1 hour.</span></p>
                <p>Once you authorize the Application, you will be redirected back here.</p>
            </div>
            <button className="authorize__button" onClick={authorizeApp}>Authorize</button>
            {/* This is a DEV Button */}
            {process.env.REACT_APP_TOKEN &&
                <button className="authorize__button"
                    onClick={() => {
                        context.keys.token = process.env.REACT_APP_TOKEN;
                        props.setIsAuthorized(!props.isAuthorized)}
                    }
                >Use ENV Token</button>
            }
        </div>
    );
}

export default Authorize;