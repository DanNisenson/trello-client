import { AppContext, useAppContext } from "../../context/context";
import { useState } from "react";
import cardsAPI from "../../services/cardsAPI";

const AsideMove= (props)=> {
    const context= useAppContext();
    const[destination, setDestination]= useState(null)

    const moveCard= async () =>{
        try {
            const resp = await cardsAPI.moveCard(context.keys, props.idCard, destination)
            // update position Move
            if (resp.status === 200) {
                console.log(resp.data)
                // props.updateCheckL([...props.checkL, resp.data]);
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
                {/* Seleccion a través del valor */}
                <select className="window__section__move--selectcamp window__section--inputtext " 
                        onChange={
                            e => setDestination(e.target.value)}>
                    {/* render de listas */}
                    <option></option>
                    {/* La primera en blanco porque select no me detecta el value del primer valor por defecto */}
                    {context.lists.map((list) => 
                        <option value={list.id} key={list.id}> {list.name}
                        </option> )}
                </select>
            </div>
            <button type="button" className="aside__new--button" onClick={moveCard}>
                Move
            </button>
        </div>
    )
}

export default AsideMove