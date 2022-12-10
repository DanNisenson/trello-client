import axios from "axios";

class listsAPI {

    static async getLists(apiKey, token, boardId) {
        const url = `boards/${boardId}/lists?&key=${apiKey}&token=${token}`;
        return await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

    static async createList(apiKey, token, listName, boardId) {
        const url = `lists?name=${listName}&idBoard=${boardId}&pos=bottom&key=${apiKey}&token=${token}`;
        return await axios.post(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

}

export default listsAPI;
