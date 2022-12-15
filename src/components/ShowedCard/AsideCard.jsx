import { useState, useEffect } from "react"
import { useAppContext } from "../../context/context";
import ModalAsideMove from "./ModalAsideMove";
import WarningAdvise from "./WarningAdvise";
import "../../assets/css/Card/AsideCard.css";
import cardsAPI from "../../services/cardsAPI";

const AsideCard = (props) => {
    const context = useAppContext()
    const [toggleCheckList, setToggleCheckList] = useState(false)
    const [toggleMove, setToggleMove] = useState(false)
    const [listName, setListName] = useState("");
    const [isArchived, setIsArchived]= useState(props.payload.closed)
    const [toggleDelete, setToggleDelete] = useState(false)
 

    const postNewCheckList = async () => {
        try {
            const resp = await cardsAPI.newCheckL(listName, context.keys, props.payload.id)
            // update checklist
            if (resp.status === 200) {
                props.setCheckList([...props.checkList, resp.data]);
            }
        } catch (error) {
            console.log(error);
            console.log("error. failed to post new Checklist.");
        }
        // close new checklist window 
        setToggleCheckList(false);
    }

    useEffect(() => {
            const archiveCard = async () => {
                try {
                    const resp = await cardsAPI.archiveCard(isArchived, context.keys, props.payload.id)
                    // update checklist
                    if (resp.status === 200) {
                        context.setCards(context.cards.map(card => card.id === props.payload.id ? resp.data : card))
                        //actualizar las cartas
                        props.setCurrentCard(resp.data)
                    }
                } catch (error) {
                    console.log(error);
                    console.log("error. failed to post new Checklist.");
                }
                // close new checklist window 
                setToggleCheckList(false);
                };
                archiveCard()}, 
                [isArchived] )

    return (
        <>
            <div>
                <div className="card__aside card__aside__options" onClick={() => setToggleCheckList(!toggleCheckList)}>
                    <i class="fa-regular fa-square-check fa-lg"></i>
                    <span className=" card__aside__options--title" >Checklist</span>
                </div>
                {toggleCheckList &&
                    <div className="card__aside aside__new__checklist">
                        <div className="aside__new--window--background" onClick={() => setToggleCheckList(false)}>
                        </div>
                        <div className="aside__new__window window__checklist">
                            <div className="aside__new__window--titlehead">
                                <span className="aside__new__window--title">Add Checklist</span>
                                <span><i class="fa-duotone fa-x" onClick={() => setToggleCheckList(false)}></i></span>
                            </div>
                            <div className="aside__new__window--section window__section__checklist">
                                <p className="window__section--title " >titulo</p>
                                <input className="window__section--inputtext " type="text" onChange={(event) => setListName(event.target.value)}>
                                </input>
                            </div>
                            <button type="button" className="aside__new--button" onClick={postNewCheckList}>
                                Add
                            </button>
                        </div>


                    </div>}
            </div>
            <p className="card__aside card__aside__options">Dates</p>
            
            {isArchived ? 
                <>
                    <p className="card__aside card__aside__options" onClick={() => {setIsArchived(false)} }>Enviar al tablero</p> 
                    {!toggleDelete ? 
                        <p className="card__aside card__aside__options card__aside__options--delete" onClick={() => setToggleDelete(true) } > 
                            Delete</p> :
                        <WarningAdvise 
                            title={"Delete card? "}
                            text={"All actions will be removed from the activity feed and you won’t be able to re-open the card. There is no undo." }
                            setToggle={setToggleDelete}
                            />
                    }
                </>

                :
                 <div className="card__aside card__aside__options" onClick={() => { setIsArchived(true) }}>
                    <i class="fa-sharp fa-solid fa-box-archive fa-lg"></i>
                    <span className=" card__aside__options--title">Archive</span>
                </div>


            }




            <div>
                <div className="card__aside card__aside__options" onClick={() => setToggleMove(!toggleMove)}>
                    <i class="fa-solid fa-arrow-right fa-lg"></i>
                    <span className=" card__aside__options--title" >Move</span>
                </div>
                {toggleMove &&
                    <div className="card__aside aside__new__checklist">
                        <div className="aside__new--window--background" onClick={() => setToggleCheckList(false)}>
                        </div>
                        <ModalAsideMove close={setToggleMove} payload={props.payload} />
                    </div>}
            </div>
        </>
    )

}

export default AsideCard