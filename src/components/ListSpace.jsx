import { ItemTypes } from "../constants/Constants";
import { useDrop } from "react-dnd";
import { useAppContext } from "../context/context";
import SingleList from "./SingleList";
import listsAPI from "../services/listsAPI";

const ListSpace = props => {
    const context = useAppContext();

    const generateCallPosition = (currentPosition, targetPosition) => {
        const boardLists = context.lists.filter(list => list.idBoard === props.boardId);
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

    const handleMove = async (currentPosition, targetPosition, listId) => {
        if (currentPosition !== targetPosition)
        {
            const callPosition = generateCallPosition(currentPosition, targetPosition);
            try {
                const response = await listsAPI.updateListPosition(context.keys.apiKey, context.keys.token, listId, callPosition);
                if (response.status === 200) {
                    const newLists = context.lists.map(list => {
                        list.pos = list.id === listId ? response.data.pos : list.pos
                        return list}
                    ).sort((a , b) => a.pos - b.pos);
                    context.setLists(newLists);
                }
            }
            catch (error) {
                console.log(error.message);
                alert("Unable to update list position");
            }
        }
    }

    const [ { isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.LIST,
        drop: (item) => handleMove(item.pos, props.list.pos, item.listId),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }), [context.lists]);

    return (
        <div ref={drop}>
            <SingleList list={props.list}></SingleList>);
        </div>
    );
}

export default ListSpace;