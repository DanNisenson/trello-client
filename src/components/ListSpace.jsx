import { ItemTypes } from "../utils/ItemTypes";
import { useDrop } from "react-dnd";
import { useAppContext } from "../context/context";
import moveList from "../utils/moveList";
import SingleList from "./SingleList";

const ListSpace = props => {
    const context = useAppContext();

    const [ { isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.LIST,
        drop: async (item) => await moveList(item.pos, props.list.pos, item.listId, props.boardId,
            context.keys.apiKey, context.keys.token, context.lists, context.setLists),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }), [context.lists]);

    return (
        <div ref={drop}>
            <SingleList list={props.list}></SingleList>
        </div>
    );
}

export default ListSpace;