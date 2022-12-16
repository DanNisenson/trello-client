import axios from "axios";

class authAPI {

    static authorizeApp(apiKey) {
        window.open(`${process.env.REACT_APP_BASE_URL}authorize/?key=${apiKey}&return_url=${process.env.REACT_APP_REDIRECT_URL}&callback_method=fragment&scope=read,write&expiration=1hour&name=trelloClientApp&response_type=fragment`, "_self");
    }

    static async getTokenInfo(apiKey, token) {
        const url = `tokens/${token}/?key=${apiKey}&token=${token}`;
        return await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

    static async getMember(apiKey, token) {
        const url = `tokens/${token}/member?key=${apiKey}&token=${token}`;
        return await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

    static async deleteToken(apiKey, token) {
        const url = `tokens/${token}/?key=${apiKey}&token=${token}`;
        return await axios.delete(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

}

export default authAPI;