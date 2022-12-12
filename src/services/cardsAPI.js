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

    static async deleteCard(apiKey, token, id) {
        const url = `cards/${id}?&key=${apiKey}&token=${token}`;
        return await axios.delete(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

    static async getComments(context, id) {
        const url = `cards/${id}/actions?filter=commentCard&key=${context.apiKey}&token=${context.token}`;
        return await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

    static async getCheckL(context, id) {
        const url = `cards/${id}/checklists?key=${context.apiKey}&token=${context.token}`;
        return await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
    }
    
    static async newComment(text, context, id) {
        const url = `cards/${id}/actions/comments?text=${text}&key=${context.apiKey}&token=${context.token}`;
        return await axios.post(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

    static async newCheckL(text, context, id) {
        const url = `cards/${id}/checklists?name=${text}&pos=bottom&key=${context.apiKey}&token=${context.token}`;
        return await axios.post(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

    static async delCheckL(context, id) {
        const url = `checklists/${id}?key=${context.apiKey}&token=${context.token}`;
        return await axios.delete(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

    static async delComm(context, id ) {
        const url = `actions/${id}?key=${context.apiKey}&token=${context.token}`;
        return await axios.delete(`${process.env.REACT_APP_BASE_URL}${url}`);

    }

    static async updateDesc(text, context, id) {
        const url = `cards/${id}?desc=${text}&key=${context.apiKey}&token=${context.token}`;
        return await axios.put(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

    static async moveCard(context, id, idList) {
        const url = `cards/${id}?idList=${idList}&key=${context.apiKey}&token=${context.token}`;
        return await axios.put(`${process.env.REACT_APP_BASE_URL}${url}`);
    }

}

export default cardsAPI;
