import { useState } from "react"
import { useAppContext } from "../../context/context";
import "../../assets/css/Card/AsideCard.css";
import cardsAPI from "../../services/cardsAPI";

const AsideCard= (props)=>{
    const context= useAppContext()
    const[tooglecheckL, setToogleCheckL]= useState(false)
    const [listName, setListName] = useState("");

    const postNewCheckL= async ()=> {
        try {
            const resp = await cardsAPI.newCheckL(listName, context.keys, props.payload.id)
            // update checklist
            if (resp.status === 200) {
                console.log(resp.data)
                props.updateCheckL([...props.checkL, resp.data]);
            }
        } catch (error) {
            console.log(error);
            console.log("error. failed to post new Checklist.");
        }
        // change postMode
        setToogleCheckL(false);
    }

    return(
        <>
            <div>
                <div className="card__aside card__aside__options" onClick={()=> setToogleCheckL(!tooglecheckL)}>
                    <i class="fa-regular fa-square-check fa-lg"></i> 
                    <span className=" card__aside__options--title" >Checklist</span>
                </div>
                {tooglecheckL &&
                    <div className="card__aside aside__new__checklist">
                        <div className="aside__new--window--background" onClick={() => setToogleCheckL(false)}>
                        </div>
                        <div className="aside__new__window window__checklist">
                            <div className="aside__new__window--titlehead">
                                <span className="aside__new__window--title">Añadir Checklist</span>
                                <span><i class="fa-duotone fa-x" onClick={() => setToogleCheckL(false)}></i></span>
                            </div>
                            <div className="aside__new__window--section window__section__checklist">
                                <p className="window__section--title " >titulo</p>
                                <input className="window__section--inputtext " type="text" onChange={(event)=>setListName(event.target.value) }>
                                </input>
                            </div>
                            <button type="button" className="aside__new--button" onClick={postNewCheckL}>
                                Añadir
                            </button>
                        </div>
                        

                    </div> }
            </div>
            <p className="card__aside card__aside__options">Fechas</p>
            <p className="card__aside card__aside__options">Archivar</p>
            <p className="card__aside card__aside__options">Mover</p>

        </>
    )

}

export default AsideCard