import { useState, useEffect } from "react";
import { useAppContext } from "../context/keys";
import "../assets/css/Authorize.css";

const Authorize = props => {
    const context =useAppContext();

    return (
        <div className="authorize">
            <h1>Welcome to our Trello client!</h1>
            <div className="authorize__text">
                <h3>In order to use it, we will require you to first authorize the app.</h3>
                <p>Please click the button below to be redirected to the Trello authorization page.</p>
                <p>This Application will request the following access: <span className="authorize__text-bold">Read & Write to your boards for 1 hour.</span></p>
                <p>Once you authorize the Application, you will be redirected back here.</p>
            </div>
            <button className="authorize__button" onClick={() => props.setIsAuthorized(!props.isAuthorized)}>Authorize</button>
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