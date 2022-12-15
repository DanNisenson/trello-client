import {useAppContext } from "../../context/context";
import { useState, useEffect } from "react";
import listsAPI from "../../services/listsAPI";
import cardsAPI from "../../services/cardsAPI";

const CheckBox = () => {

    const [check, setChecK]=useState(false)

    return(
        <>
            <input className="checklist__list__item--checkbox " type="checkbox"
             checked={check} 
             onClick={()=> setChecK(!check)} >

            </input>
        </>
    )
}













const ModalAsideMove = (props) => {
    const context = useAppContext();
    const [destinationBoard, setDestinationBoard]= useState(props.payload.idBoard )
    const [actualLists, setActualLists] = useState(context.lists)
    const [destinationList, setDestinationList] = useState(props.payload.idList)
    const [destinationCard, setDestinationCard] = useState("top")
    
    useEffect(()=>
    {
        const getAllList = async () => {
            let allList = []
            context.boards.forEach(async board => {
                const newList = await listsAPI.getLists(context.keys.apiKey, context.keys.token, board.id)
                allList = [...allList, ...newList.data]
                setActualLists(allList)
            });
        };
        getAllList();


    }
      , [])

    const moveCard = async () => {
        let position = null
        if (destinationCard === "top" || destinationCard === "bottom"){
            position= destinationCard
        }
        else {
            const allCardsInList = context.cards.filter(card => card.idList === destinationList)
            let cardAbove= allCardsInList[destinationCard-1].pos
            let cardBelow = allCardsInList[destinationCard].pos
            position= parseFloat((cardAbove + cardBelow)/2).toFixed(3)
            
        }

        try {
            console.log(position)
            const resp = await cardsAPI.moveCard(context.keys, props.payload.id, destinationList, destinationBoard, position)
            // update position Move
            if (resp.status === 200) {
                const newCards = context.cards.map((card) => card.id === resp.data.id ? resp.data : card
                );
                // update cards in List component
                context.setCards(newCards);
                
            }
        } catch (error) {
            console.log(error);
            console.log("error. failed to move Card.");
        }
        // Hide window
        props.close(false);
    }

    return (
        <div className="aside__new__window window__checklist">
            <div className="aside__new__window--titlehead">
                <span className="aside__new__window--title">Move Card</span>
                <span><i class="fa-duotone fa-x" onClick={() => props.close(false)}></i></span>
            </div>
            <div className="aside__new__window--section window__section__checklist">
                <p className="window__section--title " >Select a destiny</p>
                {/* Seleccion a través del valor Board */}
                <p className="window__section--title " >Board</p>
                <select className="window__section__move--selectcamp window__section--inputtext " value={destinationBoard}
                    onChange={
                        e => setDestinationBoard(e.target.value)}>
                    {/* render de listas */}
                    {context.boards.map((board) =>
                        <option value={board.id} key={board.id}> {board.name}
                        </option>)}
                </select>
                <div className="prueba">
                {/* seleccion a través del valor List */}
                    <div>
                        <p className="window__section--title " >List</p>
                        <select className="window__section__move--selectcamp window__section--inputtext " value={destinationList}
                            onChange={
                                e => {setDestinationList(e.target.value);
                                      setDestinationCard("top")}}>
                            {/* render de listas */}
                            {actualLists.filter((List)=> List.idBoard === destinationBoard ).map((list) =>
                                <option value={list.id} key={list.id}> {list.name}
                                </option>)}
                        </select>
                    </div>
                    <div>{/* seleccion de posicion en la lista a través del valor card */}
                        <p className="window__section--title " >Posición</p>
                        <select className="window__section__move--selectcamp window__section--inputtext " 
                            value={destinationCard}
                            onChange={
                                e => setDestinationCard(e.target.value)
                            }>
                            {/* render de cartas */}
                            <option value={"top"}>1</option>
                            {/* renderiza todas menos la primera*/}
                            {context.cards.filter(card => card.idList === destinationList).map((card, i, a) =>
                                    // La última posición no pasa posición
                                    i === a.length-1 
                                    ? <option value={"bottom"}>{i+2}</option>
                                    : <option value={i+1} key={card.id}>{i+2} {card.id === props.payload.id ? " (actual)" : null } </option> 
                                )}
                        </select>
                    </div>
                </div>
            </div>
            <button type="button" className="aside__new--button" onClick={moveCard}>
                Move
            </button>
        </div>
    )
}

export default CheckBox