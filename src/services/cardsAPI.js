import axios from "axios";

class cardsAPI {

    static async getCards(apiKey, token, boardId) {
        const url = `boards/${boardId}/cards?&key=${apiKey}&token=${token}`;
        return await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
    }
    
    static async postNewCard(apiKey, token, title, idList) {
        const url = `cards?name=${title}&idList=${idList}&key=${apiKey}&token=${token}`;
        return await axios.post(`${process.env.REACT_APP_BASE_URL}${url}`);
    }
    
    static async updateCard(apiKey, token, id, title) {
        const url = `cards/${id}?name=${title}&key=${apiKey}&token=${token}`;
        return await axios.put(`${process.env.REACT_APP_BASE_URL}${url}`);
    }
    
    static async updateCardPosition(apiKey, token, id, idList, position) {
        const url = `cards/${id}?idList=${idList}&pos=${position}&key=${apiKey}&token=${token}`;
        return await axios.put(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

    static async deleteCard(apiKey, token, id) {
        const url = `cards/${id}?&key=${apiKey}&token=${token}`;
        return await axios.delete(`${process.env.REACT_APP_BASE_URL}${url}`);
    }
}

export default cardsAPI;
