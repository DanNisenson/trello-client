import axios from "axios";

class listsAPI {

    static async getLists(apiKey, token, boardId) {
        const url = `boards/${boardId}/lists?&key=${apiKey}&token=${token}`;
        return await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

    static async updateListName(apiKey, token, listId, listName) {
        const url = `lists/${listId}/name?value=${listName}&key=${apiKey}&token=${token}`;
        return await axios.put(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

    static async updateListPosition(apiKey, token, listId, position) {
        const url = `lists/${listId}/pos?value=${position}&key=${apiKey}&token=${token}`;
        return await axios.put(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

    static async createList(apiKey, token, listName, boardId) {
        const url = `lists?name=${listName}&idBoard=${boardId}&pos=bottom&key=${apiKey}&token=${token}`;
        return await axios.post(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

    static async archiveListCards(apiKey, token, listId) {
        const url = `lists/${listId}/archiveAllCards?key=${apiKey}&token=${token}`;
        return await axios.post(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

    static async archiveList(apiKey, token, listId) {
        const url = `lists/${listId}/closed?value=true&key=${apiKey}&token=${token}`;
        return await axios.put(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

}

export default listsAPI;
