import axios from "axios";

class listsAPI {

    static async getLists(apiKey, token, boardId) {
        const url = `boards/${boardId}/lists?&key=${apiKey}&token=${token}`;
        return await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

}

export default listsAPI;
