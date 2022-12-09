import axios from "axios";

class cardsAPI {

    static async getCards(apiKey, token, boardId) {
        const url = `boards/${boardId}/cards?&key=${apiKey}&token=${token}`;
        return await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

}

export default cardsAPI;
