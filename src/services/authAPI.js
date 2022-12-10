import axios from "axios";

class authAPI {

    static authorizeApp(apiKey) {
        window.open(`${process.env.REACT_APP_BASE_URL}authorize/?key=${apiKey}&return_url=http://localhost:3000/&callback_method=fragment&scope=read,write&expiration=1hour&name=trelloClientApp&response_type=fragment`, "_self");
    }

    static async getTokenInfo(apiKey, token) {
        const url = `tokens/${token}/?key=${apiKey}&token=${token}`;
        return await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

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

export default authAPI;