import { useState } from "react"
import { useAppContext } from "../../context/context";
import ModalAsideMove from "./ModalAsideMove";
import "../../assets/css/Card/AsideCard.css";
import cardsAPI from "../../services/cardsAPI";

const AsideCard = (props) => {
    const context = useAppContext()
    const [toggleCheckList, setToggleCheckList] = useState(false)
    const [toggleMove, setToggleMove] = useState(false)
    const [listName, setListName] = useState("");

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
            <p className="card__aside card__aside__options">Archive</p>
            <div>
                <div className="card__aside card__aside__options" onClick={() => setToggleMove(!toggleMove)}>
                    <i class="fa-solid fa-arrow-right fa-lg"></i>
                    <span className=" card__aside__options--title" >Move</span>
                </div>
                {toggleMove &&
                    <div className="card__aside aside__new__checklist">
                        <div className="aside__new--window--background" onClick={() => setToggleCheckList(false)}>
                        </div>
                        <ModalAsideMove close={setToggleMove} idCard={props.payload.id} />
                    </div>}
            </div>
        </>
    )

}

export default AsideCard