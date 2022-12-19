import listsAPI from "../services/listsAPI";

const moveList = async (currentPosition, targetPosition, listId, boardId, apiKey, token, lists, setLists) => {

    const generateCallPosition = () => {
        const boardLists = lists.filter(list => list.idBoard === boardId);
        let targetIndex = -1;
        for (let i = 0; i < boardLists.length; i++) {
            if (boardLists[i].pos === targetPosition) {
                targetIndex = i;
                break;
            }
        }
        if (targetIndex === 0)
            return ("top");
        if (targetIndex === boardLists.length - 1)
            return ("bottom");
        if (targetPosition > currentPosition)
            return ((boardLists[targetIndex].pos + boardLists[targetIndex + 1].pos) / 2);
        return ((boardLists[targetIndex].pos + boardLists[targetIndex - 1].pos) / 2);
    }

    if (currentPosition !== targetPosition) {
        const callPosition = generateCallPosition(currentPosition, targetPosition, listId, boardId);
        try {
            const response = await listsAPI.updateListPosition(apiKey, token, listId, callPosition);
            if (response.status === 200) {
                const newLists = lists.map(list => {
                    list.pos = list.id === listId ? response.data.pos : list.pos
                    return list
                }
                ).sort((a, b) => a.pos - b.pos);
                setLists(newLists);
            }
        }
        catch (error) {
            console.log(error.message);
            alert("Unable to update list position");
        }
    }
}

export default moveList;