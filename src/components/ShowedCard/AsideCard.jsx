import { useState } from "react"
import { useAppContext } from "../../context/context";
import MoveCard from "../MoveCard";
import WarningAdvise from "./WarningAdvise";
import "../../assets/css/Card/AsideCard.css";
import cardsAPI from "../../services/cardsAPI";

const AsideCard = (props) => {
    const context = useAppContext()
    const [toggleCheckList, setToggleCheckList] = useState(false)
    const [moveCard, setMoveCard] = useState(false)
    const [listName, setListName] = useState("");
    const [isArchived, setIsArchived] = useState(!props.payload.closed)
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

    const archiveCard = async () => {
        try {
            const resp = await cardsAPI.archiveCard(isArchived, context.keys, props.payload.id)
            // update checklist
            if (resp.status === 200) {
                //actualizar las cartas
                props.setCurrentCard(resp.data)
                isArchived ?
                    context.setCards(context.cards.filter(card => card.id !== props.payload.id))
                    : context.setCards([...context.cards, props.payload])

                console.log(resp.data)
            }
        } catch (error) {
            console.log(error);
            console.log("error. failed to post new Checklist.");
        }
    };

    const deleteCard = async () => {
        try {
            const resp = await cardsAPI.deleteCard(context.keys.apiKey, context.keys.token, props.payload.id);
            if (resp.status === 200) {
                // copy listCards and remove deleted card
                context.setCards(context.cards.filter((card) => card.id !== props.payload.id));
                props.setCurrentCard(null)
            }
        } catch (error) {
            console.log(error.message);
            alert("Unable to delete card");
        }
    };

    return (
        <>
            <p className="card__aside card__aside__options">Members</p>
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

            {!isArchived ?
                <>
                    <p className="card__aside card__aside__options" onClick={() => {
                        setIsArchived(!isArchived);
                        archiveCard()
                    }}>
                        Send to board
                    </p>
                    {!toggleDelete ?
                        <p className="card__aside card__aside__options card__aside__options--delete" onClick={() => setToggleDelete(true)} >
                            Delete</p> :
                        <WarningAdvise
                            title={"Delete card? "}
                            text={"All actions will be removed from the activity feed and you won't be able to re-open the card. There is no undo."}
                            setToggle={setToggleDelete}
                            onClick={deleteCard}
                        />
                    }
                </>

                :
                <div className="card__aside card__aside__options" onClick=
                    {() => {
                        setIsArchived(!isArchived);
                        archiveCard()
                    }}>
                    <i class="fa-sharp fa-solid fa-box-archive fa-lg"></i>
                    <span className=" card__aside__options--title">Archive</span>
                </div>


            }




            <div>
                <div className="card__aside card__aside__options" onClick={() => setMoveCard(true)}>
                    <i class="fa-solid fa-arrow-right fa-lg"></i>
                    <span className=" card__aside__options--title" >Move</span>
                </div>
                {moveCard &&
                    <MoveCard id={props.payload.id} setMoveCard={setMoveCard} setCardEdit={setMoveCard} idList={props.payload.idList} idBoard={props.payload.idBoard}/>
                }
            </div>
        </>
    )

}

export default AsideCard