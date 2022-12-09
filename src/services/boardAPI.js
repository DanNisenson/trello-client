import axios from "axios";

class boardAPI {

    static async getBoards(apiKey, token) {
        const url = `members/me/boards?fields=id,name,url&key=${apiKey}&token=${token}`;
        return await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

}

export default boardAPI;