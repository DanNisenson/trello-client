import { useState } from "react"
import axios from 'axios';
import { AppContext, useAppContext } from "../../context/keys";
import CardCallings from "./CardCallings";

const AsideCard= (props)=>{
    const context= useAppContext()
    const[checkL, setCheckL]= useState(false)
    const [listName, setListName] = useState("");
    return(
        <>
            <div>
                <p className="card__aside__options" onClick={()=> setCheckL(!checkL)}>Checklist</p>
                {checkL &&
                    <div className="aside__new_checklist">
                        <input type="text" onChange={(event)=>setListName(event.target.value) }>
                        </input>
                        <button type="button" onClick={()=> CardCallings.newList(props.payload.id, listName, context)}>
                            Crear
                        </button>

                    </div> }
            </div>
            <p className="card__aside__options">Fechas</p>
            <p className="card__aside__options">Archivar</p>

        </>
    )

}

export default AsideCard